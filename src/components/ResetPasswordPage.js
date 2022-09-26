import React, { useState } from "react"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { Link } from "gatsby"
import { Formik, Form, useField } from "formik"
import * as yup from "yup"
import { resetPassword } from "../api/public/auth"
import { AppBar, Dialog, DialogActions, Toolbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { theme } from "../assets/mui"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: "#0186FD",
    borderRadius: "16px",
    padding: "1em",
  },
  container: {
    width: "300px",
  },
}))

const buttonStyle = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0, 0, 0),
    background: "#ffcf10",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 35,
    padding: "0 30px",
  },
}))

const CustomTextField = ({
  type,
  label,
  placeholder,
  InputProps,
  ...props
}) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <TextField
      label={label}
      variant="outlined"
      required
      fullWidth
      margin="normal"
      type={type}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      InputProps={InputProps}
    />
  )
}

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required(),
})

const ResetPasswordPage = () => {
  const classes = useStyles()
  const buttonClass = buttonStyle()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogState, setDialogState] = useState({
    showDialog: false,
    dialogMessage: "",
    isError: false,
  })

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar elevation={0}>
        <Toolbar>
          <Link to="/food">
            <ChevronLeftIcon />
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="xs" disableGutters="true" className={classes.container}>
        <div className={classes.paper}>
          <Box pb={2}>
            <Typography component="h1" variant="h5">
              Reset your password
            </Typography>
          </Box>
          <Typography variant="body2">
            Forgot your password? no worries, just enter the email you used to
            sign up and we'll send you a link to reset your password
          </Typography>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              setIsSubmitting(true)
              resetPassword(data.email)
                .then((response) => {
                  if (response.status === 200) {
                    setDialogState((prevState) => ({
                      ...prevState,
                      showDialog: true,
                      dialogMessage: `An email has been sent to ${data.email} for password reset`,
                      isError: false,
                    }))
                  } else {
                    response.json().then((e) => {
                      setDialogState((prevState) => ({
                        ...prevState,
                        showDialog: true,
                        dialogMessage:
                          "Something isn't right. . Try again later",
                        isError: true,
                      }))
                    })
                  }
                  setIsSubmitting(false)
                })
                .catch((e) => {
                  alert("Something isn't right. . Try again later.")
                  setDialogState((prevState) => ({
                    ...prevState,
                    showDialog: true,
                    dialogMessage: "Something isn't right. . Try again later",
                    isError: true,
                  }))
                })
            }}
          >
            {() => (
              <Form className={classes.form} noValidate>
                <CustomTextField label="Email Address" name="email" />
                <Button
                  type="submit"
                  style={{
                    margin: theme.spacing(0, 0, 0),
                    background: "#ffcf10",
                    border: 0,
                    borderRadius: 3,
                    color: "white",
                    height: 35,
                    padding: "0 30px",
                  }}
                >
                  {isSubmitting ? "Loading..." : "Send password reset link"}
                </Button>
                <Dialog
                  open={dialogState.showDialog}
                  onClose={dialogState.showDialog}
                  onBackdropClick={() => {
                    setDialogState((prevState) => ({
                      ...prevState,
                      showDialog: false,
                    }))
                  }}
                >
                  <Alert severity={dialogState.isError ? "error" : "success"}>
                    {dialogState.dialogMessage}
                  </Alert>
                  <DialogActions>
                    <Button
                      className={buttonClass.button}
                      onClick={() => {
                        setDialogState((prevState) => ({
                          ...prevState,
                          showDialog: false,
                        }))
                      }}
                      color="primary"
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </MuiThemeProvider>
  )
}

export default ResetPasswordPage
