import React, { useState } from "react"
import {
  Box,
  Dialog,
  DialogContent,
  Slide,
  Stack,
  Typography,
} from "@mui/material"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

import Carousel from "nuka-carousel"
import "../../../../assets/css/shimmer.css"
import ImageComponentWithPlaceholder from "../components/ImageComponentWithPlaceholder"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function useNotificationViewer() {
  const [showNotifViewer, setShowNotifViewer] = useState(false)

  const [notificationData, setNotificationData] = useState(null)

  /**
   *
   * @notifData needed to view the notification details
   */
  const viewNotification = ({ notifData }) => {
    setShowNotifViewer(true)
    setNotificationData(notifData)
  }

  const handleClose = () => {
    setShowNotifViewer(false)
  }

  const NotificationViewer = () => {
    return (
      <Dialog
        open={showNotifViewer}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
      >
        {notificationData?.images?.length > 0 && (
          <Box>
            <Carousel
              autoplay={notificationData?.images?.length > 1}
              wrapAround={notificationData?.images?.length > 1}
              renderCenterLeftControls={false}
              renderCenterRightControls={false}
              width={"100%"}
              height={"200px"}
              defaultControlsConfig={{
                pagingDotsStyle: {
                  fill: "#ffcf10",
                },
              }}
            >
              {notificationData?.images?.map((image) => {
                return (
                  <div
                    className="ShimmerAnimation"
                    width={"100%"}
                    height="200px"
                  >
                    <LazyLoadImage
                      src={image.url}
                      alt="Images"
                      effect={"blur"}
                      width={"100%"}
                      height="200px"
                      style={{
                        objectFit: "fill",
                      }}

                      // placeholderSrc="https://via.placeholder.com/150"
                    />
                  </div>
                )
              })}
            </Carousel>
          </Box>
        )}
        <DialogContent>
          <Stack>
            <Typography>{notificationData?.title}</Typography>
            <Typography>{notificationData?.body}</Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    )
  }

  return { viewNotification, NotificationViewer }
}
