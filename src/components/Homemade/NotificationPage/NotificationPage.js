import { AppBar, Tab, Tabs, Toolbar, Typography } from "@material-ui/core"
import React, { useState, useEffect, useContext } from "react"
import { Box } from "@mui/system"
import TabPanel from "../../misc/tabpanel"
import PageIndexNotification from "./components/PageIndexNotification"
import FavoritePage from "../FavoritePage/FavoritePage"
import OngoingOrderPage from "../OngoingOrderPage/OngoingOrderPage"
import PageIndexPromos from "./components/PageIndexPromos"
import PageIndexAlerts from "./components/PageIndexAlerts"

import { LoginState } from "../../globalstates"
import LoginPage from "../../LoginPage"
import Bottom from "../BottomNavigator"
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const NotificationPage = () => {
  const [value, setValue] = useState(0)
  const [isLoggin, setisLoggin] = useContext(LoginState)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box>
      {!isLoggin && <LoginPage />}
      {isLoggin && (
        <Box>
          <AppBar style={{ background: "#ffffff" }}>
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1, color: "black" }}>
                {"Notification & Alerts"}
              </Typography>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Notifications" {...a11yProps(0)} />
                <Tab label="Favorites" {...a11yProps(1)} />
                <Tab label="OnGoing Orders" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <PageIndexNotification />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FavoritePage />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <OngoingOrderPage />
            </TabPanel>
          </Box>
        </Box>
      )}
      <Bottom />
    </Box>
  )
}

export default NotificationPage
