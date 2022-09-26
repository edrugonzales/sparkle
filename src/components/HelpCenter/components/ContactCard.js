import React from "react"

import PhoneIcon from "@material-ui/icons/Phone"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import { IconButton, Snackbar } from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }))

const ContactCard = ({
  contactCardType,
  title = "CALL SUPPORT",
  subtitle = "88888888888",
  onCopy,
  onLaunch,
}) => {
  // const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  function ContactCardIcon(contactCardType) {
    switch (contactCardType) {
      case "phone":
        return (
          <a href={`tel:${subtitle}`}>
            <PhoneIcon style={{ fill: "grey" }} />
          </a>
        )
      case "email":
        return (
          <a
            href={`mailto:${subtitle}?subject=ISSUE REPORT | SPARKLE PWA&body=Please provide us a clear information about the issue, thank you for using Sparkle... `}
          >
            <MailOutlineIcon style={{ fill: "grey" }} />
          </a>
        )
      default:
        return (
          <a href={`tel:${subtitle}`}>
            <PhoneIcon style={{ fill: "grey" }} />
          </a>
        )
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>{ContactCardIcon(contactCardType)}</div>
        <div
          style={{
            margin: "10px",
          }}
        >
          <div
            style={{
              margin: "10px",
              fontFamily: "visby",
              fontWeight: "bold",
            }}
          >
            {title}
          </div>
          <div
            style={{
              margin: "10px",
              fontFamily: "visby",
              fontSize: "0.8em",
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
      <div
      // style={{
      //   display: 'flex',
      //   justifyContent: 'space-between',
      //   fontFamily: 'visby',
      // }}
      >
        <IconButton
          onClick={() => {
            onCopy()
            handleClick()
            navigator.clipboard.writeText(subtitle)
          }}
        >
          <FileCopyIcon style={{ fill: "grey" }} />
        </IconButton>
        <IconButton>{ContactCardIcon(contactCardType)}</IconButton>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ContactCard
