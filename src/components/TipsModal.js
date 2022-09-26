import React, { useState } from "react"
import UAParser from "ua-parser-js"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import InfoIcon from "@mui/icons-material/Info"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import MicIcon from "@mui/icons-material/Mic"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications"
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import CloseIcon from "@mui/icons-material/Close"

import AppInstallation from "./AppInstallation"

import Chrome from "../assets/images/chrome.png"
import SafariFirefox from "../assets/images/safari+firefox.png"
import DoubleCheck from "../assets/images/doublecheck.svg"


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "20px",
  overflowY: "scroll",
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const JavaScriptIsEnabled = true

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

// const isFacebookInAppBrowser = () =>
//   /FB_IAB/.test(navigator.userAgent) ||
//   /FBAN/.test(navigator.userAgent) ||
//   /FBAV/.test(navigator.userAgent)

let parser = new UAParser()
let browser = parser.getBrowser()
let device = parser.getDevice()
let os = parser.getOS()

const TipsModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div style={{ position: "aboslute", float: "right", padding: "4px" }}>
      <div class = 'need-help'>
        <InfoIcon
          onClick={handleOpen}
          style={{ marginLeft: "-5px", marginTop: "-5px" }}
        />
      </div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ textAlign: "center", padding: "1em" }}
          >
            Information &#x26; Tips
            <CloseIcon
              style={{ float: "right", padding: "0.1em" }}
              onClick={handleClose}
            />
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              aria-label="basic tabs example"
            >
              <Tab label="App Installation" {...a11yProps(0)} />
              <Tab label="System Check" {...a11yProps(1)} />
              <Tab label="Browser &#x26; Permissions" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div style={{ textAlign: "center" }}>
              <AppInstallation />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {JavaScriptIsEnabled ? (
              <h3 style={{ marginLeft: "1rem" }}>
                JavaScript is Enabled{" "}
                <span style={{ color: "green" }}>
                  <CheckCircleOutlineIcon />
                </span>
              </h3>
            ) : (
              <noscript>No Javascript Enabled</noscript>
            )}
            <div
              style={{
                marginLeft: "1rem",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Browser
            </div>
            <div style={{ paddingLeft: "1rem" }}>
              {browser.name} <span style={{ fontSize: "12px" }}>v</span>
              {browser.version}
            </div>
            <div
              style={{
                marginLeft: "1rem",
                fontSize: "20px",
                fontWeight: "bold",
                paddingTop: ".5em",
              }}
            >
              Device
            </div>
            <div style={{ paddingLeft: "1rem" }}>
              {device.vendor} {device.model} {device.type}
            </div>
            <div
              style={{
                marginLeft: "1rem",
                fontSize: "20px",
                fontWeight: "bold",
                paddingTop: ".5em",
              }}
            >
              Operating System
            </div>
            <div style={{ paddingLeft: "1rem" }}>
              {os.name} <span style={{ fontSize: "12px" }}>v</span>
              {os.version}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} style={{ marginLeft: "1em" }}>
            <h3>Browser Support</h3>
            <Card style={{ width: "90%" }}>
              <CardContent style={{ textAlign: "center" }}>
                <img
                  src={Chrome}
                  style={{ width: "46px", textAlign: "center" }}
                />
                <Typography variant="h5" component="div">
                  Chrome
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    color: "green",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "rgba(56,180,72,.05)",
                      borderRadius: "40px",
                    }}
                  >
                    <img src={DoubleCheck} /> Recommended
                  </span>
                </Typography>
              </CardContent>
            </Card>
            <div style={{ paddingBottom: "1rem" }}></div>
            <Card style={{ width: "90%" }}>
              <CardContent style={{ textAlign: "center" }}>
                <img
                  src={SafariFirefox}
                  style={{ width: "104px", textAlign: "center" }}
                />
                <Typography variant="h5" component="div">
                  Safari &#x26; Firefox
                </Typography>
                <Typography variant="body2" style={{ color: "blue" }}>
                  &#x2713; Supported
                </Typography>
              </CardContent>
            </Card>
            <h3>Permissions</h3>
            <p style={{ margin: "0" }}>
              Please ensure your browser's permission are set to the following:
            </p>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "white" }}>
                    <CameraAltIcon style={{ color: "black" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component={"div"} variant="subtitle1">
                      Camera
                    </Typography>
                  }
                />
                <Box style={{ color: "blue" }}>Allow</Box>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "white" }}>
                    <MicIcon style={{ color: "black" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component={"div"} variant="subtitle1">
                      Microphone
                    </Typography>
                  }
                />
                <Box style={{ color: "blue" }}>Allow</Box>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "white" }}>
                    <VolumeUpIcon style={{ color: "black" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component={"div"} variant="subtitle1">
                      Sound
                    </Typography>
                  }
                />
                <Box style={{ color: "blue" }}>Allow</Box>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "white" }}>
                    <CircleNotificationsIcon style={{ color: "black" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component={"div"} variant="subtitle1">
                      Notifications
                    </Typography>
                  }
                />
                <Box style={{ color: "blue" }}>Allow</Box>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "white" }}>
                    <ArrowCircleUpIcon style={{ color: "black" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component={"div"} variant="subtitle1">
                      Pop-Ups &#x26; Redirects
                    </Typography>
                  }
                />
                <Box style={{ color: "blue" }}>Allow</Box>
              </ListItem>
            </List>
          </TabPanel>
        </Box>
      </Modal>
    </div>
  )
}

export default TipsModal
