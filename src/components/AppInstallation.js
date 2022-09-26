import React, { useState } from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Typography from "@mui/material/Typography"

import Iphone1 from "../assets/images/iphone1.png"
import Iphone2 from "../assets/images/iphone2.png"
import Android1 from "../assets/images/android1.jpg"
import Android2 from "../assets/images/android2.jpg"
import Android3 from "../assets/images/android3.jpg"

const AppInstallation = () => {
  const [value, setValue] = useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{ width: "100%" }}
          >
            <Tab label="Apple (Safari)" value="1" />
            <Tab label="Android (Chrome)" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div>&#8226; Click on the red circle</div>
          <img src={Iphone1} style={{ width: "100%" }} />
          <div>&#8226; Click on add to home screen</div>
          <img src={Iphone2} style={{ width: "100%" }} />
        </TabPanel>
        <TabPanel value="2">
          <div>
            <Typography component={"div"} variant="h6">
              Option 1
            </Typography>
            <div>&#8226; Click on the pop up add to home screen</div>
            <img src={Android3} style={{ width: "100%" }} />
          </div>
          <hr style={{ marginBottom: "0", marginTop: "1em" }} />
          <div style={{ paddingTop: "1rem" }}>
            <Typography component={"div"} variant="h6">
              Option 2
            </Typography>
            <div>&#8226; Click on the red circle</div>
            <img src={Android1} style={{ width: "100%" }} />
            <div>&#8226; Click on install app</div>
            <img src={Android2} style={{ width: "100%" }} />
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default AppInstallation
