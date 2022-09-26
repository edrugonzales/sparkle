import {
  AppBar,
  IconButton,
  MuiThemeProvider,
  Toolbar,
} from "@material-ui/core"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import { navigate } from "gatsby"
import React, { useState } from "react"
import { tawktolink } from "../../../api/tawkto-config"
import { theme } from "../../../assets/mui"
import useWindowDimensions from "../../../custom-hooks/useWindowDimensions"
import LoadingChatIndicator from "./LoadingChatIndicator"

const TawkToPage = () => {
  const [isLoading, setisLoading] = useState(true)
  const { height, width } = useWindowDimensions()
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={() => {
              navigate("/helpcenter")
            }}
          >
            <ChevronLeft />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div>{isLoading ? <LoadingChatIndicator /> : null}</div>
      <iframe
        src={tawktolink}
        height={height - 200}
        width={width}
        frameBorder={0}
        onLoad={() => {
          setisLoading(false)
        }}
      ></iframe>
    </MuiThemeProvider>
  )
}

export default TawkToPage
