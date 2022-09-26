import { Button, IconButton } from '@material-ui/core'
import React from 'react'
import nostores from '../../../../assets/images/no_store_near_you.png'
import ReplayIcon from '@material-ui/icons/Replay'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const NoStoreFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'visby',
      }}
    >
      <div
        style={{
          height: '200px',
          width: '300px',
          textAlign: 'center',
        }}
      >
        <LazyLoadImage
          src={nostores}
          alt="No Stores near you"
          effect="blur"
          width="200px"
        />

        <h1>Sorry</h1>
        <p>No shops currently available near you</p>
        <p>
          Sparkle is currently servicing City of Manila, Please contact us,
          we'll do our best to get the best kabayanijuan products out to you!
          #Bilhinsarilingatin
        </p>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => window.open('http://sparkles.com.ph', '_blank')}
        >
          I want sparkle here
        </Button>
        <br />
        {/* <IconButton>
          <ReplayIcon />
        </IconButton> */}
      </div>
    </div>
  )
}

export default NoStoreFound
