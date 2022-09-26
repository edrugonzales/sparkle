let defaultError = {
  errors: [
    {
      code: "parameter_data_type_invalid",
      detail: "cvc should be a string.",
      source: {
        pointer: "cvc",
        attribute: "cvc",
      },
    },
    {
      code: "parameter_invalid",
      detail: "The card is already expired.",
      source: {
        pointer: "exp_month",
        attribute: "exp_month",
      },
    },
    {
      code: "parameter_format_invalid",
      detail: "number format is invalid.",
      source: {
        pointer: "number",
        attribute: "number",
      },
    },
  ],
}

/**
 * This function will accept standard error response from paymongo and return a human readable string
 */
export default function paymongoErrorHandler({ errorData }) {
  const paymongoSubCodeInterpretter = ({ errorObj }) => {
    switch (errorObj?.sub_code) {
      case "generic_decline":
        return "Card has been declined \n"
      case "card_expired":
        return `${errorObj?.detail} \n`
      case "cvc_invalid":
        return `${errorObj?.detail} \n`
      case "fraudulent":
        return "Card has been declined \n"
      case "insufficient_funds":
        return `${errorObj?.detail} \n`
      case "processor_blocked":
        return "Card has been declined \n"
      case "lost_card":
        return "Card has been declined \n"
      case "stolen_card":
        return "Card has been declined \n"
      case "processor_unavailable":
        return `${errorObj?.detail} Wait for a few minutes before re-trying the transaction or try a different card. \n`
      case "blocked":
        return "Card has been declined \n"

      default:
        return JSON.stringify(errorObj)
    }
  }

  //This is the only way that we can determine that the error is a paymongo error
  //if error?.errors is not null then its a paymongo error
  if (errorData?.errors) {
    let compiledErrorString = ""

    for (let index = 0; index < errorData?.errors?.length; index++) {
      compiledErrorString = compiledErrorString.concat(
        paymongoSubCodeInterpretter({
          errorObj: errorData?.errors[index],
        })
      )
    }

    return compiledErrorString
  }

  //If error?.errors is null just return the error since its not a paymongo error
  return paymongoSubCodeInterpretter({ errorObj: errorData })
}
