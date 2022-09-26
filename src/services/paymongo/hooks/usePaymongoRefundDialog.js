import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import ListItemText from "@mui/material/ListItemText"
import ListItem from "@mui/material/ListItem"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import Slide from "@mui/material/Slide"
import { getAllPaymongoRefundResource } from "../../../api/public/paymongo"
import CenteredProgress from "../../../components/misc/centeredProgress"
import { Box, ListItemIcon } from "@mui/material"
import moment from "moment"
import { navigate } from "gatsby"
import NoDataFound from "../../../components/misc/NoDataFound"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function usePaymongoRefundDialog() {
  const [show, setShow] = useState(false)

  const showPaymongoRefundDialog = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  const PaymongoRefundDialog = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [renderData, setRenderData] = useState([])

    useEffect(async () => {
      setIsLoading(true)
      let getPaymongoRefundResponse = await getAllPaymongoRefundResource()

      if (getPaymongoRefundResponse.status === 200) {
        let result = await getPaymongoRefundResponse.json()
        setRenderData(result)
        setIsLoading(false)
      } else {
        //todo error handling
        setIsLoading(false)
      }

      setIsLoading(false)
    }, [])

    return (
      <Dialog
        fullScreen
        open={show}
        onClose={handleClose}
        TransitionComponent={Transition}
        onBackdropClick={handleClose}
      >
        <AppBar sx={{ position: "relative", background: "white" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon sx={{ color: "black" }} />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: "black" }} component="div">
              Refund Requests
            </Typography>
          </Toolbar>
        </AppBar>
        {isLoading && <CenteredProgress />}
        {renderData.length <= 0 && !isLoading && <NoDataFound />}
        <List>
          {renderData.map((refund) => (
            <ListItem
              button
              onClick={() => {
                navigate(`/paymongo/refund/details/${refund?.referenceNumber}`)
              }}
            >
              <ListItemText
                sx={{ flex: 1, mr: 2 }}
                primary={refund?.referenceNumber}
                secondary={moment(refund?.createdAt).format(
                  "MMMM DD YYYY | hh:mm:ss a"
                )}
              />
              <ListItemIcon>
                <OpenInNewIcon />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Dialog>
    )
  }

  return { showPaymongoRefundDialog, PaymongoRefundDialog }
}
