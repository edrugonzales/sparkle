import React, { useState, useEffect } from "react"
import { getAllShops } from "../api/public/shops"
import HomePageState from "./Homemade/HomePage/state/HomePageState"
import SearchPageState from "./Homemade/SearchPage/state/SearchPageState"
import NotificationPageState from "./Homemade/NotificationPage/state/NotificationPageState"
import { reverseGeocode } from "../api/public/google_api"
import { navigate } from "gatsby"
import CheckoutPageState from "./Homemade/CheckoutPage/state/CheckoutPageState"
import VortexContext from "./Vortex/context/VortexContext"

//Global state for user's currently selected address
export const CurrentSelectedAddress = React.createContext({})

//Global state for user's home made cart
export const HomeMadeCartContext = React.createContext([])

//Global state of homemade bottom navigation bar main index page
export const HomemadeBottomNavigationIndex = React.createContext(0)

//Global state of login
export const LoginState = React.createContext(false)

//Global state of bubble visibility
export const ShowBubbleContext = React.createContext(false)

const GlobalStates = ({ children }) => {
  let itemsBag = JSON.parse(localStorage.getItem("bagItems"))?.length > 0  ? JSON.parse(localStorage.getItem('bagItems')) : []
  //This is the code for retrieving the bagitems in local storage
  const [bagItems, updateBag] = useState(itemsBag)

  //This is the code for saving the bagitems in local storage
  useEffect(() => {
    if (bagItems?.length > 0) {
      localStorage.setItem("bagItems", JSON.stringify(bagItems))
    }else {
      console.log('setting ')
      localStorage.setItem("bagItems", JSON.stringify([]))
    }
  }, [bagItems])

  const [currentSelectedAddress, setcurrentSelectedAddress] = useState({
    address: "934-974, P. Paredes St, Sampaloc, Manila, 1008 Metro Manila",
    lng: 120.9868052,
    lat: 14.6038269,
    refreshLists: false,
  })

  const [isLoggin, setisLoggin] = useState(false)

  const [showBubbleState, setShowBubbleState] = useState(false)

  const [homeMadeBottomNavigationIndex, sethomeMadeBottomNavigationIndex] =
    useState(0)

  function getCurrentLocation() {
    //todo Check if the persmission to use the location is allowed
    //todo If user didn't accept autolocation

    //Get current location
    navigator.geolocation.getCurrentPosition(
      function (position) {
        //

        //start reverse geocoding
        reverseGeocode(
          position.coords.longitude,
          position.coords.latitude
        ).then((response) => {
          //

          //Set useState value
          setcurrentSelectedAddress((prevState) => ({
            ...prevState,
            address: response?.results[0]?.formatted_address,
            lng: position.coords.longitude,
            lat: position.coords.latitude,
            refreshLists: true,
          }))
        })
      },
      function (error) {
        //

        if (error.code === 1) {
          navigate("/MapPage")
        }
      }
    )
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <ShowBubbleContext.Provider value={[showBubbleState, setShowBubbleState]}>
      <CurrentSelectedAddress.Provider
        value={[currentSelectedAddress, setcurrentSelectedAddress]}
      >
        <LoginState.Provider value={[isLoggin, setisLoggin]}>
          <HomemadeBottomNavigationIndex.Provider
            value={[
              homeMadeBottomNavigationIndex,
              sethomeMadeBottomNavigationIndex,
            ]}
          >
            <HomeMadeCartContext.Provider value={[bagItems, updateBag]}>
              <VortexContext>
                <HomePageState>
                  <SearchPageState>
                    <NotificationPageState>{children}</NotificationPageState>
                  </SearchPageState>
                </HomePageState>
              </VortexContext>
            </HomeMadeCartContext.Provider>
          </HomemadeBottomNavigationIndex.Provider>
        </LoginState.Provider>
      </CurrentSelectedAddress.Provider>
    </ShowBubbleContext.Provider>
  )
}

export default GlobalStates
