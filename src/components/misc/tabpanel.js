import React from "react"
import { Typography } from "@material-ui/core"
import { Box } from "@mui/system"
import PropTypes from "prop-types"

export default function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      className="tabpanel"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}
