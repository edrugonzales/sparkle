import React from "react"
import { Avatar, Chip } from "@material-ui/core"

import NewReleasesIcon from "@material-ui/icons/NewReleases"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import LocalDiningIcon from "@material-ui/icons/LocalDining"
import MotorcycleIcon from "@material-ui/icons/Motorcycle"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn"
import CloseIcon from "@material-ui/icons/Close"
import ContactSupportIcon from "@material-ui/icons/ContactSupport"

const StatusChip = ({ status }) => {
  function InterpretStatus(status) {
    switch (status) {
      case "Not processed":
        return "New"
      case "Accepted":
        return "Accepted"
      case "Preparing":
        return "Preparing"
      case "For-pickup":
        return "Preparing"
      case "On the way":
        return "On Delivery"
      case "Arrived on Merchant":
        return "On Delivery"
      case "Picked up":
        return "On Delivery"
      case "Order on the way":
        return "On Delivery"
      case "Arrived":
        return "Arrived"
      case "Delivered":
        return "Delivered"
      case "Rejected":
        return "Not Accepted"
      case "Cancelled":
        return "Cancelled"
      default:
        return "hmm..?"
    }
  }

  function StatusIcon(status) {
    switch (status) {
      case "Not processed":
        return <NewReleasesIcon style={{ fill: "white" }} />
      case "Accepted":
        return <CheckCircleIcon style={{ fill: "white" }} />
      case "Preparing":
        return <LocalDiningIcon style={{ fill: "white" }} />
      case "For-pickup":
        return <LocalDiningIcon style={{ fill: "white" }} />
      case "On the way":
        return <MotorcycleIcon style={{ fill: "white" }} />
      case "Arrived on Merchant":
        return <MotorcycleIcon style={{ fill: "white" }} />
      case "Picked up":
        return <MotorcycleIcon style={{ fill: "white" }} />
      case "Order on the way":
        return <MotorcycleIcon style={{ fill: "white" }} />
      case "Arrived":
        return <LocationOnIcon style={{ fill: "white" }} />
      case "Delivered":
        return <AssignmentTurnedInIcon style={{ fill: "white" }} />
      case "Rejected":
        return <CloseIcon style={{ fill: "white" }} />
      case "Cancelled":
        return <CloseIcon style={{ fill: "white" }} />
      default:
        return <ContactSupportIcon style={{ fill: "white" }} />
    }
  }

  function StatusColor(status) {
    switch (status) {
      case "Not processed":
        return "#398E5B"
      case "Accepted":
        return "#F6C02F"
      case "Preparing":
        return "#EF6D01"
      case "For-pickup":
        return "#EF6D01"
      case "On the way":
        return "#F4A537"
      case "Arrived on Merchant":
        return "#F4A537"
      case "Picked up":
        return "#F4A537"
      case "Order on the way":
        return "#F4A537"
      case "Arrived":
        return "#2091CF"
      case "Delivered":
        return "#00E400"
      case "Rejected":
        return "#E2D4D3"
      case "Cancelled":
        return "#FF0000"
      default:
        return "grey"
    }
  }

  return (
    <Chip
      style={{
        backgroundColor: StatusColor(status),
        color: "white",
      }}
      avatar={
        <Avatar
          style={{
            backgroundColor: StatusColor(status),
          }}
        >
          {StatusIcon(status)}
        </Avatar>
      }
      label={InterpretStatus(status)}
    />
  )
}

export default StatusChip
