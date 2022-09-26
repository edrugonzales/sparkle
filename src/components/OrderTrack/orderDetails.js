import React, { useEffect, useState } from "react"

import firebase from "firebase/app"
import "firebase/database"

import { makeStyles } from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"
import CallIcon from "@material-ui/icons/Call"
import MessageIcon from "@material-ui/icons/Message"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    justifyContent: "center",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  details: {
    fontFamily: "visby",
    paddingLeft: "1em",
  },
  link: {
    textDecoration: "none",
  },
}))

const OrderDetails = ({ orderId }) => {
  let classes = useStyles()
  let [details, setDetails] = useState()
  let [status, setStatus] = useState("No updates yet.")
  let [address, setAddress] = useState({})

  useEffect(() => {
    let mounted = true

    if (mounted) {
      switch (status) {
        case "No updates yet.":
        case "Not processed":
        case "Rider on the way to pickup":
        case "Arrived on pickup":
        case "Picked up":
          setAddress(details?.pickup?.[0])
          break
        default:
          setAddress(details?.dropoff?.[0])
      }
    }

    return () => {
      mounted = false
    }
  }, [status, details])

  useEffect(() => {
    let ref = `order_status/${orderId}`
    let mounted = true

    async function orderDetails() {
      let details = await firebase.database().ref(ref).once("value")
      if (mounted) setDetails(details.val())
    }

    if (mounted) {
      orderDetails()

      let statusRef = firebase.database().ref(`${ref}/status`)

      statusRef.on("value", async (snapshot) => {
        if (snapshot.val() !== "Not processed") setStatus(snapshot.val())
      })
    }

    return () => {
      mounted = false
    }
  }, [])
  return (
    <>
      {details?.rider?.name ? (
        <>
          <div className={classes.details}>
            <h3>{status}</h3>
            <p>
              {address?.name} <br />
              {address?.address}
            </p>
          </div>
          <div className={classes.root}>
            <a className={classes.link} href={`tel:09551605354`}>
              <Fab variant="extended">
                <CallIcon />
                Call Rider
              </Fab>
            </a>
            <a className={classes.link} href={`sms:09551605354`}>
              <Fab variant="extended">
                <MessageIcon />
                Message Rider
              </Fab>
            </a>
          </div>
		</>
      ) : (
        <div
          style={{
            fontFamily: "visby",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3> No rider assigned yet </h3>
        </div>
      )}
    </>
  )
}

export default OrderDetails
