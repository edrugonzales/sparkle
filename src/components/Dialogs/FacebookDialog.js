import React from "react"
// import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
// import DialogActions from "@material-ui/core/DialogActions"
// import DialogContent from "@material-ui/core/DialogContent"
// import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Typography from "@mui/material/Typography"
import SparkleLogo from "../../assets/images/sparkle_logo_blue.png"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import IosShareIcon from "@mui/icons-material/IosShare"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"

const FacebookDialog = (permitted) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <>
      <Dialog open={permitted}>
        {/* <DialogTitle id="alert-dialog-title">
          We noticed that you open the link from Messenger!
        </DialogTitle> */}
        <Typography
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
        </Typography>
        <div style={{ textAlign: "center" }}>
          <img src={SparkleLogo} style={{ width: "207px", height: "60px" }} />
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
        <h3 style={{ marginBottom: "0", color: "#00C4CA" }}></h3>
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
          Find and tap in your phone this icon{" "}
          <span style={{ verticalAlign: "middle" }}>
            <MoreVertIcon
              style={{
                borderRadius: "50%",
                border: "1px solid black",
                color: "gray",
              }}
            />
          </span>
          <br />
          then "open with Google Chrome or built-in browser"
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
          Find and tap in your phone this icon{" "}
          <span style={{ verticalAlign: "middle", color: "gray" }}>
            <IosShareIcon />
          </span>
          <br />
          then "Open in Safari"
        </div>
      </Dialog>
    </>
  )
}

export default FacebookDialog
