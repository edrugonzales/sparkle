import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Divider,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material"
import { Box } from "@mui/system"
import { Form, Formik } from "formik"

import * as yup from "yup"
import PaymongoCustomTextField from "../textfields/PaymongoCustomTextField"
import CardNumberFormat from "../number_formats/CardNumberFormat"
import CardNumberExpiryFormat from "../number_formats/CardNumberExpiryFormat"
import CardNumberCVCFormat from "../number_formats/CardNumberCVCFormat"
import MobileNumberFormat from "../../../../components/misc/number_formats/MobileNumberFormat"

const FormCard = ({ initialValues, onSubmit = () => {}, isLoading }) => {
  const [stepperIndex, setStepperIndex] = useState(0)

  const handleNext = () => {
    setStepperIndex(stepperIndex + 1)
  }

  const handleBack = () => {
    setStepperIndex(stepperIndex - 1)
  }

  const validationSchema = yup.object({
    cardNumber: yup
      .string()
      .length(16, "Invalid card number")
      .required("Required field"),
    cardExpiry: yup
      .string()
      .length(4, "Type month and year 01/29")
      .required("Required field"),
    cardCvc: yup
      .string()
      .length(3, "Found at the back of your card")
      .required("Required field"),
    name: yup.string().required("Required field"),
    email: yup.string().email("Invalid email").required("Required field"),
    phone: yup.string().required("Required field"),
    addLine1: yup.string().required("Required field"),
    addLine2: yup.string().required("Required field"),
    addCity: yup.string().required("Required field"),
    addState: yup.string().required("Required field"),
    addPostalCode: yup.string().required("Required field"),
    addCountry: yup
      .string()
      .length(2, "Country alpha 2 ISO code")
      .required("Required field")
      .uppercase(),
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (data) => {
        onSubmit(data)
      }}
      validationSchema={validationSchema}
    >
      {({ handleChange, values }) => {
        return (
          <Form>
            <Stack spacing={2}>
              <Stepper activeStep={stepperIndex} orientation="vertical">
                <Step key={0}>
                  <StepLabel>Card Details</StepLabel>
                  <StepContent>
                    <PaymongoCustomTextField
                      requireds
                      variant="standard"
                      name="cardNumber"
                      id="outlined-required"
                      label="Card Number"
                      value={values?.cardNumber}
                      onChange={handleChange}
                      InputProps={{
                        inputComponent: CardNumberFormat,
                      }}
                    />

                    <PaymongoCustomTextField
                      required
                      variant="standard"
                      name={"cardExpiry"}
                      id="outlined-required"
                      label="Expiry"
                      value={values?.cardExpiry}
                      onChange={handleChange}
                      InputProps={{
                        inputComponent: CardNumberExpiryFormat,
                      }}
                    />

                    <PaymongoCustomTextField
                      required
                      variant="standard"
                      name={"cardCvc"}
                      id="outlined-required"
                      label="CVC"
                      value={values?.cardCvc}
                      onChange={handleChange}
                      InputProps={{
                        inputComponent: CardNumberCVCFormat,
                      }}
                    />
                    <PaymongoCustomTextField
                      required
                      variant="standard"
                      id="outlined-required"
                      name={"name"}
                      label="Name on the card"
                      value={values?.name}
                      onChange={handleChange}
                    />
                    <Box sx={{ mb: 2 }}>
                      <div style={{ marginTop: "1em" }}>
                        <Button
                          style={{
                            width: "100px",
                            backgroundColor: "#0096FF",
                            color: "white",
                          }}
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 2, mr: 1 }}
                        >
                          Next
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
                <Step key={1}>
                  <StepLabel>Billing Address</StepLabel>
                  <StepContent>
                    <PaymongoCustomTextField
                      required
                      variant="standard"
                      name={"email"}
                      id="outlined-required"
                      label="Email"
                      value={values?.email}
                      onChange={handleChange}
                    />

                    <PaymongoCustomTextField
                      required
                      variant="standard"
                      name={"phone"}
                      id="outlined-required"
                      label="Phone"
                      placeholder={"63 999 999 9999"}
                      value={values?.phone}
                      onChange={handleChange}
                      InputProps={{
                        inputComponent: MobileNumberFormat,
                      }}
                    />

                    <PaymongoCustomTextField
                      required
                      variant="standard"
                      name={"addLine1"}
                      id="outlined-required"
                      label="Address Line 1"
                      value={values?.addLine1}
                      onChange={handleChange}
                    />

                    <PaymongoCustomTextField
                      required
                      variant="standard"
                      name={"addLine2"}
                      id="outlined-required"
                      label="Address Line 2"
                      value={values?.addLine2}
                      onChange={handleChange}
                    />

                    <PaymongoCustomTextField
                      required
                      variant="standard"
                      name={"addCity"}
                      id="outlined-required"
                      label="Address City"
                      value={values?.addCity}
                      onChange={handleChange}
                    />

                    <PaymongoCustomTextField
                      required
                      variant="standard"
                      name={"addState"}
                      id="outlined-required"
                      label="Address State"
                      value={values?.addState}
                      onChange={handleChange}
                    />

                    <PaymongoCustomTextField
                      required
                      variant="standard"
                      name={"addPostalCode"}
                      id="outlined-required"
                      label="Address Postal Code"
                      value={values?.addPostalCode}
                      onChange={handleChange}
                    />

                    <PaymongoCustomTextField
                      required
                      variant="standard"
                      name={"addCountry"}
                      id="outlined-required"
                      label="Address Country"
                      value={values?.addCountry}
                      onChange={handleChange}
                    />
                    <Box sx={{ mb: 2 }}>
                      <div style={{ marginTop: "1em" }}>
                        <Button
                          style={{
                            backgroundColor: "#0096FF",
                            color: "white",
                            padding: "0.5em",
                          }}
                          color="primary"
                          variant="contained"
                          disabled={isLoading}
                          type={"submit"}
                        >
                          {isLoading ? "Processing..." : "Continue"}
                        </Button>
                        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              </Stepper>

              <Divider />
            </Stack>
          </Form>
        )
      }}
    </Formik>
  )
}

FormCard.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

export default FormCard
