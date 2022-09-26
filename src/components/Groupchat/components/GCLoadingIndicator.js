import React from "react"
import { CircularProgress } from "@material-ui/core"

const GCLoadingIndicator = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Visby",
        fontWeight: "bold",
      }}
    >
      <CircularProgress style={{ color: "#ffcf10", margin: "1em" }} />
      <span>Connecting to chat...</span>
    </div>
  )
}

export default GCLoadingIndicator
