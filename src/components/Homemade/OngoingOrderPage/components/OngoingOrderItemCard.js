import React from "react"
import { Divider, Paper } from "@material-ui/core"
import StatusChip from "../../../Chips/StatusChip"
import { navigate } from "gatsby"

const OngoingOrderItemCard = ({ order }) => {
  let when = new Date(order.when)
  return (
    <Paper
      onClick={() => {
        navigate("/ongoingOrderDetails", {
          state: {
            order: order,
          },
        })
      }}
    >
      <div
        style={{
          margin: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: "bold",
            }}
          >
            {order.shop.name}
          </div>
          <div>{`${when.toLocaleDateString()} ${when.toLocaleTimeString()}`}</div>
        </div>
        <StatusChip status={order.status} />
      </div>
      <Divider />
      <div
        style={{
          margin: "10px",
        }}
      >
        {order.products.map((product) => {
          return <div>{product.name}</div>
        })}
      </div>
    </Paper>
  )
}

export default OngoingOrderItemCard
