import React from 'react'
import SplashImage from '../assets/gif/sparkle_loading_version_2.gif'

const SplashScreen = () => {
  return (
    <>
      <img
        style={{
          width: '100%',
          position: 'fixed',
        }}
        src={SplashImage}
        alt="Sparkle Logo Animation"
      />
    </>
  )
}

export default SplashScreen