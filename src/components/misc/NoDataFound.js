import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import React from "react"
import EmptyBox from "../../assets/svg/graphics/empty_box.svg"

const NoDataFound = () => {
  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Stack direction={"row"} justifyContent={"center"}>
          <Stack alignItems={"center"}>
            <img
              src={EmptyBox}
              alt="empty"
              height={"70px"}
              width={"70px"}
              style={{ fill: "gray" }}
            />
            <Typography fontSize={"15px"} fontWeight={"bold"} color="gray">
              No data found !
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default NoDataFound
