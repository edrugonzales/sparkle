import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import mascot_welcome_logo from '../../../assets/images/mascot_welcome_logo.png'

const WelcomeBanner = ({ username }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <div>
        <LazyLoadImage
          src={mascot_welcome_logo}
          alt="spark_welcome"
          effect={'blur'}
          height={'100px'}
        />
      </div>
      <div>
        <div
          style={{
            fontWeight: 'bold',
            fontFamily: 'visby',
          }}
        >
          Hi {username}
        </div>
        <div style={{ fontFamily: 'visby' }}>How can we help you?</div>
      </div>
    </div>
  )
}

export default WelcomeBanner
