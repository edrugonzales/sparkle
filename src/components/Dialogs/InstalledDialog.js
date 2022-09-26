import React, { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import Grid from "@material-ui/core/Grid"

import Sparkle from "../../assets/images/Mascot_Stand_Black_Stroke.png"
import SparkleLogo from "../../assets/images/sparkle_logo_blue.png"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import IosShareIcon from "@mui/icons-material/IosShare"

const InstalledDialog = () => {
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
          3 easy steps!
        </div>
        <h3 style={{ marginBottom: "0", color: "#00C4CA" }}>Step 3</h3>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <img
              src={Sparkle}
              style={{
                top: "200px",
                left: "-50.48558044433594px",
                width: "150px",
                height: "150px",
                transform: "matrix(0.97, 0.22, -0.22, 0.97, 0, 0)",
                position: "absolute",
              }}
            />
          </Grid>
          <Grid item xs>
            <div
              style={{
                color: "#6A25C0",
                fontSize: "26px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Explore the app, order, play, and enjoy!
            </div>
          </Grid>
        </Grid>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InstalledDialog
