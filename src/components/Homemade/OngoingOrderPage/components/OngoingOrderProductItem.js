import React from "react"
import { Divider } from "@material-ui/core"
import computeProductPrice from "../../../../helpers/computeProductPrice"

const OngoingOrderProductItem = ({ product }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <div>{product.count}</div>
        <div>
            {product.name} <br/>
            {product?.size} <br/>
            {product?.addons?.map(addon => <>{addon.name}<br/></>)} 
        </div>
        <div>{computeProductPrice(product)}</div>
      </div>
      <Divider />
    </div>
  )
}

export default OngoingOrderProductItem
