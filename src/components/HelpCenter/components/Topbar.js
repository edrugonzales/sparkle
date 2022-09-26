import React from "react"
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { navigate } from "gatsby"

const Topbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          onClick={() => {
            navigate("/food")
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography style={{ fontFamily: "visby", fontWeight: "bold" }}>
          Help center
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
