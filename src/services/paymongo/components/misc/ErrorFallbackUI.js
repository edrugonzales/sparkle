import React from "react"
import { Box, Button, Stack, Typography } from "@mui/material"
import ErrorGhost from "../../../../assets/svg/graphics/error_ghost.svg"

const ErrorFallbackUI = ({
  message = "Error message",
  onGoBack = () => {},
}) => {
  return (
    <Box>
      <Stack spacing={2}>
        <img
          src={ErrorGhost}
          alt="Error Logo"
          height={"100px"}
          width={"100px"}
        />
        <Typography>{message}</Typography>
        <Button
          variant="contained"
          onClick={() => {
            onGoBack()
          }}
        >
          GO BACK
        </Button>
      </Stack>
    </Box>
  )
}

export default ErrorFallbackUI
