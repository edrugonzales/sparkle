import React from "react"
import { TextField } from "@mui/material"
import { useField } from "formik"

const PaymongoCustomTextField = ({
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

export default PaymongoCustomTextField
