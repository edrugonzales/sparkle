import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import {
  Button,
  Dialog,
  ListItem,
  List,
  ListSubheader,
  Alert,
  AlertTitle,
} from "@material-ui/core"
import {
  TextField,
  RadioGroup,
  Radio,
  styles,
  FormControlLabel,
} from "@material-ui/core"

import paymongo from "../../../../services/paymongo/paymongo"

const buttonStyle = makeStyles((theme) => ({
  regularButton: {
    fontFamily: "visby",
    fontWeight: "bold",
    width: "100%",
    margin: "5px",
    background: "#ffcf10",
    border: 0,
    borderRadius: 10,
    color: "gray",
    height: 60,
    padding: "0 30px",
  },
  outlinedButton: {
    fontFamily: "visby",
    fontWeight: "bold",
    width: "100%",
    margin: "5px",
    border: "2px solid gray",
    color: "gray",
    borderRadius: 10,
    height: 60,
    padding: "0 30px",
  },
  header: {
    fontFamily: "visby",
    fontWeight: "bold",
    paddingBottom: "0.4em",
    marginLeft: "0.4em",
  },
}))

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
      // checkedIcon={<BpCheckedIcon />}
      // icon={<BpIcon />}
      {...props}
    />
  )
}

const PaymentMethodDialog = ({
  currentPMethod,
  showDialog,
  onConfirm,
  onCancel,
}) => {
  const buttonClass = buttonStyle()

  const [ThePaymentMethod, setThePaymentMethod] = useState(currentPMethod)
  const [isLoading, setLoading] = useState(false)

  const [name, setName] = useState("Ricardo Joson")
  const [email, setEmail] = useState("ricardo@email.com")
  const [cardCvc, setCardCvc] = useState("111")
  const [cardNumber, setCardNumber] = useState("5240050000001440")
  const [cardExpiry, setCardExpiry] = useState("1/23")
  const [phone, setPhone] = useState("09171580396")
  const [addLine1, setAddressLine1] = useState("address line1")
  const [addLine2, setAddressLine2] = useState("address line2")
  const [addCity, setAddressCity] = useState("address city")
  const [addState, setAddressState] = useState("address state")
  const [addPostalCode, setAddressPostalCode] = useState("8000")
  const [addCountry, setAddressCountry] = useState("PH")

  const handlePay = async ({
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
  }) => {
    setLoading(true)

    try {
      const payM = await paymongo.paymentMethods.create({
        data: {
          attributes: {
            details: {
              card_number: cardNumber,
              exp_month: parseInt(cardExpiry.split("/")[0]),
              exp_year: parseInt(cardExpiry.split("/")[1]),
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

      // const payI = await paymongo.paymentIntents.create({
      //   data: {
      //     attributes: {
      //         amount: 69000,
      //       payment_method_allowed: ['card'],
      //       payment_method_options: {card: {request_three_d_secure: 'any'}},
      //       currency: 'PHP',
      //       description: '2x Halo Halo',
      //       statement_descriptor: 'Sparkle Taste of Home',
      //       metadata:{
      //         id: "1231231Order",
      //         chomperName: "ChomperFirst ChomperLastNameOrder"
      //       }
      //     }
      //   }
      // });

      // await
      // await

      // const attachPayI  = await paymongo.paymentIntents.attach(payI.data.id,{
      //   data: {
      //     attributes: {
      //       payment_method: payM.data.id,
      //       client_key: payI.data.attributes.client_key
      //     }
      //   }
      // })

      // const payment = await paymongo.payments.create({
      //   data: {
      //     attributes: {
      //       amount: getCartTotal(cart),
      //       currency: "PHP",
      //       description:"description",
      //       statement_descriptor: "Sparkle Transaction",
      //       metadata:{
      //         id: "1231231Order",
      //         chomperName: "ChomperFirst ChomperLastNameOrder"
      //       },
      //       billing: {
      //         name: name,
      //         email: email,
      //         phone: "09171234566",
      //         metadata: {
      //           id: "1231231",
      //           chomperName: "ChomperFirst ChomperLastNameBilling"
      //         }
      //       },
      //       source: {
      //         id: token.data.id,
      //         type: "token"
      //       }
      //     }
      //   }
      // });

      //
      //

      // if (attachPayI) {
      //   setLoading(false);
      //   setCart([]);
      //   setPaymentReferenceId(_.get(attachPayI, "data.id", ""));
      //   setPaidAmount(_.get(attachPayI, "data.attributes.amount", ""));
      // }

      if (payM) {
        onConfirm({ type: ThePaymentMethod, meta: payM })
      }
    } catch (e) {
      setLoading(false)
      alert(e.detail.replace("details.", ""))
      // onCancel()
      // Toast.fail(<div>Payment Failed</div>, 1);
    }
  }

  return (
    <div>
      <Dialog open={showDialog} onClose={showDialog} fullWidth onBackdropClick={() => {
                onCancel()
              }}>
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
            <span>
              <NoteAddIcon />
            </span>
            <span className={buttonClass.header}>Payment Method</span>
          </div>
          <div>
            <RadioGroup
              defaultValue={ThePaymentMethod}
              aria-label="paymentMethod"
              name="customized-radios"
            >
              <FormControlLabel
                value="COD"
                control={<BpRadio />}
                label="COD"
                onChange={(e) => {
                  setThePaymentMethod("COD")
                }}
              />
              <FormControlLabel
                value="GCash"
                control={<BpRadio />}
                // disabled
                label="GCash"
                onChange={(e) => {
                  setThePaymentMethod("GCash")
                }}
              />
              <FormControlLabel
                value="Credit or debit card"
                control={<BpRadio />}
                disabled
                label="Credit or debit card"
                onChange={(e) => {
                  // disable if less than 100 value

                  setThePaymentMethod("Credit or debit card")
                }}
              />
            </RadioGroup>

            {ThePaymentMethod === "Credit or debit card" && (
              <div>
                {/* { 
                true && 
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  <strong>Processing payment,</strong> please wait.
                </Alert>
              }       */}
                <List>
                  <ListSubheader>{`Billing Details`}</ListSubheader>
                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="Name"
                      defaultValue={name}
                      placeholder={name}
                      onChange={(value) => setName(value.target.value)}
                    />
                  </ListItem>

                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="Email"
                      defaultValue={email}
                      placeholder={email}
                      onChange={(value) => setEmail(value.target.value)}
                    />
                  </ListItem>

                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="Phone"
                      defaultValue={phone}
                      placeholder={phone}
                      onChange={(value) => setPhone(value.target.value)}
                    />
                  </ListItem>

                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="Address Line 1"
                      defaultValue={addLine1}
                      placeholder={addLine1}
                      onChange={(value) => setAddressLine1(value.target.value)}
                    />
                  </ListItem>

                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="Address Line 2"
                      defaultValue={addLine2}
                      placeholder={addLine2}
                      onChange={(value) => setAddressLine2(value.target.value)}
                    />
                  </ListItem>

                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="Address City"
                      defaultValue={addCity}
                      placeholder={addCity}
                      onChange={(value) => setAddressCity(value.target.value)}
                    />
                  </ListItem>

                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="Address State"
                      defaultValue={addState}
                      placeholder={addState}
                      onChange={(value) => setAddressState(value.target.value)}
                    />
                  </ListItem>

                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="Address Postal Code"
                      defaultValue={addPostalCode}
                      placeholder={addPostalCode}
                      onChange={(value) =>
                        setAddressPostalCode(value.target.value)
                      }
                    />
                  </ListItem>

                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="Address Country"
                      defaultValue={addCountry}
                      placeholder={addCountry}
                      onChange={(value) =>
                        setAddressCountry(value.target.value)
                      }
                    />
                  </ListItem>
                  <ListSubheader>{`Credit Card`}</ListSubheader>

                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="Card Number"
                      defaultValue={cardNumber}
                      placeholder={cardNumber}
                      onChange={(value) => setCardNumber(value.target.value)}
                    />
                  </ListItem>

                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="Expiry"
                      defaultValue={cardExpiry}
                      placeholder={cardExpiry}
                      onChange={(value) => setCardExpiry(value.target.value)}
                    />
                  </ListItem>

                  <ListItem>
                    <TextField
                      required
                      id="outlined-required"
                      label="CVC"
                      defaultValue={cardCvc}
                      placeholder={cardCvc}
                      onChange={(value) => setCardCvc(value.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    {/* <Button
                  variant='contained'
                  color="success"
                  onClick={() => {
                    
                  }}
                >
                  Validate Credit or Debit Card
                </Button> */}
                  </ListItem>
                </List>
              </div>
            )}

            {/* insert form for billing */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <Button
              className={buttonClass.outlinedButton}
              onClick={() => {
                onCancel()
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              className={buttonClass.regularButton}
              onClick={() => {
                if (ThePaymentMethod === "Credit or debit card") {
                  handlePay({
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
                  })
                } else {
                  onConfirm({ type: ThePaymentMethod, meta: {} })
                }
              }}
              color="primary"
            >
              Done
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default PaymentMethodDialog
