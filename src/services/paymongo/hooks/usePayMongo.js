import React, { useState, useEffect, useContext } from "react"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepContent,
  Stepper,
} from "@mui/material"
import paymongo from "../paymongo"
import { StepLabel, Typography } from "@material-ui/core"
import { Form, Formik } from "formik"
import CardNumberFormat from "../components/number_formats/CardNumberFormat"
import CardNumberExpiryFormat from "../components/number_formats/CardNumberExpiryFormat"
import CardNumberCVCFormat from "../components/number_formats/CardNumberCVCFormat"
import useSparkleSnackbar from "../../../custom-hooks/useSparkleSnackbar"
import SecureLS from "secure-ls"
import CenteredProgress from "../../../components/misc/centeredProgress"
import * as yup from "yup"
import PaymongoCustomTextField from "../components/textfields/PaymongoCustomTextField"
import MobileNumberFormat from "../../../components/misc/number_formats/MobileNumberFormat"
import VortexTopupCard from "../../../components/Vortex/components/VortexTopupCard"
import useLoggedUser from "../../../custom-hooks/useLoggedUser"
import ErrorFallbackUI from "../components/misc/ErrorFallbackUI"
import { LoginState } from "../../../components/globalstates"
import Login from "../../../components/LoginPage"
import FormCard from "../components/forms/form_card"
import { getPaymongoFee } from "../function/getPaymongoFee"

//for the product information

import { ListItem, ListItemIcon } from "@mui/material"

import ChevronRightIcon from "@mui/icons-material/ChevronRight"

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      {...props}
    />
  )
}

export default function usePayMongo() {
  const ls = new SecureLS({ encodingType: "aes" })

  const [isLoggin, setisLoggin] = useContext(LoginState)

  const [show, setShow] = useState(false)

  const [show3ds, setShow3ds] = useState(false)

  const [paymentIntentData, setpaymentIntentData] = useState(null)

  const show3dsForm = ({ paymentIntentData }) => {
    setShow3ds(true)
    setpaymentIntentData(paymentIntentData)
  }

  const close3dsForm = () => {
    setShow3ds(false)
  }

  const showPaymentForm = () => {
    setShow(true)
  }

  const closePaymentForm = () => {
    setShow(false)
  }

  const processPayment = async () => {
    try {
      // let paymentData = JSON.parse(ls.get("pData"))
      let paymentIntent = JSON.parse(ls.get("paymentIntent"))
      if (paymentIntent !== null) {
        if (
          paymentIntent?.data?.attributes?.status === "awaiting_payment_method"
        ) {
          const payM = ls.get("paymentMethod") //JSON.parse

          const attachPayI = await paymongo.paymentIntents.attach(
            paymentIntent.data.id,
            {
              data: {
                attributes: {
                  payment_method: payM.data.id,
                  client_key: paymentIntent.data.attributes.client_key,
                },
              },
            }
          )

          if (attachPayI) {
            ls.set("paymentIntent", JSON.stringify(attachPayI))
            closePaymentForm()
            return attachPayI
          }
        } else {
          return paymentIntent
        }
      }
    } catch (e) {
      throw e
    }
  }

  const getPaymentIntent = async () => {
    let paymentIntent = JSON.parse(ls.get("paymentIntent"))
    return paymentIntent
  }

  const Paymongo3ds = ({ onSuccess = () => {} }) => {
    const [errorData, setErrorData] = useState({
      isError: false,
      message: "",
    })

    const recheckPaymentIntent = async () => {
      try {
        // 3D Secure authentication is complete. You can requery the payment intent again to check the status.
        const response = await paymongo.paymentIntents.retrieve(
          paymentIntentData?.data?.id
        )

        var paymentIntent = response?.data
        var paymentIntentStatus = paymentIntent?.attributes?.status

        switch (paymentIntentStatus) {
          case "succeeded":
            // You already received your customer's payment. You can show a success message from this condition.

            onSuccess(response)

            break
          case "awaiting_payment_method":
            // The PaymentIntent encountered a processing error. You can refer to paymentIntent.attributes.last_payment_error to check the error and render the appropriate error message.
            setErrorData((prevState) => ({
              ...prevState,
              isError: true,
              message: `${paymentIntent?.attributes?.last_payment_error?.failed_message}`,
            }))

            break
          case "processing":
            // You need to requery the PaymentIntent after a second or two. This is a transitory status and should resolve to `succeeded` or `awaiting_payment_method` quickly.
            setTimeout(async () => {
              await recheckPaymentIntent()
            }, 10000)
            break

          default:
            // The PaymentIntent encountered a processing error. You can refer to paymentIntent.attributes.last_payment_error to check the error and render the appropriate error message.
            setErrorData((prevState) => ({
              ...prevState,
              isError: true,
              message: `${paymentIntent?.attributes?.last_payment_error?.failed_message}`,
            }))
            break
        }
      } catch (error) {
        throw Error(error.detail.replace("details.", ""))
      }
    }

    //Execute if payment is successful
    useEffect(() => {
      //Once the user successfully authenticates the card, you can recheck the status of Payment Intent.
      //then execute additional process

      window.addEventListener(
        "message",
        async (ev) => {
          if (ev.data === "3DS-authentication-complete") {
            await recheckPaymentIntent()
          }
        },
        false
      )
    }, [])

    return (
      <Dialog open={show3ds} fullScreen>
        <DialogContent>
          {errorData.isError && (
            <ErrorFallbackUI
              message={errorData.message}
              onGoBack={() => {
                close3dsForm()
              }}
            />
          )}
          {!errorData.isError && (
            <iframe
              src={
                paymentIntentData?.data?.attributes?.next_action?.redirect?.url
              }
              height={"100%"}
              width={"100%"}
              frameBorder={0}
            ></iframe>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  /**
   *
   * @psa (Product Service Amount) this is the amount user needs to pay for the product or service
   * @productNames this is the name of the product or service the user is paying for
   * @onContinue this method will get executed with the default behavior when the continue button is clicked
   */
  const PaymongoPaymentDialog = ({
    psa = 0,
    productNames = "Undefined",
    fee = 0,
    onContinue = () => {},
    productSelected = {},
  }) => {
    useEffect(() => {
      console.log(productSelected)
    }, [])
    const [paymentMethod, setThePaymentMethod] = useState("card")

    const { showSnackbar, closeSnackbar, SparkleSnackBar } =
      useSparkleSnackbar()

    const [isLoading, setLoading] = useState(false)

    let paymentData = JSON.parse(ls.get("pData") || "{}")

    const [paymentIntent, setPaymentIntent] = useState(null)

    const [stepperIndex, setStepperIndex] = useState(0)

    const [isLoggin, setisLoggin] = useContext(LoginState)

    const handleNext = () => {
      setStepperIndex(stepperIndex + 1)
    }

    const handleBack = () => {
      setStepperIndex(stepperIndex - 1)
    }

    const { getUser } = useLoggedUser()

    const { email, name, address, phone } = getUser()

    const { addCity, addState, addPostalCode, addCountry } = paymentData

    const splitAddress = address.split(",")

    const validationSchema = yup.object({
      cardNumber: yup
        .string()
        .length(16, "Invalid card number")
        .required("Required field"),
      cardExpiry: yup
        .string()
        .length(4, "Type month and year 01/29")
        .required("Required field"),
      cardCvc: yup
        .string()
        .length(3, "Found at the back of your card")
        .required("Required field"),
      name: yup.string().required("Required field"),
      email: yup.string().email("Invalid email").required("Required field"),
      phone: yup.string().required("Required field"),
      addLine1: yup.string().required("Required field"),
      addLine2: yup.string().required("Required field"),
      addCity: yup.string().required("Required field"),
      addState: yup.string().required("Required field"),
      addPostalCode: yup.string().required("Required field"),
      addCountry: yup
        .string()
        .length(2, "Country alpha 2 ISO code")
        .required("Required field")
        .uppercase(),
    })

    const createPaymentIntent = async ({ cardNumber }) => {
      try {
        if (show === true) {
          setLoading(true)

          let paymongoFee = await getPaymongoFee({
            amount: psa,
            paymentMethod: paymentMethod,
            cardNumber: cardNumber,
          })

          let totalAmount =
            Math.round(psa) + Math.round(paymongoFee) + Math.round(fee)

          ls.set(
            "paymentBreakdown",
            JSON.stringify({
              convenienceFee: Math.round(paymongoFee) + Math.round(fee),
              grandTotal: totalAmount,
            })
          )

          const payI = await paymongo.paymentIntents.create({
            data: {
              attributes: {
                amount: totalAmount / 0.01,
                payment_method_allowed: ["card"],
                payment_method_options: {
                  card: { request_three_d_secure: "any" },
                },
                currency: "PHP",
                description: `Payment for ${productNames}`,
                statement_descriptor: `Sparkle Star International`,
                metadata: {
                  id: "1231231Order", //will be transfered to the backend
                  chomperName: "ChomperFirst ChomperLastNameOrder",
                },
              },
            },
          })

          setPaymentIntent(payI)

          setLoading(false)

          //

          return payI
        }
      } catch (e) {
        setLoading(false)
        showSnackbar(e.detail.replace("details.", ""), "error")
        setStepperIndex(0)

        // alert(error.detail)
        // closePaymentForm()
        // throw Error(error)
      }
    }

    const createPaymentMethod = async () => {
      try {
        setLoading(true)
        let paymentData = JSON.parse(ls.get("pData"))

        const {
          name,
          email,
          phone,
          addLine1,
          addLine2,
          addCity,
          addState,
          addPostalCode,
          addCountry,
          cardNumber,
          cardExpiry,
          cardCvc,
        } = paymentData

        let payM = await paymongo.paymentMethods.create({
          data: {
            attributes: {
              details: {
                card_number: cardNumber,
                exp_month: parseInt(cardExpiry.substring(0, 2)),
                exp_year: parseInt(cardExpiry.substring(2, 4)),
                cvc: cardCvc,
              },
              billing: {
                address: {
                  line1: addLine1,
                  line2: addLine2,
                  city: addCity,
                  state: addState,
                  postal_code: addPostalCode,
                  country: addCountry,
                },
                name: name,
                email: email,
                phone: phone,
                metadata: {
                  id: "1231231",
                  chomperName: "ChomperFirst ChomperLastNameBilling",
                },
              },
              type: "card",
            },
          },
        })
        ls.set("paymentMethod", payM)
        setLoading(false)
        return payM
      } catch (e) {
        setLoading(false)
        showSnackbar(e.detail.replace("details.", ""), "error")
        setStepperIndex(0)
      }
    }

    return (
      <div>
        <Dialog open={show} fullScreen>
          {!isLoggin && (
            <Login
              showBackButton={true}
              overrideBackFunction={true}
              backFunction={() => {
                closePaymentForm()
              }}
            />
          )}
          {isLoading && isLoggin && <CenteredProgress />}
          {!isLoading && isLoggin && (
            <div
              style={{
                display: "contents",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px",
                }}
              >
                <Typography
                  fontWeight={"bold"}
                  fontFamily={"Visby"}
                  fontSize={25}
                  style={{
                    fontSize: 25,
                    fontWeight: 700,
                  }}
                >
                  Payment Methoda
                </Typography>
              </div>

              {productSelected.code && (
                <ProductInformation
                  code={productSelected.code}
                  name={productSelected.name}
                  desc={productSelected.description}
                  price={productSelected.pricing.price}
                  unit={productSelected.pricing.unit}
                />
              )}

              <div style={{ margin: "10px 10px 10px 10px", padding: "10px  " }}>
                {/* Payment Method Selection */}
                <RadioGroup
                  value={paymentMethod}
                  aria-label="paymentMethod"
                  name="customized-radios"
                >
                  <FormControlLabel
                    value="GCash"
                    control={<BpRadio />}
                    // disabled
                    label="GCash"
                    onChange={(e) => {
                      ls.set(
                        "paymentBreakdown",
                        JSON.stringify({
                          convenienceFee: 0,
                          grandTotal: psa,
                        })
                      )
                      setThePaymentMethod("GCash")
                    }}
                  />

                  <FormControlLabel
                    value="card"
                    control={<BpRadio />}
                    label="Credit or debit card"
                    onChange={(e) => {
                      // disable if less than 100 value
                      setThePaymentMethod("Credit or debit card")
                    }}
                  />
                </RadioGroup>

                {paymentMethod === "card" && (
                  <FormCard
                    isLoading={isLoading}
                    initialValues={{
                      name: name || "",
                      email: email || "",
                      phone: phone || "",
                      addLine1: splitAddress[0] || "",
                      addLine2: splitAddress[1] || "",
                      addCity: addCity || "",
                      addState: addState || "",
                      addPostalCode: addPostalCode || "",
                      addCountry: addCountry || "PH",
                    }}
                    onSubmit={async (data) => {
                      let paymentIntentData = await createPaymentIntent({
                        cardNumber: data?.cardNumber,
                      })

                      ls.set("paymentIntent", JSON.stringify(paymentIntentData))
                      ls.set("pData", JSON.stringify({ ...data }))

                      let paymentMethod = await createPaymentMethod()

                      if (paymentMethod) {
                        ls.set("paymentMethodType", "card")
                        onContinue()
                        closePaymentForm()
                      }
                    }}
                  />
                )}

                {/* insert form for billing */}
              </div>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "10px",
            }}
          >
            {paymentMethod === "GCash" && (
              //  <Box sx={{ mb: 2 }}>
              //  <div>
              <Button
                color="primary"
                variant="contained"
                disabled={isLoading}
                onClick={() => {
                  ls.set("paymentMethodType", "GCash")
                  onContinue()
                  closePaymentForm()
                }}
                type={"submit"}
              >
                {isLoading ? "Processing..." : "Continue"}
              </Button>
              // </div>
              // </Box>
            )}
            <Button
              onClick={() => {
                closePaymentForm()
              }}
              color="primary"
            >
              Cancel
            </Button>
          </div>
        </Dialog>
        <SparkleSnackBar />
      </div>
    )
  }

  return {
    show3dsForm,
    showPaymentForm,
    processPayment,
    getPaymentIntent,
    Paymongo3ds,
    PaymongoPaymentDialog,
  }
}

const ProductInformation = ({
  code = "W100",
  imageUrl = "https://via.placeholder.com/150",
  name = "Product Name",
  desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  price = 100.0,
  unit = "USD",
  onClick = () => {},
}) => {
  const [imgUrl, setImgUrl] = useState(imageUrl)
  return (
    <>
      <ListItem
        button
        onClick={() => {
          onClick()
        }}
      >
        {/* <ListItemIcon>
          <Avatar>{name.substring(0, 1)}</Avatar>
        </ListItemIcon> */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          width={"100%"}
          margin="1em"
        >
          <div style={{ width: "30%", fontWeight: "bold" }}>
            <Typography
              margin={2}
              fontFamily={"Visby"}
              fontWeight={700}
              style={{
                margin: "0px",
                fontSize: "2em",
                fontWeight: 700,
                color: "#0096FF",
              }}
            >
              {price.toFixed(0)}
            </Typography>
          </div>
          <Stack marginLeft={1}>
            <Typography
              textAlign={"start"}
              variant="h6"
              fontFamily={"Visby"}
              style={{
                fontSize: "1em",
                color: "#0096FF",
              }}
            >
              {name}
            </Typography>
            <Typography textAlign={"start"} fontSize={"12px"} color={"grey"}>
              {desc}
            </Typography>
            {/* <Stack direction={"row"} spacing={1}>
            <Typography>{price}</Typography>
            <Typography>{unit}</Typography>
          </Stack> */}
          </Stack>
        </Stack>
        <ListItemIcon>
          <ChevronRightIcon />
        </ListItemIcon>
      </ListItem>
      <Divider />
    </>
  )
}
