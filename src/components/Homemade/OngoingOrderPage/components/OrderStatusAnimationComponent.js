import React from "react"

import Noted from "../../../../assets/gif/noted.gif"
import Accepted from "../../../../assets/gif/accepted_check.gif"
import Preparing from "../../../../assets/gif/preparing.gif"
import Rider from "../../../../assets/gif/rider.gif"
import Completed from "../../../../assets/gif/delivery_completed.gif"
import GCash from "../../../../assets/gif/gcash_shop-online.gif"
import { LazyLoadImage } from "react-lazy-load-image-component"
import useWindowDimensions from "../../../../custom-hooks/useWindowDimensions"

const OrderStatusAnimationComponent = ({ status }) => {
  const { height, width } = useWindowDimensions()

  function StatusAnimation(status) {
    switch (status) {
      case "Waiting for Payment":
        return <LazyLoadImage src={GCash} alt={status} width={(width > 444) ? 444 : "100%"} />
      case "Not processed":
        return <LazyLoadImage src={Noted} alt={status} width={(width > 444) ? 444 : "100%"} />
      case "Accepted":
        return <LazyLoadImage src={Accepted} alt={status} width={(width > 444) ? 444 : "100%"} />
      case "Preparing":
        return <LazyLoadImage src={Preparing} alt={status} width={(width > 444) ? 444 : "100%"} />
      case "For-pickup":
        return <LazyLoadImage src={Preparing} alt={status} width={(width > 444) ? 444 : "100%"} />
      case "On the way":
        return <LazyLoadImage src={Rider} alt={status} width={(width > 444) ? 444 : "100%"} />
      case "Arrived on Merchant":
        return <LazyLoadImage src={Rider} alt={status} width={(width > 444) ? 444 : "100%"} />
      case "Picked up":
        return <LazyLoadImage src={Rider} alt={status} width={(width > 444) ? 444 : "100%"} />
      case "Order on the way":
        return <LazyLoadImage src={Rider} alt={status} width={(width > 444) ? 444 : "100%"} />
      case "Arrived":
        return <LazyLoadImage src={Rider} alt={status} width={(width > 444) ? 444 : "100%"} />
      case "Delivered":
        return <LazyLoadImage src={Completed} alt={status} width={(width > 444) ? 444 : "100%"} />
      case "Rejected":
        return ""
      case "Cancelled":
        return ""
      default:
        return <div></div>
    }
  }

  return (
    <div>
      <div>{StatusAnimation(status)}</div>
    </div>
  )
}

export default OrderStatusAnimationComponent
