import React, { useState } from "react"

import { IconButton } from "@material-ui/core"
import TwoWheelerIcon from "@material-ui/icons/TwoWheeler"

import Tooltip from "@material-ui/core/Tooltip"

import firebase from "firebase/app"
import "firebase/database"

import { navigate } from "gatsby"
import { useEffect } from "react"

const TrackRiderButton = ({ order }) => {
  let [rider, setRider] = useState(false)
  let [tooltip, setTooltip] = useState(false)

  useEffect(() => {
    let mounted = true

    if (mounted) {
      checkForRider()
    }

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let mounted = true

    if (mounted && rider) {
      setTooltip(true)
      setTimeout(() => {
        setTooltip(false)
      }, 3000)
    }

    return () => {
      mounted = false
    }
  }, [rider])

  const checkForRider = () => {
    let ref = `order_status/${order}/rider_location`
    let riderLocationRef = firebase.database().ref(ref)

    riderLocationRef.once("value", async (snapshot) => {
      

      if (snapshot.val() === null) {
      } else {
        setRider(true)
      }
    })
  }

  return (
    <>
      {rider ? (
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          open={tooltip}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="There is available rider for you! You can track it here."
	  arrow
        >
          <IconButton
            style={{
              backgroundColor: "white",
              boxShadow: "0.2em 0.2em 5px -4px rgba(176, 168, 168, 0.89)",
            }}
            onClick={() => {
              navigate(`track/${order}`)
            }}
          >
            <TwoWheelerIcon style={{ fill: "black" }} />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </>
  )
}

export default TrackRiderButton
