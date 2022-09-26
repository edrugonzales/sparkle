import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types';
import { Container, Divider, Grid, IconButton, Typography,Tabs , Tab, Box } from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import OngoingOrderProductItem from "./components/OngoingOrderProductItem"
import LabeledComponent from "./components/LabeledComponent"
import OngoingOrderStatusBanner from "./components/OngoingOrderStatusBanner"

import { getOrderByOrderId } from "../../../api/public/order"
import LabeledComponentV2 from "./components/LabeledComponentV2"
import { navigate } from "gatsby"
import numberNullSafety from "../../../helpers/numberNullSafety"
import TrackRiderButton from "./components/trackRiderButton"
import socket from "../../../services/socketio/"
import {CopyToClipboard} from 'react-copy-to-clipboard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const OngoingOrderDetails = (props) => {
  const [order, setorder] = useState(props.location.state.order)
  const [value, setValue] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const [requestAgain, setrequestAgain] = React.useState(false);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    socket.on(`order-update-${order._id}`, (data) => {
      setorder(data)
    })
  }, [])

  useEffect(() => {
    getOrderByOrderId(order._id).then((response) => {
      if (response?.status === 200) {
        response.json().then((result) => {
          setorder(result)
        })
      } else {
        return
      }
    })
  }, [])

  let when = new Date(order.when)

  return (
    <div
      style={{
        fontFamily: "Visby",
      }}
    >
      {/* Topbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              navigate("/food")
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography style={{ fontWeight: "bold", fontFamily: "Visby" }}>
            Order details
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <Typography
              style={{
                fontSize: "10px",
              }}
            >
              Transaction no.
            </Typography>
            <Typography style={{ fontWeight: "bold", fontFamily: "Visby" }}>
              {order.transaction_id}
            </Typography>
          </div>
          <div>
            <TrackRiderButton order={order._id} />
          </div>
        </div>
      </div>
      {/* Banner */}
      <Container maxWidth="xs" disableGutters="true">  
      <div>
        <OngoingOrderStatusBanner order={order} />
      </div>
      {/* Body */}
      <div
        style={{
          margin: "10px",
        }}
      >
        <Grid container direction="column">
       {
         order.status ==="Waiting for Payment" ? 

         <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Gcash Payment Options"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Pay via Number" {...a11yProps(0)} />
            {/* <Tab label="Pay via QR" {...a11yProps(1)} /> */}
            <Tab label="Request for payment" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <p>
              GCash Number: 09107727553           
            </p>
            <CopyToClipboard text={'09107727553'}
                onCopy={() => {setCopied(true);  
                  setTimeout(() => {
                  setCopied(false)
                }, 3000)}}>
                <button>Copy Number</button>
              </CopyToClipboard>

              {copied ? <span style={{color: 'red'}}> Copied.</span> : null}
            <p>
            GCash Name: Abigail D.
            </p>
            <p>
           Pay: P {Math.round(
                  order.amount +
                    order.deliveryFee -
                    (numberNullSafety(order.deliveryFeeDiscount) +
                      numberNullSafety(order.amountDiscount))
                )}
            </p>
            <button> Learn How</button>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <p>
              Want us to request payment via GCash?
            </p>
            <input type={'number'} ></input>
            <button onClick={()=> { 
              fetch(
                ' https://discord.com/api/webhooks/823325081354502155/lkwrZFJ4vbECk3_dEmboOQaVbpDWfMYnYoOJpDVXaPjNJacDhE-DrCjo5zO1SIPWCJpm',
                {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    // the username to be displayed
                    username: 'GCash Payment Request',
                    // the avatar to be displayed
                    avatar_url:
                      'https://play-lh.googleusercontent.com/QNP0Aj2hyumAmYiWVAsJtY2LLTQnzHxdW7-DpwFUFNkPJjgRxi-BXg7A4yI6tgYKMeU',
                    // contents of the message to be sent
                    content:
                      `GCash Payment Request: 09171580396 Total to be paid: ${Math.round(
                        order.amount +
                          order.deliveryFee -
                          (numberNullSafety(order.deliveryFeeDiscount) +
                            numberNullSafety(order.amountDiscount))
                      )} - Transaction Id: ${order.transaction_id}`,
                  }),
                }
              );
            
              // if (! /^[0-9]{11}$/.test(x)) {
              //   alert("Please input exactly 11 numbers and should start with 09'!");
              //   return false;
              // }

            }}>
              Request Payment
            </button>
            <br/><br/>
           

            <button>Learn More</button>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>

        : <></>
       }
        
          <LabeledComponentV2 label={"Notes:"} content={order.deliveryNotes} />
          <LabeledComponentV2
            label={"Order for:"}
            content={`${when.toLocaleDateString()} ${when.toLocaleTimeString()}`}
          />
          <LabeledComponentV2 label={"Name:"} content={order.user.name} />
          <LabeledComponentV2 label={"Contact:"} content={order.user.phone} />
          <LabeledComponentV2 label={"Address:"} content={order.address} />
          <LabeledComponentV2 label={"Seller:"} content={order.shop.name} />
          <Divider />
          <LabeledComponentV2 label={"Products:"} content={""} />
          <Grid>
            <div>
              {order.products.map((product) => {
                return <OngoingOrderProductItem product={product} />
              })}
              <LabeledComponent
                label={"Delivery Fee"}
                content={order.deliveryFee}
              />

              {order?.deliveryFeeDiscount > 0 ? (
                <LabeledComponent
                  label={"Delivery Fee Discount"}
                  content={order.deliveryFeeDiscount}
                />
              ) : (
                <></>
              )}
              {order?.amountDiscount > 0 ? (
                <LabeledComponent
                  label={"Discount"}
                  content={order.amountDiscount}
                />
              ) : (
                <></>
              )}
              <LabeledComponent
                label={"Total"}
                content={Math.round(
                  order.amount +
                    order.deliveryFee -
                    (numberNullSafety(order.deliveryFeeDiscount) +
                      numberNullSafety(order.amountDiscount))
                )}
              />
            </div>
          </Grid>
          <LabeledComponentV2 label={"Payment:"} content={order.paymentType} />
        </Grid>
      </div>
      </Container>
    </div>
  )
}

export default OngoingOrderDetails
