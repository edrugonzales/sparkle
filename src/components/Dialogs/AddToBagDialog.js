import React from 'react'
import { Dialog } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import mascon_wave_blink from '../../assets/gif/mascon_wave_blink.gif'

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
      backgroundColor: '#9C9C9C',
      color: '#fff',
    },
    textTransform: 'none'
  },
  outlinedButton: {
    margin: '5px',
    border: '2px solid #ffcf10',
    color: '#ffcf10',
    borderRadius: 10,
    height: 60,
    padding: '0 30px',
    textTransform: 'none'
  },
}))

const AddToBagDialog = ({
  showDialog,
  message,
  onGotoBag,
  onAddMoreProducts,
}) => {
  const buttonClass = buttonStyle()

  return (
    <div>
      <Dialog open={showDialog} onClose={showDialog} fullWidth onBackdropClick={() => {
              onAddMoreProducts()
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
              fontWeight: 'bold',
              fontSize: '1.2em'
            }}
          >
            {message}
          </div>

          <Button
            className={buttonClass.regularButton}
            onClick={() => {
              onGotoBag()
            }}
            color="primary"
          >
            Go to Bag
          </Button>

          <Button
            className={buttonClass.outlinedButton}
            onClick={() => {
              onAddMoreProducts()
            }}
            color="primary"
          >
            Add more products...
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default AddToBagDialog
