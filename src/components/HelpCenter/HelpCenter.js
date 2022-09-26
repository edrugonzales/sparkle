import React, { useState, useEffect } from "react"
import { MuiThemeProvider, Toolbar } from "@material-ui/core"
import Topbar from "./components/Topbar"
import WelcomeBanner from "./components/WelcomeBanner"

import { theme } from "../../assets/mui"
import ActionCards from "./components/ActionCards"
import ContactCard from "./components/ContactCard"
import { getUser } from "../../services/auth"
import { navigate } from "gatsby-link"

const HelpCenter = () => {
  const [username, setusername] = useState("Loading...")

  useEffect(() => {
    let user = getUser()
    setusername(user.name)
    //   return () => {
    //       cleanup
    //   }
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <Topbar />
      <Toolbar />
      <div>
        <WelcomeBanner username={username} />

        <ActionCards
          title={"CHANGE ORDER DETAILS"}
          onClick={() => {
            navigate("/chatsupportpage")
          }}
        />
        <ActionCards
          title={"DELAYED ORDER"}
          onClick={() => {
            navigate("/chatsupportpage")
          }}
        />
        <ActionCards
          title={"REPORT RIDER"}
          onClick={() => {
            navigate("/chatsupportpage")
          }}
        />
        <ActionCards
          title={"REPORT ORDER"}
          onClick={() => {
            navigate("/chatsupportpage")
          }}
        />

        <ContactCard
          contactCardType={"phone"}
          title={"CALL SUPPORT"}
          subtitle={"09564409300"}
          onCopy={() => {}}
        />
        <ContactCard
          contactCardType={"email"}
          title={"EMAIL SUPPORT"}
          subtitle={"sparkle.helpcenter@gmail.com"}
          onCopy={() => {}}
        />
      </div>
    </MuiThemeProvider>
  )
}

export default HelpCenter
