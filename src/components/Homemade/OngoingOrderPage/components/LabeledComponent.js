import React from "react"
import { Divider, Typography } from "@material-ui/core"

const LabeledComponent = ({ label, content }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <div>{label}</div>
        <div>{content}</div>
      </div>
      <Divider />
    </div>
  )
}

export default LabeledComponent
