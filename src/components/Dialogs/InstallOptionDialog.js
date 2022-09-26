import React, { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"

import Sparkle from "../../assets/images/sparkle_logo_blue.png"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import IosShareIcon from "@mui/icons-material/IosShare"

const InstallOptionDialog = () => {
  const [open, setOpen] = useState(true)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <Typography
          id="spring-modal-description"
          sx={{ m: 2 }}
          style={{
            fontWeight: "bold",
            color: "#6A25C0",
            fontSize: "12px",
            textAlign: "left",
          }}
        >
          We noticed that you open the app from Messenger
        </Typography> */}
        <div style={{ textAlign: "center" }}>
          <img src={Sparkle} style={{ width: "207px", height: "60px" }} />
        </div>
        <Typography
          id="responsive-dialog-title"
          style={{
            textAlign: "center",
            fontSize: "20px",
            color: "#6A25C0",
            fontWeight: "bold",
            paddingTop: ".5rem",
          }}
        >
          {"Access the Sparkle app in"}
        </Typography>
        <div
          style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "bold",
            color: "#6A25C0",
          }}
        >
          2 easy steps!
        </div>
        <h3 style={{ marginBottom: "0", color: "#00C4CA" }}>What to do?</h3>
        <div
          style={{
            fontSize: "20px",
            fontStyle: "italic",
            color: "#6A25C0",
            fontWeight: "bold",
          }}
        >
          Android
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "#6A25C0",
          }}
        >
          Tap the pop-up "Add Sparkle to Home Screen" <br />
          or Find any icons in your phone{" "}
          <span style={{ verticalAlign: "middle" }}>
            <MoreVertIcon
              style={{
                borderRadius: "50%",
                border: "1px solid black",
                color: "gray",
                height: "16px",
                width: "16px",
              }}
            />
          </span>
          <br />
          then tap "Install app on your screen"
        </div>
        <div
          style={{
            fontSize: "20px",
            fontStyle: "italic",
            color: "#6A25C0",
            fontWeight: "bold",
            paddingTop: "1em",
          }}
        >
          iOS
        </div>
        <div style={{ fontSize: "14px", color: "#6A25C0" }}>
          Tap{" "}
          <span style={{ verticalAlign: "middle", color: "gray" }}>
            <IosShareIcon style={{ height: "16px", width: "16px" }} />
          </span>
          then "Add to Home Screen"
        </div>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InstallOptionDialog
