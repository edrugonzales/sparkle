import React, { useState, useEffect, useContext } from "react"
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { navigate } from "gatsby"
import { LoginState } from "../../globalstates"
import Login from "../../LoginPage"
import VortexTransactionListItem from "../components/VortexTransactionListItem"
import { getAllVortexTransactions } from "../../../api/public/vortex/transaction_db"
import CenteredProgress from "../../misc/centeredProgress"
import HistoryIcon from "@mui/icons-material/History"
import usePaymongoRefundDialog from "../../../services/paymongo/hooks/usePaymongoRefundDialog"
import NoDataFound from "../../misc/NoDataFound"

const VortexTransactionHistory = () => {
  const [isLoggin, setisLoggin] = useContext(LoginState)

  const [isLoading, setIsLoading] = useState(false)

  const [transactions, setTransactions] = useState([])

  const [renderData, setRenderData] = useState([])

  const { showPaymongoRefundDialog, PaymongoRefundDialog } =
    usePaymongoRefundDialog()

  useEffect(async () => {
    setIsLoading(true)
    let response = await getAllVortexTransactions()

    if (response.status === 200) {
      let result = await response.json()
      setTransactions(result)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (transactions.length > 0) {
      setRenderData(transactions)
    }
  }, [transactions])

  if (!isLoggin) {
    return <Login showBackButton={true} />
  }

  return (
    <Box>
      <AppBar position="fixed" style={{ background: "#ffffff" }}>
        <Toolbar>
          <IconButton
            onClick={() => {
              navigate(-1)
            }}
            style={{ color: "black" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            marginLeft={3}
            color={"black"}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Vortex transactions
          </Typography>
          {/* <IconButton
            style={{ color: "black" }}
            onClick={() => {
              showPaymongoRefundDialog()
            }}
          >
            <HistoryIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Toolbar />
      {isLoading && <CenteredProgress />}
      {renderData.length <= 0 && !isLoading && <NoDataFound />}
      <List>
        {renderData.map((v) => {
          return (
            <VortexTransactionListItem
              title={
                v.referenceNumber !== "undefined"
                  ? v.referenceNumber
                  : "Failed transaction"
              }
              createdAt={v.createdAt}
              onClick={() => {
                navigate(`/vortextransactions/${v.type}/${v.referenceNumber}`, { state: v })
              }}
            />
          )
        })}
      </List>
      <PaymongoRefundDialog />
    </Box>
  )
}

export default VortexTransactionHistory
