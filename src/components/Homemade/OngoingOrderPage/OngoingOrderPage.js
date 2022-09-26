import React, { useState, useEffect } from "react"
import { getAllOrders } from "../../../api/public/order"
import { getUser } from "../../../services/auth"
import ErrorComponent from "../../Others/ErrorComponent"
import Loading from "../../Others/Loading"
import OngoingOrderLoading from "./components/OngoingOrderLoading"
import OngoingOrdersList from "./components/OngoingOrdersList"

const OngoingOrderPage = () => {
  const OngoingOrderPageStates = Object.freeze({
    loading: 1,
    loaded: 2,
    error: 3,
  })

  const [pagestate, setpagestate] = useState(OngoingOrderPageStates.loading)

  const [ongoingOrders, setOngoingOrders] = useState([])

  useEffect(() => {
    let user = getUser()

    if (user.userId === null) {
      return
    }

    getAllOrders().then((response) => {
      if (response.status === 200) {
        response.json().then((result) => {
          let filteredOrders = []

          for (let index = 0; index < result.length; index++) {
            if (result[index].status != "Rejected") {
              if (result[index].status != "Delivered") {
                if (result[index].status != "Cancelled") {
                  filteredOrders.push(result[index])
                }
              }
            }
          }

          setOngoingOrders(filteredOrders)
          setpagestate(OngoingOrderPageStates.loaded)
        })
      } else {
        setpagestate(OngoingOrderPageStates.error)
      }
    })
  }, [])

  function State(pagestate) {
    switch (pagestate) {
      case OngoingOrderPageStates.loading:
        return <OngoingOrderLoading />
      case OngoingOrderPageStates.loaded:
        return <OngoingOrdersList ongoingOrders={ongoingOrders} />
      case OngoingOrderPageStates.error:
        return <ErrorComponent />

      default:
        return <ErrorComponent />
    }
  }

  return <>{State(pagestate)}</>
}

export default OngoingOrderPage
