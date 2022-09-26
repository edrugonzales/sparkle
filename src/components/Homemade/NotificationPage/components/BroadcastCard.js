import React, { useEffect, useContext } from "react"

import { Card, Avatar, Divider, Typography, Badge } from "@material-ui/core"

import { LazyLoadImage } from "react-lazy-load-image-component"

import NotificationsIcon from "@material-ui/icons/Notifications"

import CampaignIcon from "@mui/icons-material/Campaign"

import CelebrationIcon from "@mui/icons-material/Celebration"

import TimeAgo from "javascript-time-ago"

import en from "javascript-time-ago/locale/en.json"

import "react-lazy-load-image-component/src/effects/blur.css"


import { NumberOfUnreadNotifications } from "../state/NotificationPageState"


export const BroadcastType = Object.freeze({

  Notification: 1,

  Advisory: 2,

  Promotion: 3,

})


const BroadcastCard = ({

  title = " Hey Mark, this one is picked for you",

  body = "Click to see the best deals today",

  images = [

    "https://com-sparkle.imgix.net/live/60ebffa6fcdda300175abde1.png?auto=compress&w=300",

  ],

  type = BroadcastType.Notification,

  isRead = false,

  createdAt = "2022-03-11T07:18:56.520Z",

  onClick = () => { },

}) => {



  const [numberOfUnread, setNumberOfUnread] = useContext(NumberOfUnreadNotifications)


  const timeAgo = new TimeAgo("en-US")


  useEffect(() => {

    console.log(`${images[0]}?auto=compress&w=300`)

  }, [])

  const cardIconHandler = (broadcastType) => {

    switch (broadcastType) {

      case BroadcastType.Notification:

        return <NotificationsIcon />

      case BroadcastType.Advisory:

        return <CampaignIcon />

      case BroadcastType.Promotion:

        return <CelebrationIcon />

      default:

        return <NotificationsIcon />

    }

  }


  const cardIconBGColorHandler = (broadcastType) => {

    switch (broadcastType) {

      case BroadcastType.Notification:

        return "orange"

      case BroadcastType.Advisory:

        return "#3d9afc"

      case BroadcastType.Promotion:

        return "red"

      default:

        return "orange"

    }

  }


  return (

    <Card

      elevation={2}

      onClick={() => {

        onClick()

        if (numberOfUnread > 0)

          setNumberOfUnread(numberOfUnread - 1)

      }}

      style={{

        margin: "1em",

        padding: "1em",

      }}

    >

      <div

        style={{

          display: "flex",

          alignItems: "center",

          marginBottom: "10px",

        }}

      >

        <Badge

          anchorOrigin={{

            vertical: "top",

            horizontal: "left",

          }}

          variant="dot"

          invisible={isRead}

          color="error"

        >

          <Avatar style={{ backgroundColor: cardIconBGColorHandler(type) }}>

            {cardIconHandler(type)}

          </Avatar>

        </Badge>

        <div

          style={{

            padding: "5px",

          }}

        >

          <Typography style={{ fontSize: 10, fontWeight: "bold" }}>

            {title}

          </Typography>

          <Typography style={{ fontSize: 10 }}>

            {timeAgo.format(new Date(createdAt))}

          </Typography>

        </div>

      </div>

      <Divider />

      <div

        style={{

          display: "flex",

          padding: "10px",

        }}

      >

        {images.length > 0 ? (

          <LazyLoadImage

            src={`${images[0]}?auto=compress&w=300`}

            alt="notif-image"

            height={"100px"}

            width={"100px"}

            effect="blur"

            style={{

              borderRadius: "10px",

              objectFit: "cover",

            }}

          />

        ) : (

          <div></div>

        )}

        <Typography

          style={{

            fontSize: 10,

            fontWeight: "bold",

            marginLeft: "10px",

            marginRight: "10px",

          }}

        >

          {body}

        </Typography>

      </div>

    </Card>

  )

}


export default BroadcastCard
