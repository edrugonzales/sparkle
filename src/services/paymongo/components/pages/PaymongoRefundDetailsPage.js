import React, { useState, useEffect } from "react"
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { navigate } from "gatsby"
import CenteredProgress from "../../../../components/misc/centeredProgress"
import { retrievePaymongoRefundResource } from "../../../../api/public/paymongo"
import { useParams } from "@reach/router"
import unixTimeConverter from "../../../../helpers/unixTimeConverter"

const PaymongoRefundDetailsPage = () => {
  let { refId } = useParams()

  const [isLoading, setIsLoading] = useState(false)

  const [refundDetails, setRefundDetails] = useState(null)

  useEffect(async () => {
    setIsLoading(true)

    let refundDetailsResponse = await retrievePaymongoRefundResource({
      refId: refId,
    })

    if (refundDetailsResponse.status === 200) {
      let result = await refundDetailsResponse.json()

      setRefundDetails(result)
    } else {
      //todo error handling
    }

    setIsLoading(false)
  }, [])

  return (
    <Box>
      <AppBar sx={{ position: "relative", background: "white" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={() => {
              navigate(-1)
            }}
          >
            <ArrowBackIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, color: "black" }} component="div">
            Refund Requests Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {isLoading && <CenteredProgress />}
      {refundDetails && (
        <Card elevation={10} sx={{ margin: 2 }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography
                fontWeight={"bold"}
                fontSize={10}
              >{`REF NO: ${refundDetails?.data?.id}`}</Typography>
              <Typography fontSize={20} fontWeight={"bold"} color={"gray"}>
                {"YOUR REFUND HAS BEEN PROCESSED..."}
              </Typography>
              <Typography fontWeight={"bold"}>
                {`TOTAL AMOUNT OF ${
                  refundDetails?.data?.attributes?.amount / 100
                } ${refundDetails?.data?.attributes?.currency}`}
              </Typography>
              <Divider />

              <Typography fontSize={10}>
                {`STATUS: ${refundDetails?.data?.attributes?.status.toUpperCase()}`}
              </Typography>
              <Typography fontSize={10}>{`Created at ${unixTimeConverter(
                refundDetails?.data?.attributes?.created_at
              )}`}</Typography>
              <Typography
                fontSize={10}
              >{`Reason for this refund: ${refundDetails?.data?.attributes?.notes}`}</Typography>
              <Divider />
              <Typography fontSize={10} color={"gray"}>
                {`Refunds can only be made a certain time after the payment has been made:`}
              </Typography>

              <div>
                <table>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }}>
                        <Typography fontSize={10}>Transaction type</Typography>
                      </th>
                      <th style={{ textAlign: "left" }}>
                        <Typography fontSize={10}>Timespan</Typography>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Typography fontSize={10}>
                          Debit and credit card transactions
                        </Typography>
                      </td>
                      <td>
                        <Typography fontSize={10}>
                          Within 60 days from the date of payment
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Typography fontSize={10}>
                          GCash transactions
                        </Typography>
                      </td>
                      <td>
                        <Typography fontSize={10}>
                          Within 180 days from the date of payment
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Typography fontSize={10}>
                          GrabPay transactions
                        </Typography>
                      </td>
                      <td>
                        <Typography fontSize={10}>
                          Within 90 days from the date of payment
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Typography fontSize={10}>
                          PayMaya transactions
                        </Typography>
                      </td>
                      <td>
                        <Typography fontSize={10}>
                          Within 365 days from the date of payment
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Divider />
              <Typography
                fontSize={10}
              >{`SPARKLE STAR INTERNATIONAL`}</Typography>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default PaymongoRefundDetailsPage
