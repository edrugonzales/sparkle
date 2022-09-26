import React, { useContext } from "react"

import { makeStyles } from "@material-ui/core/styles"

import HomePage from "./HomePage/HomePage"
import SearchPage from "./SearchPage/SearchPage"
import FavoritePage from "./FavoritePage/FavoritePage"
import Login from "../LoginPage"
import AccountPage from "./AccountPage/AccountPage"
import NotificationPage from "./NotificationPage/NotificationPage"
import { isLoggedIn } from "../../services/auth"
import { theme } from "../../assets/mui"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { HomemadeBottomNavigationIndex } from "../globalstates"
import { LoginState } from "../globalstates"
import Container from "@material-ui/core/Container"

import BottomNavigator from "./BottomNavigator"
import Bottom from "./BottomNavigator"

const Pages = ({ index }) => {
  const [isLoggin, setisLoggin] = useContext(LoginState)
  let userLoggedIn = isLoggin
  switch (index) {
    case 0:
      return <HomePage />
    case 1:
      return <SearchPage />
    case 2:
      return userLoggedIn ? <NotificationPage /> : <Login />
    case 3:
      return userLoggedIn ? <AccountPage /> : <Login />
    default:
      break
  }
}

const MainIndexPage = () => {
  const [value, setValue] = React.useState(0)

  const [homeMadeBottomNavigationIndex, sethomeMadeBottomNavigationIndex] =
    useContext(HomemadeBottomNavigationIndex)

  return (
    <div className="page">
      <MuiThemeProvider theme={theme}>
        <Container maxWidth="xs" disableGutters="true">
          <Pages index={homeMadeBottomNavigationIndex} className="sub-page" />
          {/* <BottomNavigator
            value={homeMadeBottomNavigationIndex}
            onChange={(event, newValue) => {
              sethomeMadeBottomNavigationIndex(newValue)
            }}
          /> */}
          <Bottom
          // value={homeMadeBottomNavigationIndex}
          // onChange={(event, newValue) => {
          //   sethomeMadeBottomNavigationIndex(newValue)
          // }}
          />
        </Container>
      </MuiThemeProvider>
    </div>
  )
}

export default MainIndexPage
