import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'gatsby'
import React from 'react'

import BeenhereIcon from '@material-ui/icons/Beenhere'

const useStyles = makeStyles({
  backSize: {
    fontSize: '1.5em',
    color: 'black',
  },
  listBackground: {
    backgroundColor: '#F2F7FD',
    borderRadius: '15px',
    marginLeft: '1em',
    marginRight: '1em',
  },
  bold: {
    fontWeight: 'bold',
    fontFamily: 'visby',
  },
  visby: {
    fontFamily: 'visby',
  },
  fontColor: {
    color: 'black',
  },
  decoration: {
    textDecoration: 'none',
    fontFamily: 'visby',
    fontSize: '0.9em',
  },
  iconBackGround: {
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#FFCF10',
    borderRadius: '10px',
    height: '3em',
    fontFamily: 'visby',
    fontWeight: 'bold',
  },
  textField: {
    margin: '50px',
    height: '200px',
  },
  drawer: {
    elevation: 0,
    borderRadius: '10px',
  },
  backdrop: {
    zIndex: 100,
  },
  title: {
    fontFamily: 'visby',
    fontWeight: 'bold',
  },
  change: {
    marginLeft: '0.3em',
  },
  deliveryInfo: {
    fontFamily: 'visby',
  },
})

const CheckoutItem = ({
  icon,
  title = 'Checkout Item',
  subtitle = 'Checkout subtitle',
  onClick,
  onCancel
}) => {
  const classes = useStyles()

  function isThereAnIcon(icon) {
    if (icon !== undefined) {
      return <div>{icon}</div>
    } else {
      return <BeenhereIcon className={classes.fontColor} />
    }
  }

  //   const CheckoutItemIcon = icon

  return (
    <div
      style={{ margin: '4px' }}
      onClick={(e) => {
        if (subtitle === 'Please enter code')
          onClick(e);
        else
          onCancel(e);
      }}
    >
      <Link className={classes.decoration}>
        <List className={classes.listBackground}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.iconBackGround}>
                {isThereAnIcon(icon)}
                {/* {icon} */}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className={`${classes.bold} ${classes.fontColor}`}
                >
                  {title}
                </Typography>
              }
              secondary={<div className={classes.visby}>{subtitle}</div>}
            />
            <ListItemSecondaryAction>
              {subtitle === 'Please enter code' ? <p>Change</p> : <p> Cancel </p>}
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Link>
    </div>
  )
}

export default CheckoutItem
