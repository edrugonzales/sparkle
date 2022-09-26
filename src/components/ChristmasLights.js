import React from "react"
import Light from "../assets/gif/Christmas-Lights.gif"
import Box from "@material-ui/core/Box"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  zIndex: "-1",
}

const ChristmasLights = () => {
  return (
    <Box sx={style}>
      <img src={Light} style={{ width: "100%", height: "5rem" }} />
    </Box>
  )
}

export default ChristmasLights
