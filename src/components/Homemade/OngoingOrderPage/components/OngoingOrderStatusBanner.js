import { Typography } from '@material-ui/core'
import React from 'react'
import OrderStatusAnimationComponent from './OrderStatusAnimationComponent'
import OngoingOrderStatusNotesComponent from './OngoingOrderStatusNotesComponent'
import { SomethingWentWrong } from '../../../Others/SomethingWentWrong'

const OngoingOrderStatusBanner = ({ order }) => {
  function StatusParagraph(status) {
    switch (status) {
      case 'Waiting for Payment':
        return 'Your order is received, awaiting payment to continue'
      case 'Not processed':
        return 'Your order is received and is waiting to be accepted by the seller'
      case 'Accepted':
        return 'Your order has been accepted by the seller'
      case 'Preparing':
        return 'Seller is now making your order'
      case 'For-pickup':
        return 'Seller is now making your order'
      case 'On the way':
        return 'Seller is now making your order'
      case 'Arrived on Merchant':
        return 'Seller is now making your order'
      case 'Picked up':
        return 'Seller is now making your order'
      case 'Order on the way':
        return 'Seller is now making your order'
      case 'Arrived':
        return 'Rider has arrived on your address'
      case 'Delivered':
        return 'Your order has been delivered, enjoy!'
      case 'Rejected':
        return ''
      case 'Cancelled':
        return ''
      default:
        return 'Sorry, just give us a moment to fix this'
    }
  }

  function StatusConverter(order) {
    switch (order.status) {
      case 'Waiting for Payment':
        return <OrderStatusAnimationComponent status={order.status} />
      case 'Not processed':
        return <OrderStatusAnimationComponent status={order.status} />
      case 'Accepted':
        return <OrderStatusAnimationComponent status={order.status} />
      case 'Preparing':
        return <OrderStatusAnimationComponent status={order.status} />
      case 'For-pickup':
        return <OrderStatusAnimationComponent status={order.status} />
      case 'On the way':
        return <OrderStatusAnimationComponent status={order.status} />
      case 'Arrived on Merchant':
        return <OrderStatusAnimationComponent status={order.status} />
      case 'Picked up':
        return <OrderStatusAnimationComponent status={order.status} />
      case 'Order on the way':
        return <OrderStatusAnimationComponent status={order.status} />
      case 'Arrived':
        return <OrderStatusAnimationComponent status={order.status} />
      case 'Delivered':
        return <OrderStatusAnimationComponent status={order.status} />
      case 'Rejected':
        return <OngoingOrderStatusNotesComponent order={order} />
      case 'Cancelled':
        return <OngoingOrderStatusNotesComponent order={order} />
      default:
        return <SomethingWentWrong />
    }
  }

  return (
    <div>
      <div>{StatusConverter(order)}</div>
      <Typography
        style={{
          textAlign: 'center',
          color: 'grey',
          fontWeight: 'bold',
          fontFamily: 'Visby',
        }}
      >
        {StatusParagraph(order.status)}
      </Typography>
    </div>
  )
}

export default OngoingOrderStatusBanner
