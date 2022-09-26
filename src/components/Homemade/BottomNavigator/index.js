import React, { useState, useContext, useEffect } from "react"
import { Link, BrowserRouter } from "react-router-dom"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"

import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import FavoriteIcon from "@material-ui/icons/Favorite"
import SearchIcon from "@material-ui/icons/Search"
import PersonIcon from "@material-ui/icons/Person"
import HomeIcon from "@material-ui/icons/Home"
import NotificationsIcon from "@material-ui/icons/Notifications"

import "../../../assets/css/layout.css"

import { NumberOfUnreadNotifications } from "../NotificationPage/state/NotificationPageState"
import { Badge } from "@mui/material"
import { navigate } from "gatsby"

const Bottom = ({}) => {
  const [scrollingDown, setScrollingDown] = useState("")

  const [numberOfUnread, setNumberOfUnread] = useContext(
    NumberOfUnreadNotifications
  )

  const pathname = window.location.pathname // in case user visits the path directly. The BottomNavBar is able to follow suit.
  const [value, setValue] = React.useState(pathname)

  //don't show the bottom navigation on mappage  https://v5.reactrouter.com/web/api/Hooks/uselocation
  useEffect(() => {
    if (value === "/MapPage") {
      setScrollingDown("scrollingDown")
    } else {
      setScrollingDown("")
    }
  }, [])

  const onChange = (event, newValue) => {
    setValue(newValue)

    navigate(newValue)

    if (newValue === "/MapPage") {
      setScrollingDown("scrollingDown")
    } else {
      setScrollingDown("")
    }
  }

  // useScrollPosition(({ prevPos, currPos }) => {
  //   let scrollingDown = prevPos.y > currPos.y
  //   if (scrollingDown) {
  //       setScrollingDown("scrollingDown")
  //   }
  //   else setScrollingDown("scrollingUp")
  // }, [])

  return (
    <BrowserRouter>
      <BottomNavigation
        value={value}
        onChange={onChange}
        showLabels
        className={`root ${scrollingDown}`}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon style={{ fontSize: "20px" }} />}
          value="/"
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon style={{ fontSize: "20px" }} />}
          value="/search"
          component={Link}
          to="/search"
        />
        <BottomNavigationAction
          label="Alerts"
          icon={
            <Badge
              badgeContent={numberOfUnread}
              invisible={numberOfUnread > 0 ? false : true}
              color="error"
            >
              <NotificationsIcon style={{ fontSize: "20px" }} />
            </Badge>
          }
          value="/alerts"
          component={Link}
          to="/alerts"
        />
        <BottomNavigationAction
          label="Account"
          icon={<PersonIcon style={{ fontSize: "20px" }} />}
          value="/account"
          component={Link}
          to="/account"
        />
      </BottomNavigation>
    </BrowserRouter>
  )
}

export default Bottom
