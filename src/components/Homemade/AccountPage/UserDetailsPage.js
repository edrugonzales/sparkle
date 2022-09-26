import React, { useState, useEffect } from "react"

import Box from "@material-ui/core/Box"
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import Button from "@material-ui/core/Button"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import Divider from "@material-ui/core/Divider"
import PersonIcon from "@material-ui/icons/Person"
import PhoneIcon from "@material-ui/icons/Phone"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import Avatar from "@material-ui/core/Avatar"
import CameraAltIcon from "@material-ui/icons/CameraAlt"
import EditIcon from "@material-ui/icons/Edit"
import EmailIcon from "@material-ui/icons/Email"
import LinkIcon from "@material-ui/icons/Link"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { theme } from "../../../assets/mui"
import CircularProgress from "@material-ui/core/CircularProgress"
import useWindowDimensions from "../../../custom-hooks/useWindowDimensions"
import SparkWaving from "../../../assets/gif/mascot_wave_burstless.gif"
import Swal from "sweetalert"

import moment from "moment"
import { Link, navigate } from "gatsby"
import { getUserById, updatePicture } from "../../../api/public/user"
import { updatePhoto } from "../../../api/requests"
import useLoggedUser from "../../../custom-hooks/useLoggedUser"

const useStyles = makeStyles({
  backSize: {
    fontSize: "1.5em",
    color: "black",
  },
  button: {
    background: "#ffcf10",
    borderRadius: 3,
    color: "black",
    height: 35,
    padding: "0 30px",
    "&:hover": {
      backgroundColor: "#9C9C9C",
      color: "#fff",
    },
  },
  avatar: {
    height: "100px",
    width: "100px",
    background: "gray",
    borderRadius: "50%",
  },
  large: {
    height: "100px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  decoration: {
    textDecoration: "none",
  },
  camera: {
    border: "2px solid white",
    backgroundColor: "white",
    borderRadius: "15px",
  },
  listBackground: {
    backgroundColor: "#F2F7FD",
    marginLeft: "0.5em",
    marginRight: "0.5em",
    borderRadius: "0.2em",
    paddingLeft: "0.2em",
  },
  flex: {
    display: "flex",
    marginLeft: "1em",
    marginBottom: "0.2em",
  },
  title: {
    fontWeight: "bold",
    fontFamily: "visby",
  },
  body: {
    fontFamily: "visby",
    marginLeft: "1em",
  },
  img: {
    lineHeight: "90px",
    objectFit: "fill"
  },
  float: {
    position: "absolute",
    zIndex: 1,
  },
  centerFit: {
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "0 auto",
    display: "block",
  },
  icon: {
    color: "#448cf6",
    marginLeft: "0.1em",
    marginRight: "0.3em",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "white",
    height: "40%",
  },
  avatarImg:{
    height: "100%",
    width: "100%",
    objectFit: "cover"
  }
})

const UserDetailsPage = () => {
  const classes = useStyles()

  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    phone: "",
    address: "",
    birthdate: "",
    gender: "",
    messenger: "",
    photo: "",
    email: "",
  })
  const [open, setOpen] = useState(false)
  const [openPicture, setOpenPicture] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { height, width } = useWindowDimensions()
  const [picture, setPicture] = useState(null)
  const [imgData, setImgData] = useState(null)
  const [isRedirected, setIsRedirected] = useState(false)
  const [imageLink, setImageLink] = useState(null)

  const {getUser, setNewUserPhoto} = useLoggedUser()

  const {
    _id,
    name,
    phone,
    address,
    photo,
    gender,
    messenger,
    birthdate,
    email,
  } = userData

  const isMountedRef = React.useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => (isMountedRef.current = false)
  }, [])

  useEffect(() => {


    const user = getUser()

    
    //

    getUserById("/user/" + user.userId, user.token)
      .then((data) => {
        if (isMountedRef.current) {
          setUserData(data)
          setLoaded(true)
        }
      })
      .catch((error) => {})
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpenPicture = () => {
    setOpenPicture(true)
  }

  const handleClosePicture = () => {
    setOpenPicture(false)
  }

  const handleChangePicture = (name) => (e) => {
    setUserData({ ...userData, [name]: e.target.value })
  }

 
  const onChangePicture = (e) => {
    e.preventDefault()
    if (e.target.files[0]) {
      setPicture(URL.createObjectURL(e.target.files[0]))
      setImageLink(e.target.files[0])
    }
  }


  const clickSubmitPicture = (e) => {
    const users = getUser()

   if(imageLink){
    e.preventDefault()

    updatePicture(_id, users.token, imageLink).then((data) => {
      if (data?.photo) {
        console.log(data)
        setNewUserPhoto({userPhoto: data?.photo})
        Swal({
          text: "Your Photo has been updated",
          icon: SparkWaving,
        }).then(() => {
          setIsRedirected(true)
        })
      } else {
        Swal({
          title: "Photo updated failed.",
          text: "The server encountered an error.",
          icon: "error",
        })
      }
    })
   }else{
    Swal({
      title: "Photo update failed.",
      text: "Please select a picture.",
      icon: "error",
    })
   }
  }

  if (isRedirected) {
    navigate("/user")
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar elevation={0}>
        <Toolbar>
          <Link to="/food">
            <ArrowBackIcon className={classes.backSize} />
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div>
              <img
                src={photo}
                alt="User Profile"
                className={`${classes.centerFit}`}
              />
            </div>
          </Fade>
        </Modal>
      </div>
      {loaded ? (
        <>
          <div className={classes.center}>
            <label htmlFor="upload-photo">
              <div>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={openPicture}
                  onClose={handleClosePicture}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade
                    in={openPicture}
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    <Box className={classes.modal}>
                

                      <div style={{ paddingTop: "1.5em" }}></div>

                      <div style={{ textAlign: "center" }}>
                        <img
                          src={picture}
                          style={{
                            width: "100%",
                            height: "200px",
                            alignItems: "center",
                          }}
                        />
                        <input
                        type="file"
                        style={{ paddingTop: "20px" }}
                        onChange={onChangePicture}
                      />
                      </div>
                      <div style={{ paddingTop: "1.3rem" }}></div>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.button}
                        style={{ fontFamily: "visby" }}
                        onClick={clickSubmitPicture}
                      >
                        Upload
                      </Button>
                    </Box>
                  </Fade>
                </Modal>
              </div>
              <CameraAltIcon
                onClick={handleOpenPicture}
                className={` ${classes.camera} ${classes.float} `}
              />
            </label>
            <button
              onClick={handleOpen}
              style={{ border: "0", backgroundColor: "transparent" }}
            >
              <Avatar className={classes.avatar}>
                {photo ? (
                  <img
                    src={photo}
                    alt="User profile picture"
                    className={`${classes.avatarImg}`}
                    
                    onChange={handleChangePicture("photo")}
                  />
                ) : (
                  name?.charAt(0)
                )}
              </Avatar>
            </button>
          </div>
          <Box pt={2} mb={2}>
            <Typography variant="h5" className={classes.center}>
              {name}
            </Typography>
          </Box>
          <Box pt={1}>
            <Link to="/user/update" className={classes.decoration}>
              <div className={classes.center}>
                <EditIcon />
                <Box pl={1}>
                  <Typography>Update Account</Typography>
                </Box>
              </div>
            </Link>
          </Box>
          <Box pt={5} mb={2} mt={3}>
            <List className={classes.listBackground}>
              <div className={classes.flex}>
                <PersonIcon className={classes.icon} />
                <Box pl={1}>
                  <Typography variant="subtitle2" className={classes.title}>
                    User ID
                  </Typography>
                </Box>
              </div>
              <Box pt={0.5} pb={0.5} mb={0.3}>
                <Divider variant="middle" />
              </Box>
              <Typography variant="body2" className={classes.body}>
                {_id}
              </Typography>
            </List>
          </Box>
          <Box pt={1} mb={2}>
            <List className={classes.listBackground}>
              <div className={classes.flex}>
                <PhoneIcon className={classes.icon} />
                <Box pl={1}>
                  <Typography variant="subtitle2" className={classes.title}>
                    Phone
                  </Typography>
                </Box>
              </div>
              <Box pt={0.5} pb={0.5} mb={0.3}>
                <Divider variant="middle" />
              </Box>
              <Typography variant="body2" className={classes.body}>
                {phone}
              </Typography>
            </List>
          </Box>
          <Box pt={1} mb={2}>
            <List className={classes.listBackground}>
              <div className={classes.flex}>
                <LocationOnIcon className={classes.icon} />
                <Box pl={1}>
                  <Typography variant="subtitle2" className={classes.title}>
                    Address
                  </Typography>
                </Box>
              </div>
              <Box pt={0.5} pb={0.5} mb={0.3}>
                <Divider variant="middle" />
              </Box>
              <Typography variant="body2" className={classes.body}>
                {address}
              </Typography>
            </List>
          </Box>
          <Box pt={1} mb={2}>
            <List className={classes.listBackground}>
              <div className={classes.flex}>
                <CalendarTodayIcon className={classes.icon} />
                <Box pl={1}>
                  <Typography variant="subtitle2" className={classes.title}>
                    Birthday
                  </Typography>
                </Box>
              </div>
              <Box pt={0.5} pb={0.5} mb={0.3}>
                <Divider variant="middle" />
              </Box>
              <Typography variant="body2" className={classes.body}>
                {moment(birthdate).format("L")}
              </Typography>
            </List>
          </Box>
          <Box pt={1} mb={2}>
            <List className={classes.listBackground}>
              <div className={classes.flex}>
                <EmailIcon className={classes.icon} />
                <Box pl={1}>
                  <Typography variant="subtitle2" className={classes.title}>
                    Email
                  </Typography>
                </Box>
              </div>
              <Box pt={0.5} pb={0.5} mb={0.3}>
                <Divider variant="middle" />
              </Box>
              <Typography variant="body2" className={classes.body}>
                {email}
              </Typography>
            </List>
          </Box>
          <Box pt={1} mb={2}>
            <List className={classes.listBackground}>
              <div className={classes.flex}>
                <PersonIcon className={classes.icon} />
                <Box pl={1}>
                  <Typography variant="subtitle2" className={classes.title}>
                    Gender
                  </Typography>
                </Box>
              </div>
              <Box pt={0.5} pb={0.5} mb={0.3}>
                <Divider variant="middle" />
              </Box>
              <Typography variant="body2" className={classes.body}>
                {gender}
              </Typography>
            </List>
          </Box>
          <Box pt={1} mb={2}>
            <List className={classes.listBackground}>
              <div className={classes.flex}>
                <LinkIcon className={classes.icon} />
                <Box pl={1}>
                  <Typography variant="subtitle2" className={classes.title}>
                    Facebook Username
                  </Typography>
                </Box>
              </div>
              <Box pt={0.5} pb={0.5} mb={0.3}>
                <Divider variant="middle" />
              </Box>
              <Typography variant="body2" className={classes.body}>
                {!messenger ? "No messenger url" : messenger}
              </Typography>
            </List>
          </Box>
        </>
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
    </MuiThemeProvider>
  )
}

export default UserDetailsPage
