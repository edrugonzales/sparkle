import React, { useContext, useEffect, useState } from "react"
import "./index.scss"

import InputBase from "@material-ui/core/InputBase"

import * as yup from "yup"

import Button from "@material-ui/core/Button"
import { Formik, Form, useField } from "formik"

import { CircularProgress } from "@material-ui/core"
import { signIn } from "../../api/public/auth"
import { isLoggedIn } from "../../services/auth"
import { LoginState } from "../globalstates"
import SecureLS from "secure-ls"

import InfoDialog from "../Dialogs/InfoDialog"
import useLoggedUser from "../../custom-hooks/useLoggedUser"

import { Link } from "gatsby"

const InputField = ({ type, label, placeholder, InputProps, ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ""



  useEffect(() => { }, [errorText])
  return (
    <div className="login-modal__input">
      {errorText.length > 0 && (
        <div className="login-modal__warning-message">{errorText}</div>
      )}
      <div
        className={`login-modal__input-text ${errorText.length && `login-modal__input-text--warning`
          }`}
      >
        <InputBase
          {...field}
          style={{
            width: "100%",
            fontFamily: "montserrat",
            fontSize: "1em",
            fontWeight: "500",
            color: "#6b6b6b",
            paddingLeft: "0.3em",
          }}
          placeholder={placeholder}
          type={type}
        />
      </div>
    </div>
  )
}

const LoginModal = () => {
  const [isLoggin, setIsLoggedIn] = useContext(LoginState)
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email"),
    password: yup.string(),
  })
  const { setUser } = useLoggedUser()
  const [isLoading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [dialogState, setDialogState] = useState({
    showDialog: false,
    dialogMessage: "",
    isError: false,
  })

  useEffect(() => {
    setIsLoggedIn(isLoggedIn())
  }, [])

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          setLoading(true)

          const ls = new SecureLS({ encodingType: "aes" })

          signIn(data.email, data.password).then((response) => {
            if (response.status === 200) {
              response.json().then((e) => {
                alert('success')
                setUser({ userData: e })
                setLoading(false)
                setDialogState((prevState) => ({
                  ...prevState,
                  showDialog: true,
                  dialogMessage: "Login success",
                  isError: false,
                }))
              })
            } else {
              alert('errror')
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
            <div className="login-modal">
              <h1 className="login-modal__header">Mabuhay!</h1>
              <InputField name="email" type="email" placeholder="Email" />
              <InputField
                name="password"
                type="password"
                placeholder="Password"
              />

              <div className="login-modal__forgot-password">
                Forgot password?
                <Link to="/reset">Click here</Link>
              </div>

              <Button type="submit" className="login-modal__submit">
                {isLoading ? <CircularProgress /> : "Login"}
              </Button>

              <div className="login-modal__sign-up">
                Don't have an account yet?
                <Link to="/reset">Sign up here</Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <InfoDialog
        showDialog={dialogState.showDialog}
        message={dialogState.dialogMessage}
        onConfirm={() => {
          setDialogState((prevState) => ({
            ...prevState,
            showDialog: false,
          }))

          if (dialogState.isError === false) {
            setIsLoggedIn(true)
          }
        }}
      /> </>
  )
}

export default LoginModal
