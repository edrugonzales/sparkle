import React, { useState } from "react"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"
import VisibilityIcon from "@material-ui/icons/Visibility"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Alert from "@material-ui/lab/Alert"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import { Form, Formik, useField } from "formik"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { Link, navigate } from "gatsby"
import * as yup from "yup"
import { signUp } from "../api/public/auth"
import {
  AppBar,
  CircularProgress,
  Dialog,
  DialogActions,
  IconButton,
  MuiThemeProvider,
  Toolbar,
} from "@material-ui/core"
import { theme } from "../assets/mui"
import PhoneTextfield from "./Textfields/PhoneTextfield"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#ffcf10",
    border: 0,
    borderRadius: 3,

    color: "black",
    height: 48,
    padding: "0 30px",
  },
}))

const buttonStyle = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0, 0, 0),
    background: "#ffcf10",
    border: 0,
    borderRadius: 3,
    color: "black",
    height: 35,
    padding: "0 30px",
  },
}))

const capitalize = (s) => {
  let word = s.toLowerCase()
  if (typeof word !== "string") return ""
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const validationSchema = yup.object({
  firstName: yup.string().max(50, "Too long"),
  lastName: yup.string().max(50, "Too long"),
  email: yup.string().email("Invalid email"),
  phone: yup.string().required(),
  password: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
})

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
      type={type}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      InputProps={InputProps}
    />
  )
}

export default function RegistrationPage({
  overrideBackFunction = false,
  backFunction = () => {},
}) {
  const classes = useStyles()

  const buttonClass = buttonStyle()

  const [showPassword, setShowPassword] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState("")

  const [state, setState] = useState({
    showAlert: false,
    isSubmitting: false,
    responseStatus: 200,
    responseMessage: "",
  })

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar elevation={0}>
        <Toolbar>
          <IconButton
            onClick={() => {
              overrideBackFunction ? backFunction() : navigate(-1)
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create your account
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              setState((prevState) => ({
                ...prevState,
                isSubmitting: true,
              }))

              const user = {
                role: 0,
                name:
                  capitalize(data.firstName) + " " + capitalize(data.lastName),
                email: data.email.toLowerCase(),
                phone: phoneNumber,
                password: data.password,
              }

              signUp(user)
                .then((response) => {
                  if (response.status === 200) {
                    setState((prevState) => ({
                      ...prevState,
                      showAlert: true,
                      responseMessage:
                        "Account created, please login again using the newly created credentials",
                      responseStatus: 200,
                    }))
                  } else {
                    response.json().then((e) => {
                      setState((prevState) => ({
                        ...prevState,
                        showAlert: true,
                        responseMessage: e.error,
                        responseStatus: 400,
                      }))
                    })
                  }
                  setState((prevState) => ({
                    ...prevState,
                    isSubmitting: false,
                  }))
                })
                .catch((err) => {
                  alert(err)
                  setState((prevState) => ({
                    ...prevState,
                    isSubmitting: false,
                  }))
                })
            }}
          >
            {({ isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomTextField
                      as={TextField}
                      autoComplete="fname"
                      name="firstName"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PhoneTextfield name="phone" required />
                  </Grid>
                  <Grid item xs={12}>
                    <p>
                      Password needs to be at least 8 characters long with
                      uppercase, lowercase letter and should also contain some
                      numbers
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => {
                              setShowPassword(!showPassword)
                            }}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => {
                              setShowPassword(!showPassword)
                            }}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {state.showAlert ? (
                      <Alert
                        severity={
                          state.responseStatus === 200 ? "success" : "error"
                        }
                      >
                        {state.responseMessage}
                      </Alert>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                </Grid>
                <Dialog
                  open={state.showAlert}
                  onClose={state.showAlert}
                  onBackdropClick={() => {
                    setState((prevState) => ({
                      ...prevState,
                      showAlert: false,
                    }))
                    if (state.responseStatus === 200) {
                      overrideBackFunction ? backFunction() : navigate(-1)
                    }
                  }}
                >
                  <Alert
                    severity={
                      state.responseStatus === 200 ? "success" : "error"
                    }
                  >
                    {state.responseMessage}
                  </Alert>
                  <DialogActions>
                    <Button
                      className={buttonClass.button}
                      onClick={() => {
                        setState((prevState) => ({
                          ...prevState,
                          showAlert: false,
                        }))
                        if (state.responseStatus === 200) {
                          overrideBackFunction ? backFunction() : navigate(-1)
                        }
                      }}
                      color="primary"
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  {state.isSubmitting ? <CircularProgress /> : "Register"}
                </Button>
                {/* <pre>{JSON.stringify(values)}</pre>
                <pre>{JSON.stringify(errors)}</pre> */}
              </Form>
            )}
          </Formik>
        </div>
        <Box sx={{ height: "10em" }} />
      </Container>
    </MuiThemeProvider>
  )
}
