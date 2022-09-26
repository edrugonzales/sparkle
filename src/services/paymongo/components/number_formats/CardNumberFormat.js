import React from "react"
import PropTypes from "prop-types"
import NumberFormat from "react-number-format"

const CardNumberFormat = React.forwardRef(function CardNumberFormat(
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
      format="#### #### #### ####"
      // isNumericString
    />
  )
})

CardNumberFormat.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CardNumberFormat
