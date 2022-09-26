import React from 'react'
import useWindowDimensions from '../../../../custom-hooks/useWindowDimensions'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

const NoResults = () => {
  const { height, width } = useWindowDimensions()

  return (
    <div
      style={{
        fontFamily: 'visby',
        fontWeight: 'bold',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ErrorOutlineIcon
          style={{
            fill: 'grey',
            fontSize: 200,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '1z0px',
          color: 'grey',
        }}
      >
        No products found!
      </div>
    </div>
  )
}

export default NoResults
