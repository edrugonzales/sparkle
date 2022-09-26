import React, { useState, useEffect, useContext } from "react"
import {
  AppBar,
  IconButton,
  MuiThemeProvider,
  Toolbar,
} from "@material-ui/core"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles"
import ShareIcon from "@material-ui/icons/Share"
// import Topbar from "./components/Topbar"
// import WelcomeBanner from "./components/WelcomeBanner"

import { theme } from "../assets/mui"
// import ActionCards from "./components/ActionCards"
// import ContactCard from "./components/ContactCard"
import { getUser } from "../services/auth"
import { navigate } from "gatsby-link"
import useWindowDimensions from "../custom-hooks/useWindowDimensions"
import { isMobile } from "react-device-detect"
import { LoginState } from "./globalstates"

import "../assets/css/layout.css"
import LoginPage from "./LoginPage"

const useStyles = makeStyles((theme) => ({
  share: {
    display: "block",
    position: "fixed",
    bottom: "10px",
    right: "1.2em",
    margin: "0",
    fontSize: "18",
  },
  flex: {
    display: "flex",
    marginLeft: "1em",
  },
}))

const AirSparkleGame = () => {
  const classes = useStyles()
  const { height, width } = useWindowDimensions()
  const [username, setusername] = useState("Loading...")

  const [isLoggin, setisLoggin] = useContext(LoginState)

  useEffect(() => {
    let user = getUser()
    setusername(user.name)
    //   return () => {
    //       cleanup
    //   }
  }, [isLoggin])

  const onShare = () => {
    let url = "https://app.sparkles.com.ph/air"
    if (navigator.share) {
      navigator
        .share({
          url: url,
        })
        .then(() => {})
        .catch((error) => {
          alert("Browser does not support this api.")
        })
    }

    return (
      <MuiThemeProvider theme={theme}>
        {/* <Topbar />
      <WelcomeBanner username={username} />
       */}

        <AppBar>
          <Toolbar>
            <IconButton
              onClick={() => {
                navigate("/")
              }}
            >
              <ChevronLeft />
            </IconButton>
            <ShareIcon className="ShareAir" onClick={onShare} />
          </Toolbar>
        </AppBar>
        <Toolbar />
        <iframe
          src={`https://air.sparkles.com.ph/?username=${username}`}
          height={height}
          width={width}
        ></iframe>
        {isMobile ? (
          <h3
            className={classes.share}
            style={{
              backgroundColor: "#FFD010",
              borderRadius: "90px",
              padding: ".1rem",
            }}
            onClick={() => {
              window.open("http://m.me/SparkleStarPh")
            }}
          >
            <div className={classes.flex}>
              <ShareIcon style={{ paddingRight: ".2rem" }} />
              <Box pl={1}>
                <div style={{ fontFamily: "visby", paddingRight: "1rem" }}>
                  Share it with us!
                </div>
              </Box>
            </div>
          </h3>
        ) : (
          <h3
            className={classes.share}
            style={{
              backgroundColor: "#FFD010",
              borderRadius: "90px",
              padding: ".1rem",
            }}
            onClick={() => {
              window.open("http://m.me/SparkleStarPh")
            }}
          >
            <div className={classes.flex}>
              <ShareIcon style={{ paddingRight: ".2rem" }} />
              <Box pl={1}>
                <div style={{ fontFamily: "visby", paddingRight: "1rem" }}>
                  Share it with us!
                </div>
              </Box>
            </div>
          </h3>
        )}
      </MuiThemeProvider>
    )
  }

  if (!isLoggin) {
    return <LoginPage />
  }

  return (
    <MuiThemeProvider theme={theme}>
      {/* <Topbar />
    <WelcomeBanner username={username} />
     */}

      <AppBar>
        <Toolbar>
          <IconButton
            onClick={() => {
              navigate("/")
            }}
          >
            <ChevronLeft />
          </IconButton>
          <ShareIcon className="ShareAir" onClick={onShare} />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <iframe
        src={`https://air.sparkles.com.ph/?username=${username}`}
        height={height}
        width={width}
        frameBorder={0}
      ></iframe>
      {isMobile ? (
        <h3
          className={classes.share}
          style={{
            backgroundColor: "#FFD010",
            borderRadius: "90px",
            padding: ".1rem",
          }}
          onClick={() => {
            window.open("http://m.me/SparkleStarPh")
          }}
        >
          <div className={classes.flex}>
            <ShareIcon style={{ paddingRight: ".2rem" }} />
            <Box pl={1}>
              <div style={{ fontFamily: "visby", paddingRight: "1rem" }}>
                Share it with us!
              </div>
            </Box>
          </div>
        </h3>
      ) : (
        <h3
          className={classes.share}
          style={{
            backgroundColor: "#FFD010",
            borderRadius: "90px",
            padding: ".1rem",
          }}
          onClick={() => {
            window.open("http://m.me/SparkleStarPh")
          }}
        >
          <div className={classes.flex}>
            <ShareIcon style={{ paddingRight: ".2rem" }} />
            <Box pl={1}>
              <div style={{ fontFamily: "visby", paddingRight: "1rem" }}>
                Share it with us!
              </div>
            </Box>
          </div>
        </h3>
      )}
    </MuiThemeProvider>
  )
}

export default AirSparkleGame
