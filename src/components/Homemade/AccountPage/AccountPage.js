import React, { useContext, useState, useEffect } from "react"

import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
//import HistoryIcon from "@material-ui/icons/History"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import SecureLS from "secure-ls"
import CircularProgress from "@material-ui/core/CircularProgress"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee } from "@fortawesome/free-solid-svg-icons"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import { LoginState } from "../../globalstates"

import { Link, navigate } from "gatsby"
import { getUserById } from "../../../api/public/user"
import { getUser } from "../../../services/auth/"
import NotificationPage from "../NotificationPage/NotificationPage"
import LoginPage from "../../LoginPage"
import useLoggedUser from "../../../custom-hooks/useLoggedUser"
import Bottom from "../BottomNavigator"

const useStyles = makeStyles({
  root: {
    paddingTop: "15%",
  },
  listBackground: {
    backgroundColor: "#F2F7FD",
    marginLeft: "0.5em",
    marginRight: "0.5em",
    borderRadius: "0.5em",
    paddingTop: "0.1em",
    paddingBottom: "0.1em",
  },
  button: {
    backgroundColor: "rgb(250,250,250)",
    borderRadius: "10px",
    width: "90%",
    marginLeft: "1em",
    marginRight: "1em",
    fontFamily: "visby",
    fontWeight: "bold",
    color: "gray",
  },
  fontsize: {
    fontFamily: "visby",
    fontSize: 12,
    color: "black",
  },
  decoration: {
    margin: "10px",
    textDecoration: "none",
  },
  bold: {
    fontWeight: "bold",
    fontFamily: "visby",
    color: "black",
  },
  header: {
    fontFamily: "visby",
    fontWeight: "bold",
    color: "black",
  },
  heading: {
    paddingTop: "0.2em",
  },
  listAvatar: {
    backgroundColor: "#F2F7FD",
  },
  listIcon: {
    color: "black",
  },
  listSecondaryText: {
    color: "black",
    fontFamily: "visby",
    fontSize: "0.8em",
  },
  userButton: {
    position: "fixed",
    right: "1em",
  },
})

const AccountPage = () => {
  const classes = useStyles()

  const [isLoggin, setisLoggin] = useContext(LoginState)

  const [loaded, setLoaded] = useState(false)

  const { getUser } = useLoggedUser()

  //fix on reload always check effect of isLoggin

  const { name, photo } = getUser()


  return (
    <>
      {!isLoggin && <LoginPage />}
      {isLoggin && (
        <Box>
          <AppBar style={{ background: "#ffffff" }}>
            <Toolbar>
              <Box>
                <Typography variant="h6" className={classes.header}>
                  Account
                </Typography>
                <Typography variant="body2" className={classes.fontsize}>
                  Manage your orders and your profile
                </Typography>
              </Box>
              <IconButton>
                <Link to="/user" className={classes.userButton}>
                  <Avatar>
                    {photo ? (
                      <img
                        src={photo}
                        style={{
                          backgroundSize: "cover",
                          borderRadius: "50% 50% 50% 50%",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      name?.charAt(0)
                    )}
                  </Avatar>
                </Link>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Link to="/user/history" className={classes.decoration}>
            <List className={classes.listBackground}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.listAvatar}>
                    <FontAwesomeIcon
                      icon={faCoffee}
                      className={classes.listIcon}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className={classes.bold}>
                      Purchase history
                    </Typography>
                  }
                  secondary={
                    <div className={classes.listSecondaryText}>
                      Track your orders, reorder previous order
                    </div>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="right">
                    <ChevronRightIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Link>

          <Link to="/helpcenter" className={classes.decoration}>
            <List className={classes.listBackground}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.listAvatar}>
                    <HelpOutlineIcon className={classes.listIcon} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className={classes.bold}>
                      Help center
                    </Typography>
                  }
                  secondary={
                    <div className={classes.listSecondaryText}>
                      Get support, report app bugs and more
                    </div>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="right">
                    <ChevronRightIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Link>

          <Box pt={3}></Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={(e) => {
              const ls = new SecureLS({ encodingType: "aes" })
              ls.removeAll()
              navigate(window.location.href)
              // //window.location.reload()

              setisLoggin(false)
            }}
          >
            Log out
          </Button>
        </Box>
      )}
      <Bottom
      // value={homeMadeBottomNavigationIndex}
      // onChange={(event, newValue) => {
      //   sethomeMadeBottomNavigationIndex(newValue)
      // }}
      />
    </>
  )
}

export default AccountPage
