import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"

import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"
import VisibilityIcon from "@material-ui/icons/Visibility"
import SparkleLogo from "../assets/images/mascot_welcome_logo.png"
import CircularProgress from "@material-ui/core/CircularProgress"
import Alert from "@material-ui/lab/Alert"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { signIn } from "../api/public/auth"
import SecureLS from "secure-ls"
import { Formik, Form, useField } from "formik"
import * as yup from "yup"
import { Dialog, DialogActions, IconButton } from "@material-ui/core"
import { LoginState } from "./globalstates"
import { LazyLoadImage } from "react-lazy-load-image-component"
import InfoDialog from "./Dialogs/InfoDialog"
import { isLoggedIn } from "../services/auth"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Box } from "@mui/system"
import useLoggedUser from "../custom-hooks/useLoggedUser"
import { Stack } from "@mui/material"
import RegistrationPage from "./RegistrationPage"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "3em",
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    backgroundColor: "#FFCF10",
  },
  image: {
    height: "10em",
    width: "17em",
    marginBottom: "2em",
    marginLeft: "2.5rem",
  },
  container: {
    width: "340px",
  },
  textBox: {
    fontFamily: "visby",
    marginBottom: "0.2em",
    fontSize: "0.6em",
  },
  text: {
    marginTop: "0.2em",
    marginBottom: "0.3em",
    fontFamily: "visby",
    fontSize: "0.7em",
    paddingTop: "0.1em",
    paddingBottom: "0.1em ",
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

const LoginPage = ({
  hideLogo = false,
  showBackButton = false,
  overrideBackFunction = false,
  backFunction = () => {},
}) => {
  const [isLoggin, setisLoggin] = useContext(LoginState)

  const classes = useStyles()

  const buttonClass = buttonStyle()

  const { setUser } = useLoggedUser()

  const [isLoading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const [dialogState, setDialogState] = useState({
    showDialog: false,
    dialogMessage: "",
    isError: false,
  })

  const [showRegistration, setShowRegistration] = useState(false)

  useEffect(() => {
    setisLoggin(isLoggedIn())
  }, [])

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email"),
    password: yup.string(),
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
        className={classes.textBox}
      />
    )
  }

  return (
    <Box>
      {showRegistration && (
        <RegistrationPage
          overrideBackFunction={true}
          backFunction={() => {
            setShowRegistration(false)
          }}
        />
      )}
      {!showRegistration && (
        <Box>
          {showBackButton && (
            <Box marginTop={1} marginLeft={1}>
              <IconButton
                onClick={() => {
                  overrideBackFunction ? backFunction() : navigate(-1)
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>
          )}
          <Stack direction={"row"} justifyContent={"center"}>
            <Box
              maxWidth="300px"
              // eslint-disable-next-line react/jsx-no-duplicate-props
            >
              <div className={hideLogo ? classes.paper : ""}>
                {!hideLogo ? (
                  <Stack direction={"row"} justifyContent={"center"}>
                    <LazyLoadImage
                      src={SparkleLogo}
                      alt="sparkle-logo"
                      effect={"blur"}
                      width={"100%"}
                    />
                  </Stack>
                ) : (
                  <></>
                )}
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (data) => {
                    setLoading(true)

                    const ls = new SecureLS({ encodingType: "aes" })

                    signIn(data.email, data.password).then((response) => {
                      if (response.status === 200) {
                        response.json().then((e) => {
                          setLoading(false)

                          // ls.set("token", e.token)
                          // ls.set("userId", e.user._id)
                          // ls.set("email", e.user.email)
                          // ls.set("name", e.user.name)
                          // ls.set("phone", e.user.phone)
                          // ls.set("messenger", e.user.messenger)

                          setUser({ userData: e })

                          setDialogState((prevState) => ({
                            ...prevState,
                            showDialog: true,
                            dialogMessage: "Login success",
                            isError: false,
                          }))
                        })
                      } else {
                        setLoading(false)
                        response.json().then((e) => {
                          setLoading(false)
                          setDialogState((prevState) => ({
                            ...prevState,
                            showDialog: true,
                            dialogMessage: e.error,
                            isError: true,
                          }))
                        })
                      }
                    })
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={12}>
                          <CustomTextField label="Email" name="email" />
                        </Grid>
                      </Grid>
                      <Grid container spacing={1} alignItems="flex-end" margin>
                        <Grid item xs={12} className={classes.textBox}>
                          <CustomTextField
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
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
                      </Grid>
                      <Grid>
                        <Grid item xs={12} className={classes.text}>
                          Forgot password? {""}
                          <Link to="/reset" variant="body2">
                            Click here
                          </Link>
                        </Grid>
                      </Grid>
                      <InfoDialog
                        showDialog={dialogState.showDialog}
                        message={dialogState.dialogMessage}
                        onConfirm={() => {
                          setDialogState((prevState) => ({
                            ...prevState,
                            showDialog: false,
                          }))

                          if (dialogState.isError === false) {
                            setisLoggin(true)
                          }
                        }}
                      />

                      <Button
                        disabled={isLoading}
                        type="submit"
                        fullWidth
                        className={classes.submit}
                      >
                        {isLoading ? <CircularProgress /> : "Login"}
                      </Button>
                      <Grid>
                        <Grid item className={classes.text}>
                          Don't have an account yet? {""}
                          <Button
                            onClick={() => {
                              setShowRegistration(true)
                            }}
                            variant="body2"
                          >
                            Sign up here
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </div>
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default LoginPage
