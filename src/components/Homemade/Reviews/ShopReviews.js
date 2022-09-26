import React, { useState, useEffect } from "react"
import { getReviewsByShopId } from "../../../api/public/reviews"
import ReviewCard from "./components/ReviewCard"

const ShopReviews = ({ shopId }) => {
  const ShopReviewsStates = Object.freeze({
    loading: 1,
    loaded: 2,
    error: 3,
  })

  const [reviews, setreviews] = useState([])

  const [currentState, setcurrentState] = useState(ShopReviewsStates.loading)

  useEffect(() => {
    getReviewsByShopId(shopId).then((response) => {
      if (response.status === 200) {
        response.json().then((result) => {
          setreviews(result)
          setcurrentState(ShopReviewsStates.loaded)
        })
      }
    })
    // return () => {

    // }
  }, [])

  function State(state) {
    switch (state) {
      case ShopReviewsStates.loading:
        return (
          <div
            style={{
              margin: "10px",
              textAlign: "center",
              justifyContent: "center",
              fontFamily: "visby",
            }}
          >
            Loading...
          </div>
        )
      case ShopReviewsStates.loaded:
        return reviews.length > 0 ? (
          <div>
            <div>
              {reviews.map((review) => {
                return <ReviewCard review={review} />
              })}
            </div>
          </div>
        ) : (
          <div
            style={{
              margin: "10px",
              textAlign: "center",
              justifyContent: "center",
              fontFamily: "visby",
            }}
          >
            This shop has no reviews
          </div>
        )
      default:
        return <div>Something went wrong...</div>
    }
  }

  return <div>{State(currentState)}</div>
}

export default ShopReviews
