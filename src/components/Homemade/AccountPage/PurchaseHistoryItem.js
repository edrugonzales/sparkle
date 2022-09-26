import React from "react"
import { Link, navigate } from "gatsby"

import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import { AppBar, Button, Toolbar } from "@material-ui/core"
import { theme } from "../../../assets/mui"
import { MuiThemeProvider } from "@material-ui/core/styles"
import moment from "moment"
import StatusChip from "../../Chips/StatusChip"
import numberNullSafety from "../../../helpers/numberNullSafety"

const useStyles = makeStyles({
  backButton: {
    border: "1px solid transparent",
    borderRadius: "8px",
    width: "30px",
    height: "30px",
    color: "#3486D6",
    backgroundColor: "#F4F7FE",
    boxShadow: "0 0 1px #3486D6",
  },
  status: {
    color: "white",
    border: " 1px solid",
    borderRadius: "12px",
    padding: "2px 10px",
    fontSize: "12px",
    fontFamily: "visby",
  },
  font: {
    fontSize: "11px",
    fontFamily: "visby",
  },
  text: {
    fontFamily: "visby",
  },
  page: {
    marginLeft: "1em",
  },
  margin: {
    marginTop: "1em",
  },
})

const PurchaseHistoryItem = (props) => {
  const classes = useStyles()
  const data = props.location.state.data

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar elevation={0}>
        <Toolbar>
          <Link to="/user/history">
            <ChevronLeftRoundedIcon className={classes.backButton} />
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div className={classes.page}>
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold" m={1} className={classes.text}>
            Order Details <StatusChip status={data.status} />
          </Box>
        </Typography>
        <div>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={3}>
              <Typography variant="subtitle2">
                <Box
                  fontWeight="fontWeightBold"
                  pl={1}
                  className={classes.text}
                >
                  Transaction ID:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2">
                <Box pl={1}>{data.transaction_id}</Box>
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3}>
              <Typography variant="subtitle2">
                <Box
                  fontWeight="fontWeightBold"
                  pl={1}
                  className={classes.text}
                >
                  Order for:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2">
                <Box pl={1}>
                  {moment(data.when).calendar()}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3}>
              <Typography variant="subtitle2">
                <Box
                  fontWeight="fontWeightBold"
                  pl={1}
                  className={classes.text}
                >
                  Name:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2">
                <Box pl={1}>{data.user.name}</Box>
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3}>
              <Typography variant="subtitle2">
                <Box
                  fontWeight="fontWeightBold"
                  pl={1}
                  className={classes.text}
                >
                  Contact:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2">
                <Box pl={1}>{data.user.phone}</Box>
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3}>
              <Typography variant="subtitle2">
                <Box
                  fontWeight="fontWeightBold"
                  pl={1}
                  className={classes.text}
                >
                  Address:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2">
                <Box pl={1}>{data.address}</Box>
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2">
                <Box
                  fontWeight="fontWeightBold"
                  pl={1}
                  className={classes.text}
                >
                  Products:
                </Box>
              </Typography>
            </Grid>
            {data.products.map((product) => {
              console.log(product)
              return (
                <>
                  <Grid container spacing={1}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs>
                      <Typography variant="subtitle2">
                        <Box pl={1}>
                          {product.count} {product.name} {product?.addons.map(addon => `${addon.name}, `)}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="subtitle2">
                        <Box pl={1}>P {product.price * product.count}</Box>
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              )
            })}
          </Grid>
          <Box pt={0.5} pb={0.5}>
            <Divider variant="middle" className={classes.margin} />
          </Box>
          <Grid container spacing={1}>
            <Grid>
              <Typography variant="subtitle2">
                <Box
                  fontWeight="fontWeightBold"
                  pl={1}
                  className={classes.text}
                >
                  Discounts:
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Typography className={classes.font}>
                <Box pl={1}></Box>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2">
                <Box pl={1}>Product discount</Box>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2">
                <Box pl={1}>
                  P -{data.amountDiscount ? data.amountDiscount : 0}
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Typography className={classes.font}>
                <Box pl={1}></Box>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2">
                <Box pl={1}>Delivery fee discount</Box>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2">
                <Box pl={1}>
                  P -{data.deliveryFeeDiscount ? data.deliveryFeeDiscount : 0}
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <Box pt={0.5} pb={0.5}>
            <Divider variant="middle" />
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Typography className={classes.font}>
                <Box pl={1}></Box>
              </Typography>
            </Grid>
            <Grid item xs style={{ paddingTop: "10px" }}>
              <Typography variant="subtitle2">
                <Box pl={1}>Delivery Fee</Box>
              </Typography>
            </Grid>
            <Grid item xs style={{ paddingTop: "10px" }}>
              <Typography variant="subtitle2">
                <Box pl={1}>P {data.deliveryFee}</Box>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Typography className={classes.font}>
                <Box pl={1}></Box>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2">
                <Box pl={1}>Total</Box>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2">
                <Box pl={1}>
                  P{" "}
                  {/* {data.amountDiscount && data.deliveryFeeDiscount
                    ? data.amount +
                      data.deliveryFee -
                      data.deliveryFeeDiscount -
                      data.amountDiscount
                    : data.amount + data.deliveryFee} */}
                  {Math.round(
                    data.amount +
                      data.deliveryFee -
                      (numberNullSafety(data.deliveryFeeDiscount) +
                        numberNullSafety(data.amountDiscount))
                  )}
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={3}>
              <Typography variant="subtitle2">
                <Box
                  fontWeight="fontWeightBold"
                  pl={1}
                  className={classes.text}
                >
                  Voucher:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2">
                <Box pl={1}>
                  {data.voucher ? data.voucher : "No Voucher Applied"}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2">
                <Box pl={1}>{data.deliveryNotes}</Box>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={3}>
              <Typography variant="subtitle2">
                <Box
                  fontWeight="fontWeightBold"
                  pl={1}
                  className={classes.text}
                >
                  Payment:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2">
                <Box pl={1}>{data.paymentType}</Box>
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3}>
              <Typography variant="subtitle2">
                <Box
                  fontWeight="fontWeightBold"
                  pl={1}
                  className={classes.text}
                >
                  Notes:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2">
                <Box pl={1}>{data.deliveryNotes}</Box>
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            {data.status === "Delivered" ? (
              <Button
                variant="contained"
                color="secondary"
                fullWidth={true}
                onClick={(e) => {
                  navigate("/ratingspage", {
                    state: {
                      data: data,
                    },
                  })
                }}
              >
                Rate
              </Button>
            ) : (
              <div></div>
            )}
          </Grid>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default PurchaseHistoryItem
