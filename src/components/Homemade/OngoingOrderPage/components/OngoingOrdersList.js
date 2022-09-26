import { Paper } from '@material-ui/core'
import React from 'react'
import OngoingOrderItemCard from './OngoingOrderItemCard'
import InfoIcon from '@material-ui/icons/Info'

const OngoingOrdersList = ({ ongoingOrders }) => {
  function display(ongoingOrders) {
    if (ongoingOrders.length > 0) {
      return ongoingOrders.map((order) => {
        return <OngoingOrderItemCard key={order._id} order={order} />
      })
    } else {
      return (
        <Paper
          style={{
            width: '100%',
            margin: '10px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <InfoIcon style={{ fill: '#ffcf10', margin: '5px' }} />
          <div>You have no pending orders...</div>
        </Paper>
      )
    }
  }

  return <div>{display(ongoingOrders)}</div>
}

export default OngoingOrdersList
