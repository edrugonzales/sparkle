import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  List,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
  InputBase,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { navigate } from "gatsby"
import React, { useState, useEffect, useReducer, useContext } from "react"
import VortexBillerCategory, {
  BillerIcon,
} from "../components/VortexBillerCategory"
import VortexBillerCard from "../components/VortexBillerCard"
import {
  createBillsPaymentTransaction,
  getBillerById,
  getBillers,
} from "../../../api/public/vortex/billspayment_service"
import { getVortexTokenBase } from "../../../api/public/vortex/token_service"
import { Form, Formik } from "formik"
import { Box } from "@mui/system"
import CenteredProgress from "../../misc/centeredProgress"
import VortexFormToolbar from "../components/VortexFormToolbar"
import usePayMongo from "../../../services/paymongo/hooks/usePayMongo"
import moment from "moment"
import VortexError from "../components/VortexError"
import jsonFieldsToArray from "../../../helpers/jsonfieldstoarray"
import * as yup from "yup"
import VortexCustomTextField from "../components/VortexCustomTextField"
import {
  saveVortexBillsPaymentTransaction,
  updateVortexByRefId,
} from "../../../api/public/vortex/transaction_db"
import processPaymongoRefund from "../../../services/paymongo/function/processPaymongoRefund"
import { sentryCatchException } from "../../../services/sentry/sentry"
import paymongoErrorHandler from "../../../services/paymongo/function/paymongoErrorHandler"
import { getPaymongoFee } from "../../../services/paymongo/function/getPaymongoFee"
import { sparkleBillsPaymentFee } from "../config/config"
import SecureLS from "secure-ls"
import { ConsoleView } from "react-device-detect"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import VortexBillerGridList from "../components/VortexBillerGridList"
import VortexBillerAccordionList from "../components/VortexBillerAccordionList"
import { LoginState } from "../../globalstates"
import LoginPage from "../../LoginPage"
import { primaryVortexTheme } from "../config/theme"
import VortexBillerLogoComponent from "../components/VortexBillerLogoComponent"
import VortexBillerListItem from "../components/VortexBillerListItem"
import VortexBottomGradient from "../components/VortexBottomGradient"

import BottomNavigator from "../../Homemade/BottomNavigator"
import useLoggedUser from "../../../custom-hooks/useLoggedUser"

import getBillerAbbreviation from "../functions/getBillerAbbreviation"
import trimObjValues from "../../../helpers/trimobjectvalues"

const VortexBillsPaymentPage = () => {
  const ls = new SecureLS({ encodingType: "aes" })

  const [error, setErrorData] = useState({ isError: false, message: "" })

  const [transactionDocId, setTransactionDocId] = useState(null)

  const [transactionReferenceId, setTransactionReferenceId] = useState(null)

  const [activeStep, setActiveStep] = React.useState(0)

  const [data, setData] = useState([])

  const [renderData, setRenderData] = useState([])

  const [categories, setcategories] = useState([])

  const [selectedBiller, setSelectedBiller] = useState(null)

  const [billDetails, setBillDetails] = useState(null)

  const [transactionDetails, setTransactionDetails] = useState()

  const [currentSelectedCategory, setCurrentSelectedCategory] = useState(null)

  const [isLoggin, setisLoggin] = useContext(LoginState)

  const { getUser } = useLoggedUser()

  const getServiceFee = ({ amount, currency }) => {
    let paypalPercentage = amount * 0.0355
    let foreignFee = amount * 0.01
    let paypalFee = Math.round(paypalPercentage) + Math.round(foreignFee)

    let convenienceFee =
      parseFloat(paypalFee) + parseFloat(sparkleBillsPaymentFee)
    let grandTotalFee = Math.round(
      parseFloat(amount) + parseFloat(convenienceFee)
    )

    convenienceFee = parseFloat(convenienceFee).toFixed(2);
    grandTotalFee = parseFloat(grandTotalFee).toFixed(2);

    return { convenienceFee, grandTotalFee }
  }

  const getGcashServiceFee = ({ amount, currency }) => {

    let convenienceFee = 0
    let grandTotalFee = amount

    return { convenienceFee, grandTotalFee }
  }


  const [isLoading, setisLoading] = useState(false)

  function stepBack() {
    setActiveStep(activeStep - 1)
  }

  function stepForward() {
    setActiveStep(activeStep + 1)
  }

  async function handleVortexRequestGCash({ paymentData }) {
    try {
      setisLoading(true)

      //save transaction only as for manual Gcash
      setTransactionDetails(paymentData)

      let saveTransaction = await updateVortexByRefId({
        refId: transactionReferenceId,
        data: {
          paymentId: "Awaiting for GCash Payment",
          paymentMethod: "GCash",
          convenienceFee: paymentData?.convenienceFee,
          totalAmount: paymentData.grandTotalFee,
        },
      })

      navigate(
        `/vortextransactions/billspayment/${saveTransaction.referenceNumber}`,
        { state: saveTransaction }
      )

      setisLoading(false)
    } catch (error) {
      setErrorData({
        isError: true,
        message: error,
      })
      throw Error(error)
    }
  }

  async function handleVortexRequest({ docId, paymentData }) {
    try {
      let vortexTokenResponse = await getVortexTokenBase()

      if (vortexTokenResponse.status === 200) {
        let vortextTokenResult = await vortexTokenResponse.json()

        let vortexBillPaymentTransactionResponse =
          await createBillsPaymentTransaction({
            access_token: vortextTokenResult.access_token,
            docId: docId,
            clientRequestId: process.env.REACT_APP_VORTEX_CLIENTREQID,
            billerId: selectedBiller.id,
            billDetails: billDetails,
            paymentId: paymentData?.data?.orderID,
            convenienceFee: paymentData?.convenienceFee,
            totalAmount: paymentData?.details?.purchase_units[0]?.amount?.value,
            callbackUrl: "",
          })

        let vortexBillPaymentTransactionResult =
          await vortexBillPaymentTransactionResponse.json()

        if (vortexBillPaymentTransactionResponse.status === 200) {
          let refNo = vortexBillPaymentTransactionResult?.referenceNumber

          //Check if the response is error
          if (typeof refNo === "undefined") {
            // await processPaymongoRefund({
            //   payment_id: paymentData?.data?.attributes?.payments[0]?.id,
            //   amount: paymentData?.data?.attributes?.amount,
            //   notes: "Failure of vortex request",
            //   reason: "others",
            // })

            setErrorData({
              isError: true,
              message: `Error code: ${vortexBillPaymentTransactionResult.message}`,
            })

            return
          }

          if (vortexBillPaymentTransactionResult.transactionData)
            setTransactionDetails(vortexBillPaymentTransactionResult)

          navigate(
            `/vortextransactions/billspayment/${vortexBillPaymentTransactionResult.referenceNumber}`
          )
        } else {
          // await processPaymongoRefund({
          //   payment_id: paymentData?.data?.attributes?.payments[0]?.id,
          //   amount: paymentData?.data?.attributes?.amount,
          //   notes: "Failure of vortex request",
          //   reason: "others",
          // })
          setErrorData({
            isError: true,
            message: "There is an error on the request to vortex",
          })
        }
      } else {
        // await processPaymongoRefund({
        //   payment_id: paymentData?.data?.attributes?.payments[0]?.id,
        //   amount: paymentData?.data?.attributes?.amount,
        //   notes: "Failure of vortex request",
        //   reason: "others",
        // })
        setErrorData({
          isError: true,
          message: "There is an error on the request to vortex",
        })
      }
    } catch (error) {
      setErrorData({
        isError: true,
        message: `${error}`,
      })
    }
  }

  //This will load all billers when component is rendered
  useEffect(async () => {
    setisLoading(true)
    let vortexTokenResponse = await getVortexTokenBase()

    if (vortexTokenResponse.status === 200) {
      let vortextTokenResult = await vortexTokenResponse.json()

      getBillers(vortextTokenResult.access_token, 1, 1000).then((response) => {
        setisLoading(false)
        if (response.status === 200) {
          response.json().then((result) => {
            setData(result)
          })
        } else {
          setisLoading(false)
          response.json().then((result) => {
            setErrorData({
              isError: true,
              message: result.error.message,
            })
          })
        }
      })
    } else {
      setisLoading(false)
      vortexTokenResponse.json().then((result) => {
        setErrorData({
          isError: true,
          message: result.error.message,
        })
      })
    }
  }, [])

  //This will compile all biller categories when data is received
  useEffect(() => {
    let gatheredCategories = []
    if (data?.docs?.length > 0) {
      for (let index = 0; index < data?.docs?.length; index++) {
        if (!gatheredCategories.includes(data.docs[index].category)) {
          gatheredCategories.push(data.docs[index].category)
        }
      }
      setcategories(gatheredCategories)
    }
  }, [data])

  //This will display all compiled categories
  const BillsPaymentCategoriesPage = () => {
    const [_billers, _setBillers] = useState([])
    const [search, setSearch] = useState([])

    const [_currentSelectedCategory, _setCurrentSelectedCategory] = useReducer(
      filterBillerByCategories,
      ""
    )

    //This will filter all biller by categories
    function filterBillerByCategories(state, category) {
      let filteredBillers = []
      if (data?.docs?.length > 0) {
        for (let index = 0; index < data?.docs?.length; index++) {
          if (data?.docs[index]?.category === category) {
            filteredBillers.push(getBillerAbbreviation(data?.docs[index]))
          }
        }
        _setBillers(filteredBillers)
      }

      return category
    }

    function searchBillers(search) {
      if (search.trim().replaceAll(" ", "").length === 0) {
        setSearch([])
        return
      }

      let filteredBillers = []
      if (data?.docs?.length > 0) {
        for (let index = 0; index < data?.docs?.length; index++) {
          let billerName = data?.docs[index].name
            .toLowerCase()
            .replaceAll(" ", "")
          if (billerName.includes(search.toLowerCase()))
            filteredBillers.push(data?.docs[index])
        }
      }

      setSearch(filteredBillers)
    }

    return (
      <Box>
        <VortexFormToolbar
          title={"Bills payment"}
          onClickBack={() => {
            navigate(-1)
          }}
        />
        <Toolbar />

        {!isLoading && (
          <>
            <VortexBillerSearch onInput={searchBillers} />
            {search.length === 0 ? (
              <>
                <VortexBillerAccordionList
                  categories={categories}
                  billers={_billers}
                  onSelectCategory={(category) => {
                    _setCurrentSelectedCategory(category)
                  }}
                  onSelectBiller={(biller) => {
                    setCurrentSelectedCategory(_currentSelectedCategory)

                    setSelectedBiller(biller)
                    stepForward()
                  }}
                />
              </>
            ) : (
              <VortexBillerSearchResult
                billers={search}
                onBillerSelect={(biller) => {
                  setCurrentSelectedCategory(biller.category)
                  setSelectedBiller(biller)
                  stepForward()
                }}
              />
            )}
          </>
        )}
      </Box>
    )
  }

  const VortexBillerSearchResult = ({ billers, onBillerSelect }) => {
    return billers.map((biller) => {
      return (
        <VortexBillerListItem
          id={biller.id}
          title={biller.name}
          category={biller.category}
          onClick={() => {
            onBillerSelect(biller)
          }}
        />
      )
    })
  }

  const VortexBillerSearch = ({ onInput }) => {
    let [input, setInput] = useState("")
    let delay = (function (callback, ms) {
      let timer = 0
      return function (callback, ms) {
        clearTimeout(timer)
        timer = setTimeout(callback, ms)
      }
    })()

    let searchAfterDelay = (e) => {
      setInput(e.target.value)
      delay(function () {
        //search here
        onInput(e.target.value)
      }, 1000)
    }

    return (
      <div
        style={{
          margin: "1em",
        }}
      >
        <div className="heading-search-container">
          <div className="heading-search-shape">
            <InputBase
              disabled={false}
              style={{
                width: "100%",
                fontFamily: "montserrat",
                fontSize: "1em",
                fontWeight: "500",
                color: "#6b6b6b",
                paddingLeft: "0.3em",
                zIndex: 999,
              }}
              placeholder="Search for products here"
              onInput={searchAfterDelay}
              value={input}
            // onKeyPress={(e) => {
            //   // alert(e.key)

            //   if (e.key === 'Enter') {
            //     navigate('/search')
            //   }
            // }}
            />
            {input?.length > 0 && (
              <div
                style={{
                  color: "grey",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  setInput("")
                  onInput("")
                }}
              >
                X
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  //This will display billers by category
  const BillersListByCategory = () => {
    if (currentSelectedCategory === null) {
      return <div></div>
    }

    return (
      <Box>
        <VortexFormToolbar
          title={"Bills payment"}
          onClickBack={() => {
            stepBack()
          }}
        />
        <Toolbar />
        <List
          dense
          sx={{ width: "100%", bgcolor: "background.paper", marginLeft: "1em" }}
        >
          {renderData.map((v) => {
            return (
              <VortexBillerCard
                title={v.name}
                onClick={() => {
                  setSelectedBiller(v)
                  stepForward()
                }}
              />
            )
          })}
        </List>
      </Box>
    )
  }

  //This is the main layout for biller details
  const BillerDetails = () => {
    const [billerDetails, setbillerDetails] = useState(null)

    const [isLoadingBiller, setIsLoadingBiller] = useState(false)

    useEffect(async () => {
      setIsLoadingBiller(true)
      let vortexTokenResponse = await getVortexTokenBase()

      if (vortexTokenResponse.status === 200) {
        let vortextTokenResult = await vortexTokenResponse.json()
        getBillerById(vortextTokenResult.access_token, selectedBiller.id).then(
          (response) => {
            if (response.status === 200) {
              response.json().then((result) => {
                console.log(result)
                setbillerDetails(result)
                setIsLoadingBiller(false)
              })
            }
          }
        )
      } else {
        setIsLoadingBiller(false)
      }
    }, [])

    if (isLoadingBiller) {
      return <CenteredProgress />
    }

    return (
      <Box>
        {!isLoggin ? (
          <LoginPage />
        ) : (
          <Box>
            <VortexFormToolbar
              title={"Bills payment"}
              onClickBack={() => {
                stepBack()
              }}
            />
            <Toolbar />
            <Box style={{ margin: "1em", paddingTop: "1em" }}>
              <Stack spacing={1} textAlign={"center"}>
                <Stack direction={"row"} justifyContent={"center"}>
                  <VortexBillerLogoComponent
                    id={billerDetails?.id}
                    billerName={billerDetails?.name}
                    altComponent={
                      <BillerIcon categoryName={billerDetails?.category} />
                    }
                  />
                </Stack>
                <Typography
                  color="gray"
                  style={{ fontSize: "1.5em", fontWeight: "bold" }}
                >
                  {billerDetails?.name.toUpperCase()}
                </Typography>
                <BillerFormGenerator formFields={billerDetails?.form} />
              </Stack>
            </Box>
          </Box>
        )}
      </Box>
    )
  }

  //This will generate the form base on the response
  const BillerFormGenerator = ({ formFields = [] }) => {
    const [isFormLoading, setIsFormLoading] = useState(false)

    let initValues = {}

    for (let index = 0; index < formFields?.length; index++) {
      initValues[`${formFields[index]?.fieldRules[0].elementName}`] = ""
    }

    const formSchema = yup.object({
      AmountDue: yup
        .number()
        .oneOf(
          [yup.ref("AmountPaid"), null],
          "AmountDue and Amount paid must match"
        ),
      AmountPaid: yup
        .number()
        .oneOf(
          [yup.ref("AmountDue"), null],
          "AmountDue and AmountPaid must match"
        ),
    })

    console.log(formFields)

    return (
      <Box>
        <Formik
          initialValues={initValues}
          onSubmit={async (data) => {
            try {
              setIsFormLoading(true)

              //todo: add minimum value for money validation - can't add it on html form as we are using strings

              if (Reflect.has(data, 'billAmount'))
                data.billAmount = parseFloat(data.billAmount).toFixed(2)

              if (Reflect.has(data, 'AmountPaid'))
                data.AmountPaid = parseFloat(data.AmountPaid).toFixed(2)

              if (Reflect.has(data, 'amount'))
                data.amount = parseFloat(data.amount).toFixed(2)

              let { convenienceFee, grandTotalFee } = getServiceFee({
                amount:
                  data?.billAmount ||
                  data?.AmountPaid ||
                  data?.amount,
                currency: "PHP",
              })

              let collectedBillDetails = trimObjValues(data)

              let reqInputPayload = {
                billerId: selectedBiller.id,
                billDetails: { ...collectedBillDetails },
                callbackUrl: "app.sparkles.com.ph",
              }

              let result = await saveVortexBillsPaymentTransaction({
                requestInputPayload: reqInputPayload,
                convenienceFee: convenienceFee,
                totalAmount: grandTotalFee,
              })

              setTransactionDocId(result._id)

              setTransactionReferenceId(result.referenceNumber)

              setIsFormLoading(false)

              setBillDetails(collectedBillDetails)

              stepForward()
            } catch (error) {
              setErrorData({
                isError: true,
                message: `${error}`,
              })
            }
          }}
          validationSchema={formSchema}
        >
          {({ handleChange, values }) => (
            <Form>
              <Stack spacing={2} margin={2}>
                {formFields.map((v) => {
                  //Date input
                  if (v?.fieldRules[0]?.inputType === "date") {
                    let date = new Date()
                    let today = `${date.getFullYear()}-${date
                      .getMonth()
                      .toString()
                      .padStart(2, 0)}-${date
                        .getDay()
                        .toString()
                        .padStart(2, 0)}`

                    return (
                      <TextField
                        name={v?.fieldRules[0]?.elementName}
                        helperText={v?.fieldName}
                        required={v?.fieldRules[0]?.requiredField}
                        type={v?.fieldRules[0]?.inputType}
                        disabled={
                          v?.fieldRules[0]?.state === "enabled" ? false : true
                        }
                        hidden={v?.fieldRules[0]?.hidden}
                        inputProps={{
                          maxLength: v?.fieldRules[0]?.maxFieldLength,
                          minLength: v?.fieldRules[0]?.minFieldLength,
                        }}
                        onChange={handleChange}
                      />
                    )
                  }

                  //Select or drop down input
                  if (v?.fieldRules[0]?.inputType === "select") {
                    let selectOptions =
                      v?.fieldRules[0]?.inputTypeOption.split(",")
                    return (
                      <FormControl>
                        <InputLabel id="demo-simple-select-helper-label">
                          {v?.fieldName}
                        </InputLabel>
                        <Select
                          name={v?.fieldRules[0]?.elementName}
                          label={v?.fieldName}
                          required={v?.fieldRules[0]?.requiredField}
                          type={v?.fieldRules[0]?.inputType}
                          disabled={
                            v?.fieldRules[0]?.state === "enabled" ? false : true
                          }
                          onChange={handleChange}
                        >
                          {selectOptions.map((option) => (
                            <MenuItem value={option.split(":")[0]}>
                              {option.split(":")[1]}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {v?.fieldRules[0]?.inputFormat}
                        </FormHelperText>
                      </FormControl>
                    )
                  }

                  //Default text input
                  return (
                    <VortexCustomTextField
                      name={v?.fieldRules[0]?.elementName}
                      label={v?.fieldName}
                      required={v?.fieldRules[0]?.requiredField}
                      type={v?.fieldRules[0]?.inputType}
                      disabled={
                        v?.fieldRules[0]?.state === "enabled" ? false : true
                      }
                      hidden={v?.fieldRules[0]?.hidden}
                      inputProps={{
                        datatype: v?.fieldRules[0]?.dataType,
                        maxLength: v?.fieldRules[0]?.maxFieldLength,
                        minLength: v?.fieldRules[0]?.minFieldLength,
                      }}
                      helperText={v?.fieldRules[0]?.inputFormat}
                      onChange={handleChange}
                    />
                  )
                })}


                <Button
                  disabled={isFormLoading}
                  variant="contained"
                  type="submit"
                  sx={{
                    width: "100%",
                    marginTop: "1em",
                    borderRadius: "2em",
                    height: "3em",
                    color: "white !important",
                    background: primaryVortexTheme.button,
                  }}
                >
                  {isFormLoading ? "Please wait..." : "CONTINUE"}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
        {/* <PaymongoPaymentDialog
          psa={
            billDetails?.billAmount ||
            billDetails?.AmountPaid ||
            billDetails?.amount
          }
          fee={sparkleBillsPaymentFee}
          onContinue={() => {
            stepForward()
          }}
        /> */}
        <Box sx={{ height: "10em" }} />
      </Box>
    )
  }

  const ReviewConfirmationForm = () => {
    let paymentMethodType = ls.get("paymentMethodType")
    let fields = jsonFieldsToArray(billDetails)
    // let [paymentDetails, setPaymentDetails] = useState({})

    const { email, name, phone, address } = getUser()


    const [isLoadingPrivate, setIsLoadingPrivate] = useState(false)
    const [isPaymentMethodGCash, setisPaymentMethodGCash] = useState(false)
    const [expanded, setExpanded] = useState("panel1")


    let { convenienceFee, grandTotalFee } = expanded === "panel2" ? getGcashServiceFee({
      amount:
        billDetails?.billAmount ||
        billDetails?.AmountPaid ||
        billDetails?.amount,
      currency: "PHP",
    }) : getServiceFee({
      amount:
        billDetails?.billAmount ||
        billDetails?.AmountPaid ||
        billDetails?.amount,
      currency: "PHP",
    })


    const handleAccordionChange = (panel) => (event, isExpanded) => {
      console.log(panel, isExpanded)
      // setExpanded(isExpanded ? panel : false)
      if (panel === "panel1" && isExpanded == false) {
        setExpanded("panel2")
      } else if (panel === "panel1" && isExpanded) {
        setExpanded("panel1")
      } else if (panel === "panel2" && isExpanded == false) {
        setExpanded("panel1")
      } else if (panel === "panel2" && isExpanded) {
        setExpanded("panel2")
      }
    }

    // useEffect(() => {
    //   let mounted = true

    //   if (mounted) {
    //     let name = `${
    //       fields[fields.findIndex((field) => field[0] === "first_name")][1]
    //     } ${fields[fields.findIndex((field) => field[0] === "last_name")][1]}`
    //     let accountNumber = `${
    //       fields[fields.findIndex((field) => field[0] === "account_number")][1]
    //     }`
    //     let amountDue = `${
    //       fields[fields.findIndex((field) => field[0] === "billAmount")][1]
    //     }`
    //     setPaymentDetails({
    //       name,
    //       accountNumber,
    //       amountDue,
    //     })
    //   }
    //   return () => {
    //     mounted = false
    //   }
    // }, [])

    return (
      <Box>
        {!isLoggin ? (
          <LoginPage />
        ) : (
          <div style={{ zIndex: 0 }}>
            {/* {isLoading && <CenteredProgress />} */}
            {!isLoadingPrivate && (
              <>
                <VortexFormToolbar
                  title={"Bills payment"}
                  onClickBack={() => {
                    stepBack()
                  }}
                />
                <Toolbar />
                <Box style={{ margin: "2em 1em 1em 1em  " }}>
                  <Stack style={{ margin: "0.5em" }}>
                    <Typography
                      style={{
                        color: "#0060bf",
                        marginTop: "1em",
                      }}
                      fontWeight={"bold"}
                      fontSize={30}
                    >
                      Account Details
                    </Typography>
                    <Divider />
                  </Stack>
                  <Stack spacing={2} style={{ marginBottom: "1em" }}>
                    {/* <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography
                        fontWeight={"bold"}
                        style={{
                          color: "grey",
                        }}
                        sx={{ textTransform: "capitalize" }}
                      >
                        Account Name
                      </Typography>

                      <Typography fontWeight={"bold"}>
                        {paymentDetails?.name}
                      </Typography>
                    </Stack> */}
                    {fields.map((field) => {
                      return (
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                        >
                          <Typography
                            fontWeight={"bold"}
                            style={{
                              color: "grey",
                            }}
                            sx={{ textTransform: "capitalize" }}
                          >
                            {field[0].replace("_", ' ').trim().replace(/[A-Z]/g, ' $&').trim()}
                          </Typography>

                          <Typography fontWeight={"bold"}>
                            {field[1]}
                          </Typography>
                        </Stack>
                      )
                    })}
                    <Divider />

                    <Typography
                      style={{
                        color: "#0060bf",
                        marginTop: "1em",
                      }}
                      fontWeight={"bold"}
                      fontSize={15}
                    >
                      You're about to pay
                    </Typography>

                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography
                        fontWeight={"bold"}
                        style={{
                          color: "grey",
                        }}
                        sx={{ textTransform: "capitalize" }}
                      >
                        Convenience Fee
                      </Typography>

                      {expanded === "panel2" ? (
                        <Typography fontWeight={"bold"}>{`0 PHP`}</Typography>
                      ) : (
                        <Typography
                          fontWeight={"bold"}
                        >{`${convenienceFee} PHP`}</Typography>
                      )}
                    </Stack>

                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography
                        fontWeight={"bold"}
                        style={{
                          color: "grey",
                        }}
                      >{`Total Amount`}</Typography>
                      <Typography
                        fontWeight={"bold"}
                      >{`${grandTotalFee} PHP`}</Typography>
                    </Stack>
                  </Stack>

                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleAccordionChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Credit/Debit Card</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <PayPalScriptProvider
                        options={{
                          "client-id": process.env.REACT_PAYPAL_CLIENT_ID,
                          currency: "PHP",
                        }}
                      >
                        <PayPalButtons
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    //Vortex transaction amount
                                    value: grandTotalFee,
                                  },
                                  description: `Payment for ${selectedBiller?.name}`,
                                },
                              ],
                              application_context: {
                                brand_name: "Sparkle Star International",
                                shipping_preference: "NO_SHIPPING",
                              },
                            })
                          }}
                          onApprove={(data, actions) => {
                            return actions.order
                              .capture()
                              .then(async (details) => {
                                let paymentData = {
                                  data: data,
                                  details: details,
                                  convenienceFee: convenienceFee
                                }

                                await handleVortexRequest({
                                  docId: transactionDocId,
                                  paymentData: paymentData,
                                })
                              })
                          }}
                          style={{ layout: "vertical" }}
                        />
                      </PayPalScriptProvider>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleAccordionChange("panel2")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>e-Wallet</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography> */}
                      <div
                        style={{
                          display: "block",
                          whiteSpace: "nowrap",
                          padding: "8px 16px 16px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            borderRadius: "4px",
                            display: "inline-block",
                            textAlign: "center",
                            height: "55px",
                            position: "relative",
                            width: "100%",
                            overflow: "hidden",
                            cursor: "pointer",
                          }}
                          onClick={async () => {
                            await handleVortexRequestGCash({
                              paymentData: {
                                biller: selectedBiller,
                                billDetails,
                                paymentMethodType: paymentMethodType,
                                convenienceFee: convenienceFee,
                                grandTotalFee: grandTotalFee,
                              },
                            })
                          }}
                        >
                          <div
                            style={{
                              margin: "0px 4vw",
                              height: "24px",
                              position: "relative",
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "20px",
                                marginTop: "-2px",
                                lineHeight: "24px",
                              }}
                            >
                              GCash Manual
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </>
            )}
            <Backdrop
              sx={{ zIndex: 900 }}
              open={isLoadingPrivate}
              onClick={() => { }}
            >
              <CircularProgress />
            </Backdrop>
          </div>
        )}
      </Box>
    )
  }

  const FormRender = (step) => {
    switch (step) {
      case 0:
        return <BillsPaymentCategoriesPage />
      case 1:
        return <BillerDetails />
      case 2:
        return <ReviewConfirmationForm />
      default:
        return
    }
  }

  return (
    <div>
      <Backdrop sx={{ zIndex: 900 }} open={isLoading} onClick={() => { }}>
        <CircularProgress />
      </Backdrop>
      {error.isError ? (
        <VortexError
          message={error.message}
          onClick={() => {
            setErrorData({
              isError: false,
              message: "",
            })
            setActiveStep(0)
          }}
        />
      ) : (
        <div
          style={{
            marginBottom: "5em",
          }}
        >
          {FormRender(activeStep)}
        </div>
      )}
      <VortexBottomGradient />
      <BottomNavigator />
    </div>
  )
}

export default VortexBillsPaymentPage
