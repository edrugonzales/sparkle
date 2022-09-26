import React from "react"
import PropTypes from "prop-types"
import NumberFormat from "react-number-format"

const CardNumberCVCFormat = React.forwardRef(function CardNumberCVCFormat(
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
      format="###"
      // isNumericString
    />
  )
})

CardNumberCVCFormat.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CardNumberCVCFormat
