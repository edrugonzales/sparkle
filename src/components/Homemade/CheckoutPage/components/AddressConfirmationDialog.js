import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import mascon_wave_blink from '../../../../assets/gif/mascon_wave_blink.gif'
import location_graphics from '../../../../assets/gif/location-graphics.gif'
import { Button, Dialog } from '@material-ui/core'

const buttonStyle = makeStyles((theme) => ({
  regularButton: {
    margin: '5px',
    background: '#ffcf10',
    border: 0,
    borderRadius: 10,
    color: 'white',
    height: 60,
    padding: '0 30px',
    '&:hover': {
      backgroundColor: '#3d9afc',
    },
    '&:focus': {
      backgroundColor: '#3d9afc',
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

const AddressConfirmationDialog = ({
  showDialog,
  message,
  onConfirm,
  onDecline,
}) => {
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
            <img
              src={location_graphics}
              alt="spark waving"
              height="120px"
              width="170px"
            />
          </div>
          <p
            style={{
              margin: '10px',
              display: 'grid',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontFamily: 'visby',
            }}
          >
           Your order will be delivered to 
           <strong>
            {message}  
           </strong>
          </p>
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
              Confirm
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

export default AddressConfirmationDialog
