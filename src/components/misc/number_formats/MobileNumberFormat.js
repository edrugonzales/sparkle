import React from "react"
import PropTypes from "prop-types"
import NumberFormat from "react-number-format"

const MobileNumberFormat = React.forwardRef(function MobileNumberFormat(
  props,
  ref
) {
  const { onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      format="### ### ###"
      // isNumericString
      isNumericString
    />
  )
})

MobileNumberFormat.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MobileNumberFormat
