import React from "react"
import { TextField } from "@mui/material"
import { useField } from "formik"
import MoneyInput from "@rschpdr/react-money-input";

const VortexCustomTextField = ({
  type,
  label,
  placeholder,
  inputProps,
  helperText,
  ...props
}) => {
  const [field, meta] = useField(props)
  const { value, name, onChange } = field
  const errorText = meta.error && meta.touched ? meta.error : ""
  const [amount, setAmount] = React.useState(0);

  function handleChange(e) {
    setAmount(e.target.value);
  }

  if (inputProps.datatype === "money") {
    return (
      <>
        <MoneyInput
          currencyConfig={
            {
              locale: "tl-PH",
              currencyCode: "PHP",
              currencyDisplay: "symbol",
              minimumFractionDigits: 2,
              useGrouping: true
            }}
          customInput={TextField}
          label={label}
          variant="outlined"
          required
          fullWidth
          error={!!errorText}
          // min={inputProps.min}
          // max={inputProps.max}
          inputProps={inputProps}
          helperText={`Minimum value: ${inputProps.minLength} - Format: ${helperText}`}
          placeholder={placeholder}
          onChange={handleChange}
          value={amount}
          {...field} />
      </>
    )
  }

  if (inputProps.datatype === "numeric") {

    return (
      <TextField
        label={label}
        variant="outlined"
        required
        fullWidth
        type={"text"}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={(e) => {
          const regex = /^[0-9\b]+$/;

          if (e.target.value === '' || regex.test(e.target.value)) {
            onChange(e)
          }

        }}
        helperText={helperText}
        error={!!errorText}
        inputProps={inputProps}
      />
    )
  }


  return (
    <TextField
      label={label}
      variant="outlined"
      required
      fullWidth
      type={type}
      placeholder={placeholder}
      {...field}
      helperText={helperText}
      error={!!errorText}
      inputProps={inputProps}
    />
  )

}

export default VortexCustomTextField
