import React, { useEffect, useContext, useState } from "react"

import HomeMade from "../assets/svg/logos/homemade.svg"
import Express from "../assets/svg/logos/spark-express.svg"
import FoodBasket from "../assets/svg/logos/food-basket.svg"
import Sparkle247 from "../assets/svg/logos/sparkle-24-7.svg"
import Fresh from "../assets/svg/logos/fresh.svg"
import Electronics from "../assets/svg/logos/electronics.svg"

import Bills from "../assets/svg/logos/bills.svg"
import Load from "../assets/svg/logos/load.svg"
import Voucher from "../assets/svg/logos/voucher.svg"

import SparkOnAir from "../components/SparkOnAir"

import Spark from "../assets/svg/Mascot_Stand_Black_Stroke.svg"
import sparkleAirBanner from "../assets/images/spark_on_air_landscape.png"
import HelpIcon from "@mui/icons-material/Help"
import TipsModal from "./TipsModal"

import PoweredByPldt from "../components/PoweredByPldt"

import Grid from "@material-ui/core/Grid"
import { Link, navigate } from "gatsby"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import { LazyLoadImage } from "react-lazy-load-image-component"

import "../assets/css/masterindexpage.css"
import "../assets/scss/IndexPage.scss"
import "../assets/css/layout.css"

import Promotions from "./Promotions/Promotions"
import InputBase from "@material-ui/core/InputBase"

import VortexBottomGradient from "./BottomGradient"

import NeedHelp from "./NeedHelp"

import { GlobalStateSearchResult } from "./Homemade/SearchPage/state/SearchPageState"

import UAParser from "ua-parser-js"

import "../assets/css/addToHome.css"
// import { searchProducts } from '../api/public/search'

import { LoginState } from "./globalstates"
import { isLoggedIn } from "../services/auth"
import "animate.css"
import { Button, Stack, Typography } from "@mui/material"
import VortexServices from "./Vortex/components/VortexServices"
import usePayMongo from "../services/paymongo/hooks/usePayMongo"
import FacebookDialog from "./Dialogs/FacebookDialog"
import InstallOptionDialog from "./Dialogs/InstallOptionDialog"
import InstalledDialog from "./Dialogs/InstalledDialog"
import { Box } from "@mui/system"
import { updateVortexByRefId } from "../api/public/vortex/transaction_db"
import Bottom from "./Homemade/BottomNavigator"
// import { sentryCatchException } from "../services/sentry/sentry"

// import TestAdd from "./Homemade/ShopPage/testAdd"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "0em",
    width: "100%",
  },
  control: {
    padding: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    background: "white",
  },
  font: {
    fontFamily: "visby",
    position: "absolute",
    fontWeight: "bold",
    paddingTop: "2.6rem",
    fontSize: "13px",
    paddingLeft: ".1rem",
  },
}))

let parser = new UAParser()
let browser = parser.getBrowser()

const MasterIndexPage = () => {
  const classes = useStyles()

  //   const [userAgent, setUserAgent] = useState('')
  //   const [isAndroid, setIsAndroid] = useState(false)
  //   const [isApple, setIsApple] = useState(false)
  //   const [isWindows, setIsWindows] = useState(false)

  const [searchResults, setsearchResults] = useContext(GlobalStateSearchResult)

  const [isLoggin, setisLoggin] = useContext(LoginState)

  const { showPaymentForm, PaymongoPaymentDialog } = usePayMongo()

  const [open, setOpen] = useState(false)

  const [messengerOpen, setMessengerOpen] = useState(false)

  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    let isLogin = isLoggedIn()

    setisLoggin(isLogin)
  }, [])

  let browserName = browser.name
  //

  //step 1 
  useEffect(() => {
    if (browserName.includes("Facebook")) {
      window.location.replace(`${window.location.href}/#fromMessenger`)
      setOpen(true)
    }
  }, [])

  let url = window.location.href


  //step 2
  useEffect(() => {
    if (url.includes("#fromMessenger")) {
      setMessengerOpen(true)
    }
  }, [])


  //step3
  function isInstalled() {
    // For iOS
    if (window.navigator.standalone) return true

    // For Android
    if (window.matchMedia("(display-mode: standalone)").matches) return true

    // If neither is true, it's not installed
    return false
  }

  useEffect(() => {
    setInstalled(isInstalled())
  }, [])

  return (
    <>
      {!open ? (
        <div className="page ">
          <Container component="main" maxWidth="xs" className="page">
            <TipsModal />
            {/* <NeedHelp /> */}
            {messengerOpen || !(installed) ? <InstallOptionDialog /> : ""}
            <div className="heading">
              <div className="heading-bg">
                <div className="heading-greetings">
                  <div>
                    <img
                      className="heading-logo" //animate__bounceIn
                      src={Spark}
                      alt="Spark Waving burstless"
                    />
                  </div>
                  <div>
                    <div className="heading-text animate__bounceIn">
                      <h1 className="heading-header">Sparkling Day, Juan!</h1>
                      What would you like to do for today?
                    </div>
                  </div>
                </div>
                <div className="heading-search-container">
                  <div className="heading-search-shape">
                    <InputBase
                      disabled={true}
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
                      onClick={() => {
                        navigate("/search")
                      }}
                    // onKeyPress={(e) => {
                    //   // alert(e.key)

                    //   if (e.key === 'Enter') {
                    //     navigate('/search')
                    //   }
                    // }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Services Tiles */}
            <div
              className="menu"
              style={{ overflowX: "hidden", overflowY: "hidden" }}
            >
              <Grid container spacing={4} className={classes.root}>
                <Grid item xs={4}>
                  <Link to="/food">
                    <img src={HomeMade} height="100px" alt="Home" />
                  </Link>
                  <div className="menu--text">Homemade</div>
                </Grid>
                <Grid item xs={4}>
                  <Link to="/express">
                    <img src={Express} height="100px" alt="Express" />
                  </Link>
                  <div className="menu--text">Express Delivery</div>
                </Grid>
                <Grid item xs={4} style={{ opacity: "0.5" }}>
                  <Link>
                    {/* to="/shop/food--621c368fc1cb7e0018936486" */}
                    <img src={FoodBasket} height="100px" alt="Express" />
                  </Link>
                  <div className="menu--text">Food Basket</div>
                </Grid>
              </Grid>
              <Grid container spacing={4} className={classes.root}>
                <Grid item xs={4} style={{ opacity: "0.5" }}>
                  <Link>
                    <img src={Sparkle247} height="100px" alt="Sparkle 24/7" />
                  </Link>
                  <div className="menu--text">Sparkle 24/7</div>
                </Grid>
                <Grid item xs={4} style={{ opacity: "0.5" }}>
                  <Link>
                    <img src={Fresh} height="100px" alt="Fresh" />
                  </Link>
                  <div className="menu--text">Fresh</div>
                </Grid>
                <Grid item xs={4} style={{ opacity: "0.5" }}>
                  <Link>
                    <img src={Electronics} height="100px" alt="Electronics" />
                  </Link>
                  <div className="menu--text">Electronics</div>
                </Grid>
              </Grid>
            </div>
            {/* Promotion banners */}
            <PoweredByPldt />
            {/* <Button
              onClick={async () => {
                let updateObj = {
                  paymongoRefundResourceID: "TEST",
                }

                return await updateVortexByRefId({
                  refId: "TEST",
                  data: updateObj,
                })
              }}
            >
              Throw Error
            </Button> */}

            <Grid container spacing={4} className={classes.root}>
              {/* style={{ opacity: "0.5" }} */}
              <Grid item xs={4} style={{ opacity: "0.5" }}>
                <Link >
                  <img src={Bills} height="100px" alt="Home" />
                </Link>
                <div className="menu--text">Bills</div>
              </Grid>
              <Grid item xs={4} style={{ opacity: "0.5" }}>
                {/* <Link > */}
                {/* to="/vortextopup/electronic_load" */}
                <Link role={"vortex-topup"} to="/vortextopup/electronic_load">
                  <img src={Load} height="100px" alt="Express" />
                </Link>
                <div className="menu--text">Load</div>
              </Grid>
              <Grid item xs={4} style={{ opacity: "0.5" }}>
                <Link >
                  <img src={Voucher} height="100px" alt="Express" />
                </Link>
                <div className="menu--text">Vouchers</div>
              </Grid>
            </Grid>
            <Stack m={3} direction={"row"} justifyContent={"center"}>
              <Button
                onClick={() => {
                  navigate("/vortextransactions")
                }}
              >
                View transactions
              </Button>
            </Stack>

            {/* <Button
          onClick={() => {
            showPaymentForm()
          }}
        >
          PAYMONGO TEST
        </Button> */}
            {/* <PaymongoPaymentDialog calculatedTotalAmountToPay={1000} /> */}

            <div
              style={{
                fontFamily: "montserrat",
                marginTop: "1em",
                marginBottom: "1em",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              Offers you may like
            </div>
            <div
              className="PromotionBanners"
              style={{ overflowX: "hidden", height: "300px" }}
            >
              <Promotions />
            </div>
            <SparkOnAir />
            <Bottom
            // value={homeMadeBottomNavigationIndex}
            // onChange={(event, newValue) => {
            //   sethomeMadeBottomNavigationIndex(newValue)
            // }}
            />
            <VortexBottomGradient />
            <Box sx={{ height: "10em" }} />
          </Container>
        </div>
      ) : (
        <FacebookDialog permitted={open} />
      )}
    </>
  )
}

export default MasterIndexPage
