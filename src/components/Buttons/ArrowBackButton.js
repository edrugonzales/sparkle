import { IconButton, Typography } from "@mui/material"
import React from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const ArrowBackButton = ({ onClick = () => [] }) => {
  return (
    <IconButton
      onClick={() => {
        onClick()
      }}
    >
      <ArrowBackIcon style={{ fontSize: 17 }} />
      <Typography marginLeft={1}>Back</Typography>
    </IconButton>
  )
}

export default ArrowBackButton
