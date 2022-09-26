import { Grid, Typography } from '@material-ui/core'
import React from 'react'

const LabeledComponentV2 = ({ label, content }) => {
  return (
    <div
      style={{
        margin: '5px',
      }}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography
          style={{
            fontWeight: 'bold',
            fontFamily: 'Visby',
            fontSize: '15px',
          }}
        >
          {label}
        </Typography>
        <Typography
          style={{
            fontFamily: 'Visby',
            fontSize: '15px',
          }}
        >
          {content}
        </Typography>
      </Grid>
    </div>
  )
}

export default LabeledComponentV2
