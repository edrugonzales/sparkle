import React, { useEffect, useState } from "react"
import { Router, Location } from "@reach/router"
import GlobalStates from "../components/globalstates"
import MasterIndexPage from "../components/MasterIndexPage"
import Homemade from "../components/Homemade/MainIndexPage"
import Shop from "../components/Homemade/ShopPage/ShopPage"
import Product from "../components/Homemade/ProductPage/ProductPage"
import Registration from "../components/RegistrationPage"
import ResetPassword from "../components/ResetPasswordPage"
import UserDetails from "../components/Homemade/AccountPage/UserDetailsPage"
import UserUpdate from "../components/Homemade/AccountPage/UpdateAccountPage"
import PurchaseHistory from "../components/Homemade/AccountPage/PurchaseHistoryPage"
import Account from "../components/Homemade/AccountPage/AccountPage"
import PurchaseHistoryItem from "../components/Homemade/AccountPage/PurchaseHistoryItem"
import Layout from "../components/layout"
import BagPage from "../components/Homemade/BagPage/BagPage"
import CheckoutPage from "../components/Homemade/CheckoutPage/CheckoutPage"
import MapPage from "../components/MapPicker/MapPage"
import AddressSearchPage from "../components/MapPicker/AddressSearchPage"
import RatingsPage from "../components/Homemade/RatingsPage/RatingsPage"
import NotificationPage from "../components/Homemade/NotificationPage/NotificationPage"

import { TransitionGroup, CSSTransition } from "react-transition-group"

import "../assets/scss/typography.scss"
import "../assets/css/layout.css"
import OngoingOrderDetails from "../components/Homemade/OngoingOrderPage/OngoingOrderDetails"
import SubmitRatingsPage from "../components/Homemade/RatingsPage/SubmitRatingsPage"

import SplashImage from "../assets/gif/sparkle_loading_version_2.gif"
import HelpCenter from "../components/HelpCenter/HelpCenter"
import TawkToPage from "../components/HelpCenter/components/TawkToPage"
import AirSparkleGame from "../components/air"
import SparkExpress from "../components/sparkexpress"
import SearchPage from "../components/Homemade/SearchPage/SearchPage"

import Track from "../components/OrderTrack"
import VortexTopUpPage from "../components/Vortex/pages/VortexTopUpPage"
import VortexBillsPaymentPage from "../components/Vortex/pages/VortexBillsPaymentPage"
import VortexVoucherPage from "../components/Vortex/pages/VortexVoucherPage"
import VortexTransactionHistory from "../components/Vortex/pages/VortexTransactionHistory"
import VortexTransactionHistoryDetails from "../components/Vortex/pages/VortexTransactionHistoryDetails"
import PaymongoRefundDetailsPage from "../services/paymongo/components/pages/PaymongoRefundDetailsPage"
import { ThemeProvider } from "@mui/material"
import { defaultTheme } from "../themes"


const SplashScreen = () => {
  return (
    <>
      <img
        style={{
          width: "100%",
          position: "fixed",
        }}
        src={SplashImage}
        alt="Sparkle Logo Animation"
      />
    </>
  )
}

const Application = ({ notificationServiceWorker }) => {

  return (
    <>
      {/*<PushNotifications file={notificationServiceWorker} />*/}
      <ThemeProvider theme={defaultTheme}>
        <GlobalStates>
          <Layout>
            <Location>
              {({ location }) => (
                <TransitionGroup className="transition-group">
                  <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                  >
                    <Router>
                      <MasterIndexPage path="/" />
                      <Homemade path="/food" />
                      <SearchPage path="/search" />
                      <NotificationPage path="/alerts" />
                      <Account path="/account" />
                      <Shop path="/shop" />
                      <Shop path="/shop/:shopId" />
                      <Product path="/product" />
                      <Registration path="/registration" />
                      <ResetPassword path="/reset" />
                      <UserDetails path="/user" />
                      <UserUpdate path="/user/update" />
                      <PurchaseHistory path="/user/history" />
                      <PurchaseHistoryItem path="user/history/:id" />
                      <MapPage path="/MapPage" />
                      <AddressSearchPage path="/AddressSearchPage" />
                      <BagPage path="/bagpage" />
                      <CheckoutPage path="/checkoutpage" />
                      <OngoingOrderDetails path="/ongoingOrderDetails" />
                      <RatingsPage path="/ratingspage" />
                      <SubmitRatingsPage path="/submitratingspage" />
                      <HelpCenter path="/helpcenter" />
                      <TawkToPage path="/chatsupportpage" />
                      <AirSparkleGame path="/air" />
                      <SparkExpress path="/express" />
                      <Track path="ongoingOrderDetails/track/:orderId" />
                      <VortexTopUpPage path="/vortextopup/:category" />
                      <VortexBillsPaymentPage path="/vortexbillspayment" />
                      <VortexVoucherPage path="/vortexvoucher" />
                      <VortexTransactionHistory path="/vortextransactions" />
                      <VortexTransactionHistoryDetails path="/vortextransactions/:type/:refId" />
                      <PaymongoRefundDetailsPage path="/paymongo/refund/details/:refId" />
                    </Router>
                  </CSSTransition>
                </TransitionGroup>
              )}
            </Location>
          </Layout>
        </GlobalStates>
      </ThemeProvider>
    </>
  )
}

const App = ({ data }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let mounted = true

    if (mounted)
      setTimeout(() => {
        setLoaded(true)
      }, 2000)

    return () => {
      mounted = false
    }
  }, [])

  return <>{loaded ? <Application/> : <SplashScreen />}</>
}

export default App


