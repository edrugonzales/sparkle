import React, { useState, useEffect } from "react"
import {
  AppBar,
  Container,
  IconButton,
  MuiThemeProvider,
  Toolbar,
} from "@material-ui/core"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
// import Topbar from "./components/Topbar"
// import WelcomeBanner from "./components/WelcomeBanner"

import { theme } from "../assets/mui"
// import ActionCards from "./components/ActionCards"
// import ContactCard from "./components/ContactCard"
import { getUser } from "../services/auth"
import { navigate } from "gatsby-link"
import useWindowDimensions from "../custom-hooks/useWindowDimensions"
import Helmet from "react-helmet"

const SparkExpress = () => {
  const { height, width } = useWindowDimensions()
  const [user, setuser] = useState({})

  useEffect(() => {
    let user = getUser()

    setuser(user)
    //   return () => {
    //       cleanup
    //   }
  }, [])

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale =1.0,maximum-scale =1.0,user-scalable=no, shrink-to-fit=yes"/>
      </Helmet>

      <div>
      <AppBar color="#ffffff">
        <Toolbar>
          <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              navigate("/")
            }}
          >
            <ChevronLeft />
          </IconButton>
          {/* <Typography className={classes.title}>
            <div className="deliverTo">DELIVER TO</div>
            <div
              aria-hidden="true"
              className="addressText"
              onClick={() => {
                navigate("/MapPage")
              }}
              onKeyDown={() => {
                navigate("/MapPage")
              }}
            >
              {currentSelectedAddress.address.substring(0, 70)}
              {currentSelectedAddress.address.length >= 70 ? "..." : ""}
            </div>
          </Typography> */}
          {/* <BagButton /> */}
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container maxWidth="xs" disableGutters="true">      
        <iframe
            src={`https://express.sparkles.com.ph?id=${user.userId}&token=${user.token}`}
            height={height - 50}
            width={(width > 444 ? 444 : width)}
            frameBorder={0}
          ></iframe>
        </Container>
    </div>
{/* 
      <MuiThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <IconButton
              onClick={() => {
                navigate("/")
              }}
            >
              <ChevronLeft />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar />

        <Container maxWidth="xs" disableGutters="true">  
        <iframe
          src={`https://spark-express-parcel.pages.dev/express?id=${user.userId}&token=${user.token}`}
          // src={`https://usersparkle.netlify.app/express.html/?id=${user.userId}&token=${user.token}`}
          height={height - 50}
          width={width}
          frameBorder={0}
        ></iframe>
        </Container>
    </MuiThemeProvider> */}
    </>
  )
}

export default SparkExpress
