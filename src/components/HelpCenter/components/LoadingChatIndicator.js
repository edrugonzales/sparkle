import { CircularProgress } from '@material-ui/core'
import React from 'react'

const LoadingChatIndicator = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Visby',
        fontWeight: 'bold',
      }}
    >
      <CircularProgress style={{ color: '#ffcf10', margin: '1em' }} />
      <span>Loading chat...</span>
    </div>
  )
}

export default LoadingChatIndicator
