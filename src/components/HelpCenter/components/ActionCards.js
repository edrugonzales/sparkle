import React from "react"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { Divider } from "@material-ui/core"

const ActionCards = ({ title = "ACTION CARD", onClick }) => {
  return (
    <div
      onClick={() => {
        onClick()
      }}
    >
      <Divider />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          fontFamily: "visby",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ChatBubbleOutlineIcon style={{ fill: "gray" }} />
          <span style={{ margin: "10px", fontWeight: 'bold'}}>{title}</span>
        </div>
        <ArrowForwardIosIcon style={{ fill: "gray" }} />
      </div>
      <Divider />
    </div>
  )
}

export default ActionCards
