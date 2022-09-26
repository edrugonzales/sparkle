import React, { useState } from "react"
import mascon_head_blink from "../../../assets/gif/mascon_head_blink.gif"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import {
  Backdrop,
  CircularProgress,
  Container,
  IconButton,
} from "@material-ui/core"
import { theme } from "../../../assets/mui"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import { TextField } from "@material-ui/core"
import { submitRating } from "../../../api/public/reviews"
import InfoDialog from "../../Dialogs/InfoDialog"
import { navigate } from "gatsby"
import { LazyLoadImage } from "react-lazy-load-image-component"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
  },
  backdrop: {
    zIndex: 100,
  },
}))

const SubmitRatingsPage = (props) => {
  const classes = useStyles()
  let product = props.location.state.product
  let isLike = props.location.state.isLike
  let order = props.location.state.order

  const [comments, setcomments] = useState("")

  const [dialog, setdialog] = useState({ showDialog: false, message: "" })

  const [backDropState, setbackDropState] = useState(false)

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              navigate(-1)
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Typography className={classes.title}>Submit Rating</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LazyLoadImage
            src={mascon_head_blink}
            alt={"mascon_head_blink"}
            effect={"blur"}
          />
        </div>
        <span>Tap submit to upload your rating</span>
        <TextField
          id="outlined-multiline-static"
          label="(Optional) Type your comments about the product here..."
          multiline
          rows={5}
          variant="outlined"
          fullWidth
          onChange={(e) => {
            setcomments(e.target.value)
          }}
        />
        <Button
          style={{
            margin: "10px 0 0 0",
          }}
          variant="contained"
          color="secondary"
          fullWidth={true}
          onClick={async () => {
            let ratingParams = {
              user: order.user._id,
              message: comments,
              isLike: isLike,
              shop: order.shop._id,
              product: product._id._id,
              order: order._id,
            }

            setbackDropState(true)

            submitRating(ratingParams).then((response) => {
              if (response.status === 200) {
                setdialog((prevState) => ({
                  ...prevState,
                  showDialog: true,
                  message: "Rating submitted",
                }))
              }
            })
          }}
        >
          Submit
        </Button>
      </div>
      <InfoDialog
        showDialog={dialog.showDialog}
        message={dialog.message}
        onConfirm={() => {
          setdialog((prevState) => ({
            ...prevState,
            showDialog: false,
          }))
          setbackDropState(false)
          navigate("/user/history")
        }}
      />
      <Backdrop
        className={classes.backdrop}
        open={backDropState}
        // onClick={() => {
        //   setbackDropState()
        // }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </MuiThemeProvider>
  )
}

export default SubmitRatingsPage
