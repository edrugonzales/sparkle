import React, { useState } from "react"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { Box } from "@material-ui/core"

import { MainContainer } from "@chatscope/chat-ui-kit-react"

import OngoingOrderPage from "./Homemade/OngoingOrderPage/OngoingOrderPage"
import Groupchat from "./Groupchat/Groupchat"

function a11yProps(index) {
  return {
    id: `bubble-tab-${index}`,
    "aria-controls": `bubble-tabpanel-${index}`,
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const Bubble_container = ({}) => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      {/* <Tabs
        value={value}
        onChange={handleChange}
        aria-label="bubble tabs example"
        variant="fullWidth"
        centered
        TabIndicatorProps={{ style: { background: "#ffcf10" } }}
      >
        <Tab label="Group Chats" {...a11yProps(0)} />
        <Tab label="Ongoing Orders" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div style={{ height: "250px" }}> */}
      <Groupchat />
      {/* </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div
          style={{
            position: "relative",
            height: "250px",
            textAlign: "center",
            marginTop: "3em",
          }}
        >
          <MainContainer>
            <OngoingOrderPage />
          </MainContainer>
        </div>
      </TabPanel> */}
    </>
  )
}

export default Bubble_container
