import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import mascon_wave_blink from '../../assets/gif/mascon_wave_blink.gif'
import { Button, Dialog } from '@material-ui/core'

const buttonStyle = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0, 0, 0),
    background: '#ffcf10',
    border: 0,
    borderRadius: 3,
    color: 'black',
    height: 35,
    padding: '0 30px',
    '&:hover': {
      backgroundColor: '#9C9C9C',
      color: '#fff',
    },
  },
}))

const InfoDialog = ({ showDialog, message, onConfirm }) => {
  const buttonClass = buttonStyle()

  return (
    <div>
      <Dialog open={showDialog} onClose={showDialog} fullWidth onBackdropClick={() => {
                onConfirm()
              }}>
        <div
          style={{
            display: 'contents',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              margin: '10px',
            }}
          >
            <img
              src={mascon_wave_blink}
              alt="spark waving"
              height="120px"
              width="170px"
            />
          </div>
          <div
            style={{
              margin: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'visby',
              fontSize: '1.2em'
            }}
          >
            {message}
          </div>
          <div
            style={{
              margin: '10px',
            }}
          >
            <Button
              fullWidth
              className={buttonClass.button}
              onClick={() => {
                onConfirm()
              }}
              color="primary"
            >
              OK
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default InfoDialog
