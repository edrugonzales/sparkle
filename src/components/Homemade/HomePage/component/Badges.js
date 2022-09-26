import React from "react"
import BadgeNew from "../../../../assets/gif/badge_new.gif"
import BadgeMostReview from "../../../../assets/gif/badge_most_review.gif"
import BadgeBestSeller from "../../../../assets/gif/badge_best_seller.gif"

const Badges = ({
  isNew = false,
  isMostReview = false,
  isBestSeller = false,
}) => {
  function BadgeSwitcher(status) {
    switch (status) {
      case "TEST":
        break

      default:
        break
    }
  }
  return (
    <div>
      <div>
        {isNew ? (
          <img src={BadgeNew} alt="BadgeNew" height={10} />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {isMostReview ? (
          <img src={BadgeMostReview} alt="BadgeMostReview" height={10} />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {isBestSeller ? (
          <img src={BadgeBestSeller} alt="BadgeBestSeller" height={10} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Badges
