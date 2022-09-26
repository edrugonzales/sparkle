import React, { useState, useEffect } from "react"

import Box from "@material-ui/core/Box"
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import Divider from "@material-ui/core/Divider"
import Container from "@material-ui/core/Container"
import CircularProgress from "@material-ui/core/CircularProgress"
import HistoryRounded from "@material-ui/icons/HistoryRounded"

import moment from "moment"
import { navigate } from "gatsby"
import { getPurchaseHistory } from "../../../api/public/user"
import { getUser } from "../../../services/auth"
import StatusChip from "../../Chips/StatusChip"
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core"
import { theme } from "../../../assets/mui"
import useWindowDimensions from "../../../custom-hooks/useWindowDimensions"
import numberNullSafety from "../../../helpers/numberNullSafety"

const useStyles = makeStyles({
  listBackground: {
    backgroundColor: "#F2F7FD",
    borderRadius: "15px",
  },
  fontsize: {
    fontSize: 12,
  },
  decoration: {
    textDecoration: "none",
    color: "black",
  },
  bold: {
    fontWeight: "bold",
    fontFamily: "visby",
  },
  iconDelivered: {
    color: "green",
    marginLeft: "1em",
  },
  iconCancelled: {
    color: "red",
  },
  productOnList: {
    color: "gray",
  },
  noOrdersYet: {
    fontFamily: "visby",
    textAlign: "center",
    fontSize: "2em",
    fontWeight: "bold",
    marginTop: "50%",
  },
})
const PurchaseHistoryPage = (props) => {
  const classes = useStyles()

  //const [state, setstate] = useState(initialState)

  const user = getUser()

  const { height, width } = useWindowDimensions()

  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [page, setPage] = useState(1)
  const [loadingNextPage, setloadingNextPage] = useState(false)

  useEffect(() => {
    setData([])

    let cachedData = localStorage.getItem("orderHistory")

    if (cachedData) {
      setData(JSON.parse(cachedData))
    }

    getPurchaseHistory(
      "/user/list/paginated-purchase-history/" +
        user.userId +
        `?page=${page}&limit=10`,
      user.token
    )
      .then((data) => {
        setData(data)
        setLoaded(true)

        localStorage.setItem("orderHistory", JSON.stringify(data))
      })
      .catch(() => {})

    //alert(data?.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function nextPage() {
    setloadingNextPage(true)

    let currentPage = page + 1

    setPage(currentPage)

    getPurchaseHistory(
      "/user/list/paginated-purchase-history/" +
        user.userId +
        `?page=${page + 1}&limit=10`,
      user.token
    )
      .then((data) => {
        setLoaded(true)

        setData((prevState) => [...prevState, ...data])
        setloadingNextPage(false)
      })
      .catch(() => {})
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={(e) => {
              navigate("/food")
            }}
          >
            <ArrowBackIcon className={classes.backSize} />
          </IconButton>
          <Typography style={{ fontFamily: "visby", fontWeight: "bold" }}>
            Purchase History
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <div>
        {loaded === false && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="secondary" />
            <Typography style={{ marginLeft: "1em" }}>
              Fetching data...
            </Typography>
          </div>
        )}
        {data?.length === undefined && <NoPurchasesYet />}
        {data?.map((history, index) => {
          return (
            <div>
              <PurchaseHistoryListItem key={index} history={history} />
            </div>
          )
        })}
        <div
          style={{
            display: loaded ? "flex" : "none",
            justifyContent: "center",
          }}
        >
          <Button
            startIcon={
              loadingNextPage ? (
                <CircularProgress color="secondary" />
              ) : (
                <HistoryRounded />
              )
            }
            onClick={() => {
              nextPage()
            }}
          >
            {loadingNextPage ? "Loading older orders" : "Load older orders"}
          </Button>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

const NoPurchasesYet = () => {
  const classes = useStyles()
  return <Box className={classes.noOrdersYet}>No purchase records found!</Box>
}

const PurchaseHistoryListItem = ({ history }) => {
  const classes = useStyles()
  //
  //

  const [data, setData] = useState(history)

  useEffect(() => {
    setData(history)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submithandler = () => {
    navigate(`/user/history/${data._id}`, {
      state: {
        data: data,
      },
    })
  }

  return (
    <>
      <div
        style={{
          margin: "10px",
        }}
      >
        <Container maxWidth="xs" disableGutters="true">
          <Box pt={2}></Box>
          <List className={classes.listBackground}>
            <ListItem onClick={() => submithandler()}>
              <ListItemAvatar>
                <Avatar>
                  <img
                    src={history.shop.logo}
                    alt="Shop Logo"
                    className={`${classes.large} ${classes.center} ${classes.img}`}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    component={"div"}
                    variant="subtitle1"
                    className={classes.bold}
                    style={{ lineHeight: "normal" }}
                  >
                    {history.shop.name}
                  </Typography>
                }
                secondary={moment(history.createdAt).format("MMMM DD YYYY")}
              />
              <Box>
                <StatusChip status={history.status} />
              </Box>
            </ListItem>
            <Box pt={0.5} pb={0.5}>
              <Divider variant="middle" />
            </Box>
            <Box pl={2}>
              <Typography component={"div"}>
                {history.products.map((product) => {
                  return (
                    <div key={product._id}>
                      <Typography
                        component={"div"}
                        className={classes.productOnList}
                      >
                        {product.count} {product.name} &nbsp; &nbsp; &#8369;{" "}
                        {product.price}
                      </Typography>
                    </div>
                  )
                })}
              </Typography>
            </Box>
            <Box pr={2}>
              <Typography
                component={"div"}
                className={classes.bold}
                align="right"
              >
                Total: &#8369;{" "}
                {Math.round(
                  history.amount +
                    history.deliveryFee -
                    (numberNullSafety(history.deliveryFeeDiscount) +
                      numberNullSafety(history.amountDiscount))
                )}
              </Typography>
            </Box>
          </List>
        </Container>
      </div>
    </>
  )
}

export default PurchaseHistoryPage
