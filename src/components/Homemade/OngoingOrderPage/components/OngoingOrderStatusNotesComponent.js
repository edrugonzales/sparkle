import { Typography } from '@material-ui/core'
import React from 'react'

const OngoingOrderStatusNotesComponent = ({ order }) => {
  function Notes(order) {
    switch (order.status) {
      case 'Rejected':
        return (
          <div
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontFamily: 'Visby',
            }}
          >
            <Typography
              style={{
                color: '#FC1011',
                fontWeight: 'bold',
              }}
            >
              NOTES FROM SELLER
            </Typography>
            <div
              style={{
                margin: '10px',
                padding: '10px',
                border: '1px',
                borderStyle: 'solid',
                borderRadius: '10px',
              }}
            >
              <Typography>{order.statusMessage}</Typography>
            </div>
          </div>
        )
      case 'Cancelled':
        return (
          <div
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography
              style={{
                color: '#FC1011',
                fontWeight: 'bold',
              }}
            >
              NOTES FROM ADMIN
            </Typography>
            <div
              style={{
                margin: '10px',
                padding: '10px',
                border: '1px',
                borderStyle: 'solid',
                borderRadius: '10px',
              }}
            >
              <Typography>{order.statusMessage}</Typography>
            </div>
          </div>
        )
      default:
        return <div></div>
    }
  }

  // return Notes(order)

  return Notes(order)
}

export default OngoingOrderStatusNotesComponent
