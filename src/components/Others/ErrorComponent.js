import { Paper } from "@material-ui/core"
import React from "react"

const ErrorComponent = () => {
  return (
    <Paper
      style={{
        width: "100%",
        margin: "10px",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <b>
        For some reason we can't load any information, please check internet, or
        contact us
      </b>
    </Paper>
  )
}

export default ErrorComponent
