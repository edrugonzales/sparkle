require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY),
  headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST",
  }

exports.handler = async (event, context) => {
  if (!event.body || event.httpMethod !== "POST") {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "invalid http method",
      }),
    }
  }

  const data = JSON.parse(event.body)
  //

  if (!data.stripeToken || !data.stripeAmt || !data.stripeIdempotency) {
    console.error("Required information is missing.")

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "missing information",
      }),
    }
  }

  // stripe payment processing begins here
  try {
    await stripe.customers
      .create({
        email: data.stripeEmail,
        source: data.stripeToken,
      })
      .then((customer) => {
        //
        return stripe.charges
          .create(
            {
              currency: "usd",
              amount: data.stripeAmt,
              receipt_email: data.stripeEmail,
              customer: customer.id,
              description: "Sample Charge",
            },
            {
              idempotencyKey: data.stripeIdempotency,
            }
          )
          .then((result) => {
            //
          })
      })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "it works! beep boop",
      }),
    }
  } catch (err) {
    //

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: err,
      }),
    }
  }
}
