import React from "react"
import { CircularProgress, Paper } from "@material-ui/core"
import { width } from "@material-ui/system"

const Loading = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <CircularProgress
          style={{
            margin: "10px",
            color: "#ffcf10",
          }}
        />
        <div>I guess this is called loading...</div>
      </Paper>
    </div>
  )
}

export default Loading
