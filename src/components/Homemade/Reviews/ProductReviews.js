import React, { useState, useEffect } from "react"
import { getReviewsByProductId } from "../../../api/public/reviews"
import ReviewCard from "./components/ReviewCard"

const ProductReviews = (productId) => {
  const ProductReviewsStates = Object.freeze({
    loading: 1,
    loaded: 2,
    error: 3,
  })

  const [reviews, setreviews] = useState([])

  const [currentState, setcurrentState] = useState(ProductReviewsStates.loading)

  useEffect(() => {
    getReviewsByProductId(productId).then((response) => {
      if (response.status === 200) {
        response.json().then((result) => {
          setreviews(result)
          setcurrentState(ProductReviewsStates.loaded)
        })
      } else {
        setcurrentState(ProductReviewsStates.error)
      }
    })
    // return () => {

    // }
  }, [])

  function State(state) {
    switch (state) {
      case ProductReviewsStates.loading:
        return <div>Loading...</div>
      case ProductReviewsStates.loaded:
        return reviews.length > 0 ? (
          <div>
            {reviews.map((review) => {
              return <ReviewCard review={review} />
            })}
          </div>
        ) : (
          <div>This product has no reviews</div>
        )
      default:
        return <div>Something went wrong...</div>
    }
  }

  return <div>{State(currentState)}</div>
}

export default ProductReviews
