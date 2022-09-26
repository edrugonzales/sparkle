import React, { useState, useEffect } from "react"
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Tabs,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { getTransactionByRefNumber } from "../../../api/public/vortex/topup_service"
import { useParams } from "@reach/router"
import { getVortexTokenBase } from "../../../api/public/vortex/token_service"
import moment from "moment"
import CenteredProgress from "../../misc/centeredProgress"
import { getBillspaymentTransactionByRefNumber } from "../../../api/public/vortex/billspayment_service"
import { getGiftTransactionByRefNumber } from "../../../api/public/vortex/gifts_service"
import {
  getVortexTransactionByRefId,
  updateVortexByRefId,
} from "../../../api/public/vortex/transaction_db/index"
import processPaymongoRefund from "../../../services/paymongo/function/processPaymongoRefund"
import { CopyToClipboard } from "react-copy-to-clipboard"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}

const VortexTransactionHistoryDetails = (props) => {
  let { type, refId } = useParams()

  const [isLoading, setIsLoading] = useState(false)

  const [errorData, setErrorData] = useState({
    isError: false,
    message: "",
  })

  const [copied, setCopied] = useState(false)
  const [inputsent, setInputSent] = useState(false)
  const [value, setValue] = useState(0)
  const [inputvalue, setInputValue] = useState("")
  const [inputvalueholder, setInputValueHolder] = useState("")

  const [transaction, setTransaction] = useState(null)

  const [sparkleTransactionLog, setSparkleTransactionLog] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const [transactionDataFromSparkleDB, setTransactionDataFromSparkleDB] =
    useState(null)

  const getTransactionByRefNumberTypeDef = async (
    access_token,
    refId,
    type
  ) => {
    switch (type) {
      case "topup":
        return await getTransactionByRefNumber(access_token, refId)
      case "billspayment":
        return await getBillspaymentTransactionByRefNumber(access_token, refId)
      case "gift":
        return await getGiftTransactionByRefNumber(access_token, refId)
      default:
        return await getTransactionByRefNumber(access_token, refId)
    }
  }

  const transactionFormBuilder = (type) => {

    let parseReqInput = JSON.parse(sparkleTransactionLog != null ? sparkleTransactionLog?.requestInputPayload : '{}')

    let parseInitialResponse = JSON.parse(sparkleTransactionLog != null ? sparkleTransactionLog?.transactionData : '{}')

    switch (type) {
      case "topup":
        return (
          <Stack textAlign={"center"} spacing={2}>
            <Typography fontWeight={"bold"} color={"gray"}>
              TRANSACTION DETAILS
            </Typography>
            <Stack direction={"row"} justifyContent={"center"}>
              <Avatar>
                {" "}
                {String(transaction?.productCode).substring(0, 1)}
              </Avatar>
            </Stack>
            <Typography fontWeight={"bold"} color={"gray"}>
              {transaction?.productCode}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={15}>
              {`Recepient. No. ${transaction?.recipientNumber}`}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={15}>
              {`Ref. No. ${transaction?.referenceNumber}`}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={30}>
              {`PHP ${parseInitialResponse?.productPrice}`}
            </Typography>
            <Divider />
            <Typography fontSize={10}>{transaction?.remarks}</Typography>
            <Typography fontSize={10}>
              {/* PLDT vortex dateCreated gives +0000 - Singapore standard time */}
              {`${moment(
                `${transaction?.dateCreated?.split("+")[0]}+0800`
              ).format("YYYY MMMM DD | hh:mm:ss a")} - Asia/Manila Time`}
            </Typography>
            <Typography fontSize={10}>
              {`STATUS: ${transaction?.status}`}
            </Typography>
          </Stack>
        )
      case "billspayment":
        console.log("currentTransactionData", sparkleTransactionLog?.currentTransactionData)
        return (
          <Stack textAlign={"center"} spacing={2}>
            <Typography fontWeight={"bold"} color={"gray"}>
              TRANSACTION DETAILS
            </Typography>
            <Stack direction={"row"} justifyContent={"center"}>
              <Avatar> {String(transaction?.biller).substring(0, 1)}</Avatar>
            </Stack>
            <Typography fontWeight={"bold"} color={"gray"}>
              {transaction?.biller}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={10}>
              {`Ref. No. ${transaction?.transactionNumber}`}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={10} color={"gray"}>
              {`Account Number: ${parseReqInput?.billDetails?.account_number}`}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={30}>
              {`PHP ${sparkleTransactionLog?.totalAmount === null ? sparkleTransactionLog?.currentTransactionData?.amount : sparkleTransactionLog?.totalAmount}`}
            </Typography>
            <Divider />
            <Typography fontSize={10}>
              {transaction?.statusDescription}
            </Typography>
            <Typography fontSize={10}>
              {/* PLDT vortex dateCreated gives +0000 - Singapore standard time */}
              {`${moment(
                `${transaction?.dateCreated?.split("+")[0]}+0800`
              ).format("YYYY MMMM DD | hh:mm:ss a")} - Asia/Manila Time`}
            </Typography>
            <Typography fontSize={10} >
              {`STATUS: ${transaction?.status}`}
            </Typography>
          </Stack>
        )
      case "gift":
        if (transaction) {
          let FormFields = transaction?.formDetails
          let FormDetailsArray = Object.keys(transaction?.formDetails).map(
            (v) => [v, FormFields[v]]
          )

          return (
            <Stack textAlign={"center"} spacing={2}>
              <Typography fontWeight={"bold"} color={"gray"}>
                TRANSACTION DETAILS
              </Typography>
              <Stack direction={"row"} justifyContent={"center"}>
                <Avatar>
                  {" "}
                  {String(transaction?.productCode).substring(0, 1)}
                </Avatar>
              </Stack>
              <Typography fontWeight={"bold"} color={"gray"}>
                {transaction?.productCode}
              </Typography>
              <Typography fontWeight={"bold"} fontSize={15}>
                {`Ref. No. ${transaction?.referenceNumber}`}
              </Typography>
              <Typography fontWeight={"bold"} fontSize={30}>
                {`PHP ${transaction?.currentTransactionData === null ? parseInitialResponse?.productPrice * parseReqInput?.formData?.quantity : sparkleTransactionLog?.totalAmount}`}
              </Typography>
              <Box mr={10} ml={10}>
                {FormDetailsArray.map((field) => {
                  return (
                    <Stack direction={"row"} justifyContent="space-between">
                      <Typography fontSize={10}>{`${field[0]}`}</Typography>
                      <Typography fontSize={10}>{`${field[1]}`}</Typography>
                    </Stack>
                  )
                })}
              </Box>
              <Divider />
              <Typography fontSize={10}>
                {`${moment(transaction?.transactionDate).format(
                  "YYYY MMMM DD | hh:mm:ss a"
                )}`}
              </Typography>
              <Typography fontSize={10}>
                {`STATUS: ${transaction?.statusDescription}`}
              </Typography>
            </Stack>
          )
        }
      default:
        return (
          <Stack textAlign={"center"} spacing={2}>
            <Typography fontWeight={"bold"} color={"gray"}>
              TRANSACTION DETAILS
            </Typography>
            <Stack direction={"row"} justifyContent={"center"}>
              {/* <Avatar> {String(transaction?.productCode).substring(0, 1)}</Avatar> */}
            </Stack>
            <Typography fontWeight={"bold"} color={"gray"}>
              {transaction?.productCode}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={15}>
              {`Recepient. No. ${transaction?.recipientNumber}`}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={15}>
              {`Ref. No. ${transaction?.referenceNumber}`}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={30}>
              {`PHP ${transaction?.currentTransactionData === null ? transaction?.currentTransactionData?.amount : sparkleTransactionLog?.totalAmount}`}
            </Typography>
            <Divider />
            <Typography fontSize={10}>{transaction?.remarks}</Typography>
            <Typography fontSize={10}>
              {/* PLDT vortex dateCreated gives +0000 - Singapore standard time */}
              {`${moment(
                `${transaction?.dateCreated?.split("+")[0]}+0800`
              ).format("YYYY MMMM DD | hh:mm:ss a")} - Asia/Manila Time`}
            </Typography>
            <Typography fontSize={10}>
              {`STATUS: ${transaction?.status}`}
            </Typography>
          </Stack>
        )
    }
  }

  useEffect(async () => {
    setIsLoading(true)

    if (props?.location?.state?.paymentId === "Awaiting for GCash Payment") {
      setTransaction(JSON.parse(props.location.state.transactionData))
      setIsLoading(false)
    } else {
      let vortexTokenResponse = await getVortexTokenBase()

      if (vortexTokenResponse.status === 200) {
        let vortextTokenResult = await vortexTokenResponse.json()
        let response = await getTransactionByRefNumberTypeDef(
          vortextTokenResult.access_token,
          refId,
          type
        )

        if (response.status === 200) {
          let result = await response.json()
          setIsLoading(false)
          setTransaction(result)

          let savedLogs = await getVortexTransactionByRefId({ refId: result?.referenceNumber || result?.transactionNumber })

          setSparkleTransactionLog(savedLogs)

          console.log('Saved logs', savedLogs)

          return result
        } else {
          let result = await response.json()
          setIsLoading(false)
          setErrorData({
            isError: true,
            message: result.error.message,
          })
        }
      } else {
        let vortextTokenResult = await vortexTokenResponse.json()
        setIsLoading(false)
        setErrorData({
          isError: true,
          message: vortextTokenResult.error.message,
        })
      }
    }
  }, [])

  useEffect(async () => {
    //refund process?
    if (props?.location?.state?.paymentId === "Awaiting for GCash Payment") {
    } else {
      try {
        //check if transaction has data
        if (transaction) {
          //check if transaction status is failing
          if (transaction?.status < 0 || transaction?.status === "Failed") {
            //get transaction payment id saved together with the vortex transaction
            let vortexSavedTransaction = await getVortexTransactionByRefId({
              refId:
                transaction?.referenceNumber || transaction?.transactionNumber,
            })

            //check if request is successfull
            if (vortexSavedTransaction.status === 200) {
              let vortexSavedTransactionResult =
                await vortexSavedTransaction.json()

              setTransactionDataFromSparkleDB(vortexSavedTransactionResult)

              //check if refund is already processed if not processRefund
              if (!vortexSavedTransactionResult?.paymongoRefundResourceID) {
                //process refund if status is failed
                // let savedPaymongoRefund = await processPaymongoRefund({
                //   payment_id: vortexSavedTransactionResult?.paymentId,
                //   amount: vortexSavedTransactionResult?.totalAmount,
                //   notes: "Failure of vortex request",
                //   reason: "others",
                // })

                // let updateObj = {
                //   paymongoRefundResourceID: savedPaymongoRefund._id,
                // }

                // //attach saved mongodb refund id to transaction
                // return await updateVortexByRefId({
                //   refId:
                //     transaction?.referenceNumber ||
                //     transaction?.transactionNumber,
                //   data: updateObj,
                // })
                return
              } else {
                return
              }
            } else {
              return
            }
          } else {
            return
          }
        }
      } catch (error) {
        throw Error(error)
      }
    }
  }, [transaction])



  return (
    <Box>
      <AppBar position="fixed" style={{ background: "#ffffff" }}>
        <Toolbar>
          <IconButton
            onClick={() => {
              navigate(-1)
            }}
            style={{ color: "black" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography marginLeft={3} color={"black"}>
            Vortex transaction details
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {isLoading && <CenteredProgress />}
      {!isLoading && !(transaction?.status >= 400 || String(transaction?.status).toLowerCase() === "failed") && (props?.location?.state?.paymentId !== "Awaiting for GCash Payment") && (
        <Card elevation={10} style={{ margin: 10 }}>
          <CardContent>
            {transactionFormBuilder(type)}{" "}
            {transactionDataFromSparkleDB?.paymongoRefundResourceID && (
              <Stack direction={"row"} justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(
                      `/paymongo/refund/details/${transactionDataFromSparkleDB?.paymongoRefundResourceID?.referenceNumber}`
                    )
                  }}
                >
                  VIEW REFUND
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>
      )}
      {
        !isLoading && (props?.location?.state?.paymentId === "Awaiting for GCash Payment") &&
        <Stack textAlign={"center"} spacing={2}>
          <Typography fontWeight={"bold"} color={"gray"}>
            TRANSACTION DETAILS
          </Typography>
          <Stack direction={"row"} justifyContent={"center"}>
            <Avatar>
              {" "}
              {String(transaction?.product?.name).substring(0, 1)}
            </Avatar>
          </Stack>
          <Typography fontWeight={"bold"} color={"gray"}>
            {transaction?.product?.description}
          </Typography>
          <Typography fontWeight={"bold"} fontSize={15}>
            {`Recipient. No. ${transaction?.number}`}
          </Typography>
          <Typography fontWeight={"bold"} fontSize={15}>
            {`Ref. No. ${props.location.state?.referenceNumber}`}
          </Typography>
          <Divider />
          <Typography fontSize={10}>Awaiting for payment</Typography>
          <Typography fontSize={10}>
            {`${moment(props.location.state?.createdAt).format(
              "YYYY MMMM DD | hh:mm:ss a"
            )}`}
          </Typography>
          <Typography fontSize={10}>
            {`STATUS: Awaiting for payment`}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: 224,
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Gcash Payment Options"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="Pay via Number" {...a11yProps(0)} />
              {/* <Tab label="Pay via QR" {...a11yProps(1)} /> */}
              <Tab label="Request for payment" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <p>
                GCash Number: 09107727553
                {/* todo: get from platform variables */}
              </p>
              {/* todo: get from platform variables */}
              <CopyToClipboard
                text={"09107727553"}
                onCopy={() => {
                  setCopied(true)
                  setTimeout(() => {
                    setCopied(false)
                  }, 3000)
                }}
              >
                <button>Copy Number</button>
              </CopyToClipboard>

              {copied ? <span style={{ color: "red" }}> Copied.</span> : null}
              <p>
                GCash Name: Abigail D.
                {/* todo: get from platform variables */}
              </p>
              <p>Pay: P {props.location.state.totalAmount}</p>
              <button> Learn How</button>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <p>Want us to request payment via GCash?</p>
              <input type={"number"}></input>
              <button
                onClick={() => {
                  fetch(
                    " https://discord.com/api/webhooks/823325081354502155/lkwrZFJ4vbECk3_dEmboOQaVbpDWfMYnYoOJpDVXaPjNJacDhE-DrCjo5zO1SIPWCJpm",
                    {
                      method: "post",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        // the username to be displayed
                        username: "GCash Payment Request",
                        // the avatar to be displayed
                        avatar_url:
                          "https://play-lh.googleusercontent.com/QNP0Aj2hyumAmYiWVAsJtY2LLTQnzHxdW7-DpwFUFNkPJjgRxi-BXg7A4yI6tgYKMeU",
                        // contents of the message to be sent
                        content: `GCash Payment Request: 09171580396 Total to be paid: ${props.location.state.totalAmount} - Transaction Id: ${props.location.state.referenceNumber}`,
                      }),
                    }
                  )
                }}
              >
                Request Payment
              </button>
              <br />
              <br />

              <button>Learn More</button>
            </TabPanel>
          </Box>
        </Stack>
      }
      {/* (transaction?.status >= 400 || String(transaction?.status).toLowerCase() === "failed")  */}
      {(transaction?.status >= 400 || String(transaction?.status).toLowerCase() === "failed") && (
        <Box m={3}>
          <Card elevation={10}>
            <CardContent>
              <Typography variant="h5">
                Reference Number: {props?.location?.state?.referenceNumber}
              </Typography>
              <Typography variant="h5">
                &nbsp;
              </Typography>
              <CircularProgress />
              <Typography variant="h6">
                Your order is being processed and will be fullfilled shortly .
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  )
}

export default VortexTransactionHistoryDetails
