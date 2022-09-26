import React, { useState, useEffect } from "react"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import Typography from "@material-ui/core/Typography"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Swal from "sweetalert"
import SparkWaving from "../../../assets/gif/mascot_wave_burstless.gif"
import CircularProgress from "@material-ui/core/CircularProgress"
import useWindowDimensions from "../../../custom-hooks/useWindowDimensions"

import { Link, navigate } from "gatsby"
import { getUserById, updateUser } from "../../../api/public/user"
import { getUser } from "../../../services/auth/"
import moment from "moment"
import { AppBar, IconButton, Toolbar } from "@material-ui/core"
import { theme } from "../../../assets/mui"

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontFamily: "visby",
  },
  submit: {
    backgroundColor: "#3E86F6",
    borderRadius: "90px",
    fontFamily: "visby",
    fontWeight: "bold",
  },
  width: {
    width: "326px",
  },
  container: {
    width: "340px",
  },
  headerText: {
    fontFamily: "visby",
    fontWeight: "bold",
  },
  header: {
    paddingTop: "0.5em",
  },
  textField: {
    fontFamily: "visby",
  },
}))

const UpdateAccountPage = () => {
  const classes = useStyles()

  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    phone: "",
    address: "",
    birthdate: "",
    gender: "",
    messenger: "",
  })

  const [isRedirected, setIsRedirected] = useState(false)
  const { height, width } = useWindowDimensions()
  const [loaded, setLoaded] = useState(false)

  const { _id, name, phone, address, birthdate, gender, messenger } = userData

  const isMountedRef = React.useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => (isMountedRef.current = false)
  }, [])

  useEffect(() => {
    const user = getUser()

    getUserById("/user/" + user.userId, user.token)
      .then((data) => {
        if (isMountedRef.current) {
          setUserData(data)
          setLoaded(true)
        }
      })
      .then((error) => {})
  }, [])

  const handleChange = (name) => (e) => {
    setUserData({ ...userData, [name]: e.target.value })
  }

  const handleDateChange = (newDateString) => {
    setUserData({
      ...userData,
      birthdate: new Date(newDateString).toISOString(),
    })
  }

  const clickSubmit = (e) => {
    const users = getUser()
    e.preventDefault()

    updateUser(_id, users.token, userData).then((data) => {
      if (data) {
        Swal({
          text: "Your information has been updated",
          icon: SparkWaving,
        }).then(() => {
          setIsRedirected(true)
        })
      } else {
        Swal({
          title: "User updated failed.",
          text: "The server encountered an error.",
          icon: "error",
        })
      }
    })
  }

  if (isRedirected) {
    window.location.href = "/user"
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.header}>
        <AppBar elevation={0}>
          <Toolbar>
            <IconButton
              onClick={() => {
                navigate("/user")
              }}
            >
              <ChevronLeftIcon className={classes.backSize} />
            </IconButton>
            <Typography variant="h6" className={classes.headerText}>
              Edit Account Details
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {loaded ? (
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Name"
                  value={name}
                  onChange={handleChange("name")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Phone"
                  value={phone}
                  onChange={handleChange("phone")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Birthday"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  type="date"
                  value={moment(birthdate).format("YYYY-MM-DD")}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Address"
                  value={address}
                  onChange={handleChange("address")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Facebook Username"
                  value={!messenger ? "Add Facebook messenger URL" : messenger}
                  onChange={handleChange("messenger")}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <InputLabel shrink>Gender</InputLabel>
                  <Select
                    value={gender}
                    className={classes.width}
                    onChange={handleChange("gender")}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box pt={2}></Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={clickSubmit}
            >
              Save
            </Button>
          </form>
        ) : (
          <div
            style={{
              display: "flex",
              height: height,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        )}
      </Container>
    </MuiThemeProvider>
  )
}

export default UpdateAccountPage
