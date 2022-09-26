import React, { useContext, useState, useEffect } from "react"
import SecureLS from "secure-ls"
import { HomeMadeCartContext, CurrentSelectedAddress } from "../../globalstates"
import LoginPage from "../../LoginPage"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Toolbar from "@material-ui/core/Toolbar"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import Grid from "@material-ui/core/Grid"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import MotorcycleIcon from "@material-ui/icons/Motorcycle"
import PaymentIcon from "@material-ui/icons/Payment"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import LocalActivityOutlinedIcon from "@material-ui/icons/LocalActivityOutlined"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import { createOrder, getDeliveryFee } from "../../../api/public/order"
import blue from "@material-ui/core/colors/lightBlue"
import { theme } from "../../../assets/mui"
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"
import { Backdrop, CircularProgress } from "@material-ui/core"
import CountUp from "react-countup"
import { ThemeProvider } from "@material-ui/styles"
import DateFnsUtils from "@date-io/date-fns"
import { isLoggedIn, getUser } from "../../../services/auth/"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers"
// import { getDistance } from '../../../api/public/google_api'
// import { getPlatformVariables } from '../../../api/public/platform_vars'
import AddressConfirmationDialog from "./components/AddressConfirmationDialog"
import InfoDialog from "../../Dialogs/InfoDialog"
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog"
import SpecialNotesDialog from "./components/SpecialNotesDialog"
import VoucherDialog from "./components/VoucherDialog"
import PaymentMethodDialog from "./components/PaymentMethodDialog"
import Drawer from "@material-ui/core/Drawer"

import { Link, navigate } from "gatsby"
import {
  getAllShopsV2,
  getDistanceAndDeliveryFee,
  getAutomaticVouchers,
} from "../../../api/public/shops"
import { getVoucher } from "../../../api/public/voucher"
import CheckoutItem from "./components/CheckoutItem"
import VoucherCheckoutItem from "./components/VoucherCheckoutItem"
import "./CheckoutPage.css"

import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/analytics"

import socket from "../../../services/socketio"
import { createOrderUpdateBroadcast } from "../../../api/public/broadcast"

import paymongo from "../../../services/paymongo/paymongo"
import currency from "currency.js"

import useWindowDimensions from "../../../custom-hooks/useWindowDimensions"

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';


import computeProductPrice from "../../../helpers/computeProductPrice"
import computeProductAddons from "../../../helpers/computeProductAddons"
const firestore = firebase.firestore()

const useStyles = makeStyles({
  backSize: {
    fontSize: "1.5em",
    color: "black",
  },
  listBackground: {
    backgroundColor: "#F2F7FD",
    borderRadius: "15px",
    marginLeft: "1em",
    marginRight: "1em",
  },
  bold: {
    fontWeight: "100",
    fontFamily: "visby",
  },
  visby: {
    fontFamily: "visby",
  },
  fontColor: {
    color: "black",
  },
  decoration: {
    textDecoration: "none",
    fontFamily: "visby",
    fontSize: "0.9em",
  },
  iconBackGround: {
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: "#FFCF10",
    borderRadius: "10px",
    height: "3em",
    fontFamily: "visby",
    fontWeight: "bold",
  },
  textField: {
    margin: "50px",
    height: "200px",
  },
  drawer: {
    elevation: 0,
    borderRadius: "10px",
  },
  backdrop: {
    zIndex: 100,
  },
  title: {
    fontFamily: "visby",
    fontWeight: "bold",
  },
  change: {
    marginLeft: "0.3em",
  },
  deliveryInfo: {
    fontFamily: "visby",
    margin: "0 15px",
  },
  deliveryDetails: {
    width: "90%",
    marginLeft: "1em",
  },
  discount: {
    color: "blue",
    fontWeight: "bold",
  },
  mb: {
    marginBottom: "1em",
  },
  grandTotal: {
    width: "90%",
    marginLeft: "0.9em",
    marginTop: "1em",
    marginBottom: "0.8em",
  },
  placeOrderButton: {
    width: "90%",
    marginLeft: "1em",
  },
})

const datePickerTheme = createTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: blue.A200,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: blue.A800,
      },
      daySelected: {
        backgroundColor: blue["800"],
      },
      dayDisabled: {
        color: blue["800"],
      },
      current: {
        color: blue["800"],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: blue["800"],
      },
    },
  },
})

const CheckoutPage = () => {
  let userLoggedIn = isLoggedIn()
  const { height, width } = useWindowDimensions()
  const classes = useStyles()

  // eslint-disable-next-line no-unused-vars
  const [currentSelectedAddress, setcurrentSelectedAddress] = useContext(
    CurrentSelectedAddress
  )

  const [dialogState, setDialogState] = useState({
    showDialog: false,
    dialogMessage: "",
    isError: false,
  })

  const [addressConfDialogState, setaddressConfDialogState] = useState({
    showDialog: false,
    message: "",
  })

  const [backDropState, setbackDropState] = useState(false)

  const [showConfirmationDialog, setshowConfirmationDialog] = useState(false)

  const [showSpecialNotesDialog, setshowSpecialNotesDialog] = useState(false)

  const [showVoucherDialog, setshowVoucherDialog] = useState(false)

  const [showPaymentMethodDialog, setshowPaymentMethodDialog] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [bagItems, updateBag] = useContext(HomeMadeCartContext)

  const [scheduleDrawerState, setscheduleDrawerState] = useState(false)

  const [schedulePickerValue, setSchedulePickerValue] = useState(new Date())

  const [when, setwhen] = useState(new Date(new Date().getTime() + 45 * 60000))

  const [voucher, setvoucher] = useState("")

  const [notes, setNotes] = useState("")
  const [paymentMethod, setpaymentMethod] = useState({ type: "COD", meta: {} })

  const [totalAmount, setTotalAmount] = useState(0.0)
  // eslint-disable-next-line no-unused-vars
  const [deliveryFee, setdeliveryFee] = useState(0.0)

  const [deliveryFeeDiscount, setDeliveryFeeDiscount] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [addonsTotal, setAddonsTotal]  = useState(0)

  const [voucherUsed, setVoucherUsed] = useState({})

  const handleDateChange = (date) => {
    setSchedulePickerValue(date)
  }



  async function calculateDeliveryFee() {
    setbackDropState(true)
    const ls = new SecureLS({ encodingType: "aes" })
    const userId = ls.get("userId")

    let discount = 0
    let deliveryFeeDiscount = 0


    /*
    const surgeRef = firestore.doc(`SURGE/ZZZAoCXyyekSyIc2zM0P`)
    const surgeSnap = await surgeRef.get()
    let surge = surgeSnap.data()
    */

    console.log('computing also the automatic vouchers')


    let deliveryFeeAndVouchers = await Promise.all([
      getDistanceAndDeliveryFee(
        bagItems[0].shop.location.coordinates[1],
        bagItems[0].shop.location.coordinates[0],
        currentSelectedAddress.lat,
        currentSelectedAddress.lng
      ),
      getAutomaticVouchers(),
    ])
    let calculatedDeliveryFee = deliveryFeeAndVouchers[0].deliveryFee
    let automaticVouchers = deliveryFeeAndVouchers[1]

    console.log(automaticVouchers)

    automaticVouchers.forEach((voucher) => {
      if (voucherValidForShop(voucher).status && orderOnMinimumPurchase(voucher).status) {
        console.log(voucher)
        //delivery fees first
        //deliveyr fee has percent
        let computedDfDiscount = voucher?.delivery_fee_discount ? calculateDiscount(calculatedDeliveryFee, voucher.delivery_fee_discount) : 0
        let computedAmountDiscount = voucher?.amount ? calculateDiscount(totalAmount, voucher.amount) : 0
        deliveryFeeDiscount += computedDfDiscount
        discount += computedAmountDiscount
      }
    })

    if (deliveryFeeDiscount > 0 || discount > 0) {
      setvoucher('Automatic voucher')
    }


    let dfdiscount = 0 
    let amountDiscount = 0

    if(deliveryFeeDiscount >= calculatedDeliveryFee){
      dfdiscount = calculatedDeliveryFee
      setDeliveryFeeDiscount(calculatedDeliveryFee)
    }else {
      dfdiscount = deliveryFeeDiscount
      setDeliveryFeeDiscount(deliveryFeeDiscount)
    }

    if(discount >= totalAmount){
      setDiscount(totalAmount)
      amountDiscount = totalAmount
    }else {
      setDiscount(discount)
      amountDiscount = discount
    }

    setVoucherUsed({
      deliveryFeeDiscount: dfdiscount, 
      additionalDiscount: amountDiscount
    })


    /*
    deliveryFeeDiscount >= calculatedDeliveryFee ? setDeliveryFeeDiscount(calculatedDeliveryFee) : setDeliveryFeeDiscount(deliveryFeeDiscount)
    discount >= totalAmount ? setDiscount(totalAmount) : setDiscount(discount)
    */
    setdeliveryFee(calculatedDeliveryFee)
    setbackDropState(false)
    //

    //
  }


  useEffect(() => {
    let mounted = true

    if (mounted) {
      if (totalAmount > 0)
        calculateDeliveryFee()
    }

    return () => {
      mounted = false
    }

  }, [totalAmount])

  function dateToIso(date) {
    let currentDate = date

    let output = `${currentDate.getFullYear()}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}T${(
      "0" + currentDate.getHours()
    ).slice(-2)}:${("0" + currentDate.getMinutes()).slice(-2)}:${(
      "0" + currentDate.getSeconds()
    ).slice(-2)}`

    return output
  }

  function total(productList) {
    console.log('getting total')
    let totality = 0
    let addonsTotality = 0
    for (let index = 0; index < productList.length; index++) {
      let discount = 0
      let product = productList[index]
      let productPrice = computeProductPrice(product)
      let addonsPrice = computeProductAddons(product?.addons)
      addonsTotality = addonsTotality + addonsPrice
      totality = totality + productPrice
    }

    setAddonsTotal(addonsTotality)
    return totality
  }

  useEffect(() => {

    let mounted = true
    if (mounted) {
      if (bagItems.length <= 0) {
        navigate(-1)
        return
      }

      setTotalAmount(total(bagItems))
    }


    return () => {
      mounted = false
    }
  }, [])

  function alertUser(message) {
    setvoucher()
    setDialogState({
      showDialog: true,
      dialogMessage: message,
    })
  }

  async function voucherValidation(voucherCode) {
    let voucherInformation = await getVoucher(voucherCode)
    let isVoucherExisting = voucherExist(voucherInformation)
    if (!isVoucherExisting.status) {
      return alertUser(isVoucherExisting.message)
    }

    let voucher = voucherInformation[0]
    let isVoucherAvailable = voucherAvailable(voucher)
    let isVoucherValidInThisShop = voucherValidForShop(voucher)

    let isVoucherFromSparkle = voucherFromSparkle(voucher)
    let isVoucherValidInPeriod = voucherValidInPeriod(voucher)
    let isVoucherOnDateOfMonth = onDateOfMonth(voucher)
    let isVoucherValidInThisArea = voucherValidInThisArea(voucher)
    let isVoucherOnTimeUse = voucherOneTimeUse(voucher)
    let orderIsOnMinimumPurchase = orderOnMinimumPurchase(voucher)



    if (!isVoucherAvailable.status) {
      return alertUser(isVoucherAvailable.message)
    }


    if (!isVoucherValidInThisShop.status) {
      return alertUser(isVoucherValidInThisShop.message)
    }

    if (!isVoucherFromSparkle.status) {
      return alertUser(isVoucherFromSparkle.message)
    }

    if (!isVoucherValidInPeriod.status) {
      return alertUser(isVoucherValidInPeriod.message)
    }

    if (!isVoucherOnDateOfMonth.status) {
      return alertUser(isVoucherOnDateOfMonth.message)
    }

    if (!isVoucherValidInThisArea.status) {
      return alertUser(isVoucherValidInThisArea.message)
    }

    if (!isVoucherOnTimeUse.status) {
      return alertUser(isVoucherOnTimeUse.message)
    }

    if (!orderIsOnMinimumPurchase.status) {
      return alertUser(orderIsOnMinimumPurchase.message)
    }


    console.log('computing')
    let deliveryFeeDiscount = voucher?.delivery_fee_discount ? calculateDiscount(deliveryFee, voucher.delivery_fee_discount) : 0
    let amountDiscount = voucher?.amount ? calculateDiscount(totalAmount, voucher.amount) : 0

    console.log(deliveryFeeDiscount)
    console.log(amountDiscount)

    handleDiscounts(deliveryFeeDiscount, amountDiscount)
  }

  function handleDiscounts(additionalDeliveryFee, additionalDiscount) {

    setVoucherUsed({
      deliveryFeeDiscount: additionalDeliveryFee,
      additionalDiscount: additionalDiscount
    })


    console.log('handling discount here')

    if (additionalDeliveryFee > 0) {
      let sum = deliveryFeeDiscount + additionalDeliveryFee
      console.log('the additional delivery fee computation', sum)
      if (sum >= deliveryFee)
        setDeliveryFeeDiscount(deliveryFee)
      else
        setDeliveryFeeDiscount(sum)
    }

    if (additionalDiscount > 0) {
      let sum = discount + additionalDiscount
      if (sum >= totalAmount)
        setDiscount(totalAmount)
      else
        setDiscount(sum)
    }

  }


  function calculateDiscount(previousPrice, discount) {
    if (discount === 'free')
      return previousPrice
    if (discount.trim().includes('%')) {
      return previousPrice * (Number(discount.trim().replaceAll("%", ''))/100)
    } else {
      return Number(discount)
    }
  }

  function orderOnMinimumPurchase(voucher) {
    if (voucher?.minimum_purchase) {
      if (totalAmount >= voucher?.minimum_purchase) {
        return {
          status: true,
          message: 'ok'
        }
      } else {
        return {
          status: false,
          message: `Must be equal or greater than ${voucher.minimum_purchase}`
        }
      }
    }

    return {
      status: true,
      message: 'ok'
    }
  }

  function voucherOneTimeUse(voucher) {
    if (voucher?.one_time_use) {
      //check if includes the user id

      if (voucher.users_availed.includes(getUser().userId)) {
        return {
          status: false,
          message: 'Voucher not available, you already availed this!'
        }
      }
      return {
        status: true,
        message: 'ok'
      }
    }


    return {
      status: true,
      message: 'ok'
    }
  }

  function voucherValidInThisArea(voucher) {

    let exist = false

    console.log('voucher valid in this area')

    if (!voucher?.areas)
      return {
        status: true,
        message: 'ok'
      }

    voucher.areas
      .toLowerCase()
      .replace(" ", "")
      .split(",")
      .forEach((area) => {
        // find in the current address

        if (
          currentSelectedAddress.address
            .toLowerCase()
            .includes(area.toString())
        )
          exist = true
      })

    if (!exist) {
      return {
        status: false,
        message: 'Voucher not available in your area'
      }
    }

    return {
      status: true,
      message: 'ok'
    }
  }

  function voucherExist(voucherInformation) {
    if (voucherInformation.length > 0) {
      return {
        status: true,
        message: 'ok'
      }
    } else {
      return {
        status: false,
        message: 'Sorry, voucher not found!'
      }
    }

    return {
      status: true,
      message: 'ok'
    }
  }

  function onDateOfMonth(voucher) {
    //get every dates of month

    if (!voucher?.every_date_of_month)
      return {
        status: true,
        message: 'ok'
      }

    let dates = voucher?.every_date_of_month?.split(",")
    if (dates?.includes(new Date().getDate().toString())) {
    } else {
      return {
        status: false,
        message: 'Voucher not applicable today!'
      }
    }

    return {
      status: true,
      message: 'ok'
    }
  }

  function voucherValidInPeriod(voucher) {

    if (!(voucher?.valid_from && voucher?.valid_to))
      return {
        status: true,
        message: 'ok'
      }

    if (
      new Date().getTime() > new Date(voucher.valid_from) &&
      new Date().getTime() < new Date(voucher.valid_to).getTime()
    ) {
    } else {
      return {
        status: false,
        message: 'Voucher expired.'
      }
    }

    return {
      status: true,
      message: 'ok'
    }
  }


  function voucherFromSparkle(voucher) {
    if (voucher.product === 'sparkle') {
      return {
        status: true,
        message: 'ok'
      }
    }
    return {
      status: false,
      message: 'Voucher not available'
    }
  }

  function voucherAvailable(voucher) {
    if (voucher.available) {
      return {
        status: true,
        message: "ok"
      }
    }

    return {
      status: false,
      message: 'Voucher not available'
    }
  }



  function voucherValidForShop(voucher) {
    if (voucher?.shops.length > 0) {
      let shopFound = voucher.shops.find(shop => shop.value === bagItems[0].shop._id)
      if (shopFound) { }
      else {
        return {
          status: false,
          message: 'The voucher is not available for this shop'
        }
      }
    }

    return {
      status: true,
      message: 'ok'
    }
  }


  function cancelVoucher() {
    //if there are automatic vouchers cancel it first
    setDeliveryFeeDiscount(deliveryFeeDiscount - voucherUsed.deliveryFeeDiscount)
    setDiscount(discount - voucherUsed.additionalDiscount)
    setvoucher('')
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              navigate(-1)
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Typography className={classes.title}>
            <div>Checkout</div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="xs" disableGutters="true">  
      <Box pt={3}></Box>
      {/* Schedule Picker */}
      {!userLoggedIn ? (
        <LoginPage />
      ) : (
        <div>
          <CheckoutItem
            icon={<CalendarTodayIcon className={classes.fontColor} />}
            title={"When to Deliver"}
            subtitle={`${when.toLocaleDateString()} ${when.toLocaleTimeString()}`}
            onClick={(e) => {
              e.preventDefault()
              setscheduleDrawerState(!scheduleDrawerState)
            }}
          />
          <Box pt={1}></Box>
          {/* Map Picker */}
          <CheckoutItem
            icon={<LocationOnIcon className={classes.fontColor} />}
            title={"Deliver to"}
            subtitle={currentSelectedAddress.address}
            onClick={(e) => {
              navigate("/MapPage")
            }}
          />
          <Box pt={1}></Box>
          {/* Courier Picker */}
          <CheckoutItem
            icon={<MotorcycleIcon className={classes.fontColor} />}
            title={"Courier"}
            subtitle={"SPARK EXPRESS"}
            onClick={(e) => { }}
          />
          <Box pt={1}></Box>
          {/* Payment Type */}
          <CheckoutItem
            icon={<PaymentIcon className={classes.fontColor} />}
            title={"Payment method"}
            subtitle={paymentMethod.type}
            onClick={(e) => {
              e.preventDefault()
              setshowPaymentMethodDialog(true)
            }}
          />
          <Box pt={1}></Box>
          {/* Special Notes */}
          <CheckoutItem
            icon={<NoteAddIcon className={classes.fontColor} />}
            title={"Special Instruction"}
            subtitle={!notes ? "Add additional notes" : notes}
            onClick={(e) => {
              e.preventDefault()
              setshowSpecialNotesDialog(true)
            }}
          />
          <Box pt={1}></Box>
          {/* Set Voucher */}
          <VoucherCheckoutItem
            icon={<LocalActivityOutlinedIcon className={classes.fontColor} />}
            title={"Apply a voucher"}
            subtitle={!voucher ? "Please enter code" : voucher}
            onClick={(e) => {
              e.preventDefault()
              setshowVoucherDialog(true)
            }}
            onCancel={(e) => {
              e.preventDefault()
              cancelVoucher()
            }}
          />
          <div
            style={{
              backgroundColor: "white",
              margin: "10px",
              width: "98%",
              bottom: "10px",
              fontFamily: "visby",
            }}
          >
            <Grid container className={classes.deliveryDetails}>
              <Grid item xs>
                <Typography variant="body1" className={classes.deliveryInfo}>
                  Items
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.deliveryInfo}>
                  P {totalAmount - addonsTotal}
                </Typography>
              </Grid>
            </Grid>
            {addonsTotal > 0 ? (
              <Grid
                container
                className={`${classes.deliveryDetails} ${classes.mb}`}
              >
                <Grid item xs>
                  <Typography variant="body1" className={classes.deliveryInfo}>
                    Add-ons
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" className={classes.deliveryInfo}>
                    P {addonsTotal}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            {discount > 0 ? (
              <Grid
                container
                className={`${classes.deliveryDetails} ${classes.discount} ${classes.mb}`}
              >
                <Grid item xs>
                  <Typography variant="body1" className={classes.deliveryInfo}>
                    Discount
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" className={classes.deliveryInfo}>
                    - P {discount}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            <Grid container className={classes.deliveryDetails}>
              <Grid item xs>
                <Typography variant="body1" className={classes.deliveryInfo}>
                  Delivery fee
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.deliveryInfo}>
                  P <CountUp start={0} end={deliveryFee} duration={1} />
                </Typography>
              </Grid>
            </Grid>
            {deliveryFeeDiscount > 0 ? (
              <Grid
                container
                className={`${classes.deliveryDetails} ${classes.discount}`}
              >
                <Grid item xs>
                  <Typography variant="body1" className={classes.deliveryInfo}>
                    Delivery fee Discount
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" className={classes.deliveryInfo}>
                    - P{" "}
                    <CountUp start={0} end={deliveryFeeDiscount} duration={1} />
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}

            <Grid container className = {classes.deliveryDetails}>
              <Grid item xs>
                <Typography
                  variant="h5"
                  className={`${classes.deliveryInfo} ${classes.bold}`}
                >
                  Grand Total
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  className={`${classes.deliveryInfo} ${classes.bold}`}
                >
                  P{" "}
                  {Math.ceil(deliveryFee - deliveryFeeDiscount + (totalAmount - discount))}
                </Typography>
              </Grid>
            </Grid>
            <Box mx="auto" pt={1}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.button}
                onClick={() => {
                  setaddressConfDialogState((prevState) => ({
                    ...prevState,
                    showDialog: true,
                  }))
                }}
              >
                Place Order
              </Button>
            </Box>
          </div>
          <Drawer
            anchor="bottom"
            open={scheduleDrawerState}
            onClose={() => {
              setscheduleDrawerState(!scheduleDrawerState)
            }}
            className={classes.drawer}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  borderRadius: "10px",
                  margin: "10px",
                  width: "50px",
                  height: "5px",
                  background: "gray",
                }}
              />
            </div>

            <ThemeProvider theme={datePickerTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div
                  style={{
                    display: "inline-grid",
                    margin: "0 50px 100px 50px",
                  }}
                >
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Delivery Date"
                    format="MM/dd/yyyy"
                    value={schedulePickerValue}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Delivery Time"
                    value={schedulePickerValue}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                  <Divider />
                  <Button
                    fullWidth
                    variant="contained"
                    className={classes.button}
                    onClick={async () => {
                      setwhen(schedulePickerValue)
                      setscheduleDrawerState(!scheduleDrawerState)
                    }}
                  >
                    Update
                  </Button>
                </div>
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </Drawer>
          <InfoDialog
            showDialog={dialogState.showDialog}
            message={dialogState.dialogMessage}
            onConfirm={() => {
              setDialogState((prevState) => ({
                ...prevState,
                showDialog: false,
              }))
            }}
          />
          <ConfirmationDialog
            showDialog={showConfirmationDialog}
            message="Place order?"
            onConfirm={async () => {
              setshowConfirmationDialog(false)
              if (bagItems.length <= 0) {
                setDialogState((prevState) => ({
                  ...prevState,
                  showDialog: true,
                  dialogMessage:
                    "Your bag is empty for some reason, please add products to bag and try again",
                }))
                return
              }

              const ls = new SecureLS({ encodingType: "aes" })
              const userId = ls.get("userId")
              //const newDate = new Date().toISOString()

              if (paymentMethod.type.includes("Credit")) {
                // get payment Method
                let payM = paymentMethod.meta.data.id
                // add paymentIntent

                try {
                  const payI = await paymongo.paymentIntents.create({
                    data: {
                      attributes: {
                        amount: currency(
                          deliveryFee -
                          deliveryFeeDiscount +
                          (totalAmount - discount)
                        ).intValue, // add the 6% and other fees here
                        payment_method_allowed: ["card"],
                        payment_method_options: {
                          card: { request_three_d_secure: "any" },
                        },
                        currency: "PHP",
                        description: `Items ${bagItems[0].name}`,
                        statement_descriptor: `Sparkle Taste of Home: ${bagItems[0].shop.name}`,
                        metadata: {
                          id: "1231231Order", //will be transfered to the backend
                          chomperName: "ChomperFirst ChomperLastNameOrder",
                        },
                      },
                    },
                  })

                  const attachPayI = await paymongo.paymentIntents.attach(
                    payI.data.id,
                    {
                      data: {
                        attributes: {
                          payment_method: payM,
                          client_key: payI.data.attributes.client_key,
                        },
                      },
                    }
                  )

                  if (attachPayI) {
                    alert("Payment Success")

                    // TODO: redundant code - for clean up

                    let orderData = {
                      order: {
                        products: bagItems,
                        address: currentSelectedAddress.address,
                        deliveryFee: deliveryFee,
                        amount: totalAmount,
                        when: dateToIso(when),
                        paymentType: paymentMethod.type,
                        deliveryNotes: notes,
                        shop: bagItems[0].shop._id ?? "",
                        voucher: voucher,
                        lat: currentSelectedAddress.lat,
                        long: currentSelectedAddress.lng,
                        deliveryFeeDiscount: deliveryFeeDiscount,
                        amountDiscount: discount,
                        paymentMethod: paymentMethod.meta,
                      },
                    }

                    setbackDropState(false)

                    createOrder(userId, orderData).then((response) => {
                      if (response.status === 200) {
                        response.json().then((result) => {
                          setDialogState((prevState) => ({
                            ...prevState,
                            showDialog: true,
                            dialogMessage:
                              "Order created please wait for your order to get delivered",
                          }))
                          navigate("/ongoingOrderDetails", {
                            state: {
                              order: result,
                            },
                          })

                          createOrderUpdateBroadcast({
                            title: `Hi your order is created`,
                            body: "Please wait for the merchant to accept it, Thank you.",
                          }).then((response) => {
                            if (response.status === 200) {
                              response.json().then((broadcast) => {
                                socket.emit(
                                  "emit-selected-broadcasts",
                                  [userId],
                                  { ...broadcast, isRead: false }
                                )
                              })
                            }
                          })

                          socket.emit("create-order", JSON.stringify(result))

                          updateBag([])
                          setbackDropState(false)
                        })
                      } else if (response.status === 400) {
                        response.json().then((result) => {
                          setDialogState((prevState) => ({
                            ...prevState,
                            showDialog: true,
                            dialogMessage: `${result.error}`,
                          }))
                          setbackDropState(false)
                        })
                      } else {
                        response.json().then((result) => {
                          setDialogState((prevState) => ({
                            ...prevState,
                            showDialog: true,
                            dialogMessage: `${result.error}`,
                          }))
                          setbackDropState(false)
                        })
                      }
                    })
                  } else {
                    alert("Payment Failed")
                  }
                } catch (e) {
                  alert(e.detail.replace("details.", ""))
                }
              } else {
                let orderData = {
                  order: {
                    products: bagItems,
                    address: currentSelectedAddress.address,
                    deliveryFee: deliveryFee,
                    amount: totalAmount,
                    when: dateToIso(when),
                    paymentType: paymentMethod.type,
                    deliveryNotes: notes,
                    shop: bagItems[0].shop._id ?? "",
                    voucher: voucher,
                    lat: currentSelectedAddress.lat,
                    long: currentSelectedAddress.lng,
                    deliveryFeeDiscount: deliveryFeeDiscount,
                    amountDiscount: discount,
                    paymentMethod: paymentMethod.meta,
                  },
                }

                setbackDropState(false)

                createOrder(userId, orderData).then((response) => {
                  if (response.status === 200) {
                    response.json().then((result) => {
                      if(orderData.paymentType === "GCash") {
                        setDialogState((prevState) => ({
                          ...prevState,
                          showDialog: true,
                          dialogMessage:
                            "Order created, payment required to proceed.",
                        }))
                      } else {
                        setDialogState((prevState) => ({
                          ...prevState,
                          showDialog: true,
                          dialogMessage:
                            "Order created please wait for your order to get delivered",
                        }))
                      }
                      
                      navigate("/ongoingOrderDetails", {
                        state: {
                          order: result,
                        },
                      })

                      createOrderUpdateBroadcast({
                        title: `Hi your order is created`,
                        body: "Please wait for the merchant to accept it, Thank you.",
                      }).then((response) => {
                        if (response.status === 200) {
                          response.json().then((broadcast) => {
                            socket.emit("emit-selected-broadcasts", [userId], {
                              ...broadcast,
                              isRead: false,
                            })
                          })
                        }
                      })

                      socket.emit("create-order", JSON.stringify(result))

                      updateBag([])
                      setbackDropState(false)
                    })
                  } else if (response.status === 400) {
                    response.json().then((result) => {
                      setDialogState((prevState) => ({
                        ...prevState,
                        showDialog: true,
                        dialogMessage: `${result.error}`,
                      }))
                      setbackDropState(false)
                    })
                  } else {
                    response.json().then((result) => {
                      setDialogState((prevState) => ({
                        ...prevState,
                        showDialog: true,
                        dialogMessage: `${result.error}`,
                      }))
                      setbackDropState(false)
                    })
                  }
                })
              }
            }}
            onDecline={() => {
              setshowConfirmationDialog(false)
              setbackDropState(false)
            }}
          />
          <AddressConfirmationDialog
            showDialog={addressConfDialogState.showDialog}
            message={`${currentSelectedAddress.address}`}
            onConfirm={() => {
              setaddressConfDialogState((prevState) => ({
                ...prevState,
                showDialog: false,
              }))
              setshowConfirmationDialog(true)
            }}
            onDecline={() => {
              setaddressConfDialogState((prevState) => ({
                ...prevState,
                showDialog: false,
              }))
            }}
          />
          <SpecialNotesDialog
            showDialog={showSpecialNotesDialog}
            onConfirm={(notes) => {
              setNotes(notes)
              setshowSpecialNotesDialog(false)
            }}
            onCancel={() => {
              setshowSpecialNotesDialog(false)
            }}
          />
          <PaymentMethodDialog
            currentPMethod={paymentMethod.type}
            showDialog={showPaymentMethodDialog}
            onConfirm={(pMethod) => {
              setpaymentMethod(pMethod)
              setshowPaymentMethodDialog(false)
            }}
            onCancel={() => {
              setshowPaymentMethodDialog(false)
            }}
          />
          <VoucherDialog
            showDialog={showVoucherDialog}
            onConfirm={(voucher) => {
              setvoucher(voucher)
              voucherValidation(voucher)
              setshowVoucherDialog(false)
            }}
            onCancel={() => {
              setshowVoucherDialog(false)
            }}
          />
          <Backdrop
            className={classes.backdrop}
            open={backDropState}
          // onClick={() => {
          //   setbackDropState()
          // }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      )}
      </Container>
    </MuiThemeProvider>
  )
}

export default CheckoutPage