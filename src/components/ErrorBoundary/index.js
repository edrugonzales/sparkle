import React from "react"
import { ErrorBoundary } from "@sentry/react"
import { Box, Button, Stack, Typography } from "@mui/material"

import ErrorGhost from "../../assets/svg/graphics/error_ghost.svg"

export const Fallback = ({ error, resetError }) => {
  return (
    <Box m={3}>
      <Stack spacing={2}>
        <img
          src={ErrorGhost}
          alt="Error Logo"
          height={"100px"}
          width={"100px"}
        />
        <Typography variant="h3">{`Something went wrong!`}</Typography>
        <Typography>{`${error?.message}`}</Typography>
        <Typography variant="h6">{`We are now working to fix this! you might wanna try again later`}</Typography>
        <Button
          variant="contained"
          onClick={() => {
            window.location.reload(false)
          }}
        >
          Go back
        </Button>
      </Stack>
    </Box>
  )
}

const ErrorBoundaryContainer = ({ children }) => {
  return <ErrorBoundary fallback={Fallback}>{children}</ErrorBoundary>
}

export default ErrorBoundaryContainer
