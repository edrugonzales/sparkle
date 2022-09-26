import React, { useEffect, useState, useContext } from "react"
import { getAllShopsV2 } from "../../../../api/public/shops"
import SecureLS from "secure-ls"

import { CurrentSelectedAddress } from "../../../globalstates"
import { ShowBubbleContext } from "../../../globalstates"

const HomePageStates = Object.freeze({
  loading: 1,
  loaded: 2,
  error: 3,
})

//Home page state
export const HomePageCurrentState = React.createContext(HomePageStates.loading)

//Global state of shops on home page
export const HomemadeShopList = React.createContext([])

const HomePageState = ({ children }) => {
  const [pageState, setPageState] = useState(HomePageStates.loading)

  const [shops, setShops] = useState([])

  const [currentSelectedAddress, setcurrentSelectedAddress] = useContext(
    CurrentSelectedAddress
  )

  const [showBubbleState, setShowBubbleState] = useContext(ShowBubbleContext)

  useEffect(() => {
    if (currentSelectedAddress.refreshLists) {
      const ls = new SecureLS({ encodingType: "aes" })
      let userId = ls.get("userId")

      setPageState(HomePageStates.loading)
      getAllShopsV2(
        userId,
        currentSelectedAddress.lng,
        currentSelectedAddress.lat
      ).then((shops) => {
        setShops(shops)
        setPageState(HomePageStates.loaded)

        setcurrentSelectedAddress((prevState) => ({
          ...prevState,
          refreshLists: false,
        }))

        setShowBubbleState(true)
      })
    }
  }, [currentSelectedAddress])

  return (
    <HomePageCurrentState.Provider value={[pageState, setPageState]}>
      <HomemadeShopList.Provider value={[shops, setShops]}>
        {children}
      </HomemadeShopList.Provider>
    </HomePageCurrentState.Provider>
  )
}

export default HomePageState
