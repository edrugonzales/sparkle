import React, { useState, useEffect, useContext } from "react"

import { CurrentSelectedAddress } from "../../globalstates"
import { HomemadeShopList, HomePageCurrentState } from "./state/HomePageState"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Container from "@material-ui/core/Container"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ShopsList from "./ShopsList"
import Loaders from "./component/StaggeredCardsPreloader"
import "./HomePage.css"

import { navigate } from "gatsby"
import useBag from "../BagPage/custom_hooks/useBag"
// import BagButton from "../../Buttons/BagButton"
import Bottom from "../BottomNavigator"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
  },
}))

const HomePage = () => {
  const HomePageStates = Object.freeze({
    loading: 1,
    loaded: 2,
    error: 3,
  })

  const classes = useStyles()

  // eslint-disable-next-line no-unused-vars
  const [currentSelectedAddress, setcurrentSelectedAddress] = useContext(
    CurrentSelectedAddress
  )

  const [shops, setShops] = useContext(HomemadeShopList)

  const [pageState, setPageState] = useContext(HomePageCurrentState)

  const { BagButton } = useBag()

  useEffect(async () => {
    ///There is a problem during autolocation where react still uses the previous long lat for getting the shoplist
    ///even though the new long lat is already assign on the useState
    ///this code serves as a refresh to use the currently assign values on useState
    setcurrentSelectedAddress((prevState) => ({
      ...prevState,
    }))
  }, [])

  function state(currentState) {
    switch (currentState) {
      case HomePageStates.loading:
        return <Loaders />
      case HomePageStates.loaded:
        return <ShopsList shops={shops} />

      default:
        return <div>Something went wrong...</div>
    }
  }

  return (
    <div>
      <AppBar color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              navigate("/")
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography className={classes.title}>
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
          </Typography>
          <BagButton />
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container maxWidth="xs" disableGutters="true">      
        <div>{state(pageState)}</div>
    
      <Bottom
      // value={homeMadeBottomNavigationIndex}
      // onChange={(event, newValue) => {
      //   sethomeMadeBottomNavigationIndex(newValue)
      // }}
      />
        </Container>
    </div>
  )
}

export default HomePage
