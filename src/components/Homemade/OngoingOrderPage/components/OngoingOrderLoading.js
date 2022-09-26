import React from "react"
import { Paper } from "@material-ui/core"
import "../../../../assets/css/shimmer.css"

const OngoingOrderLoading = () => {
  let items = [1, 2, 3, 4, 5]
  return (
    <div
      style={{
        width: "90%",
      }}
    >
      {items.map((item) => {
        return (
          <div
            className="ShimmerAnimation"
            style={{
              width: "100%",
              height: "90px",
              margin: "10px",
            }}
          ></div>
        )
      })}
    </div>
  )
}

export default OngoingOrderLoading
