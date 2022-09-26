import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Sorry_were_closed from '../../assets/svg/graphics/sorry_were_closed.svg'
import { Button, Dialog } from '@material-ui/core'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'animate.css'

const buttonStyle = makeStyles((theme) => ({
  regularButton: {
    margin: '5px',
    background: '#ffcf10',
    border: 0,
    borderRadius: 10,
    color: 'white',
    height: 60,
    fontSize: 9,
    padding: '0 30px',
    '&:hover': {
      backgroundColor: '#9C9C9C',
      color: '#fff',
    },
  },
  outlinedButton: {
    margin: '5px',
    border: '2px solid gray',
    color: 'gray',
    borderRadius: 10,
    height: 60,
    padding: '0 30px',
  },
}))
const ClosedShopDialog = ({ showDialog, message, onConfirm, onDecline }) => {
  const buttonClass = buttonStyle()

  return (
    <div>
      <Dialog open={showDialog} onClose={showDialog} fullWidth onBackdropClick={() => {
                onDecline()
              }}>
        <div
          style={{
            display: 'block',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              margin: '10px',
              textAlign: 'center',
            }}
          >
            <LazyLoadImage
              className="animate__animated animate__swing"
              src={Sorry_were_closed}
              alt="spark waving"
              effect={'blur'}
              height="150px"
              width="200px"
            />
          </div>
          <span
            style={{
              margin: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontFamily: 'visby',
              fontWeight: 'bold',
            }}
          >
            {message}
          </span>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '10px',
            }}
          >
            <Button
              className={buttonClass.regularButton}
              onClick={() => {
                onConfirm()
              }}
              color="primary"
            >
              I'm willing to wait
            </Button>
            <Button
              className={buttonClass.outlinedButton}
              onClick={() => {
                onDecline()
              }}
              color="primary"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default ClosedShopDialog
