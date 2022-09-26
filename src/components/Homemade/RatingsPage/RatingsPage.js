import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ProductRateCard from './components/ProductRateCard'
import { IconButton } from '@material-ui/core'
import { theme } from '../../../assets/mui'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { navigate } from 'gatsby-link'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
  },
}))

const RatingsPage = (props) => {
  const classes = useStyles()
  let order = props.location.state.data

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              navigate(-1)
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Typography className={classes.title}>Rate</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div
        style={{
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {order.products.map((product) => {
          return <ProductRateCard product={product} order={order} />
        })}
      </div>
    </MuiThemeProvider>
  )
}

export default RatingsPage
