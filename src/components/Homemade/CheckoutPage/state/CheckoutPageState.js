import React, { useState } from "react"

export const CheckoutWhenState = React.createContext(
  new Date(new Date().getTime() + 45 * 60000)
)

export const CheckoutNotesState = React.createContext("")

export const CheckCourierState = React.createContext("")

export const CheckoutVoucherState = React.createContext("")

export const CheckoutPaymentMethodState = React.createContext("COD")

export const CheckoutTotalAmount = React.createContext(0.0)

export const CheckoutDeliveryFee = React.createContext(0.0)

export const CheckoutDeliveryFeeDiscount = React.createContext(0.0)

export const CheckoutDiscount = React.createContext(0.0)

const CheckoutPageState = ({ children }) => {
  const [when, setwhen] = useState(new Date(new Date().getTime() + 45 * 60000))

  const [notes, setNotes] = useState("")

  const [courier, setCourier] = useState("")

  const [voucher, setvoucher] = useState("")

  const [paymentMethod, setpaymentMethod] = useState("COD")

  const [totalAmount, setTotalAmount] = useState(0.0)

  const [deliveryFee, setdeliveryFee] = useState(0.0)

  const [deliveryFeeDiscount, setDeliveryFeeDiscount] = useState(0)

  const [discount, setDiscount] = useState(0)

  return (
    <CheckoutWhenState.Provider value={[when, setwhen]}>
      <CheckoutNotesState.Provider value={[notes, setNotes]}>
        <CheckoutVoucherState.Provider value={[voucher, setvoucher]}>
          <CheckCourierState.Provider value={[courier, setCourier]}>
            <CheckoutPaymentMethodState.Provider
              value={[paymentMethod, setpaymentMethod]}
            >
              <CheckoutTotalAmount.Provider
                value={[totalAmount, setTotalAmount]}
              >
                <CheckoutDeliveryFee.Provider
                  value={[deliveryFee, setdeliveryFee]}
                >
                  <CheckoutDeliveryFeeDiscount.Provider
                    value={[deliveryFeeDiscount, setDeliveryFeeDiscount]}
                  >
                    <CheckoutDiscount.Provider value={[discount, setDiscount]}>
                      {children}
                    </CheckoutDiscount.Provider>
                  </CheckoutDeliveryFeeDiscount.Provider>
                </CheckoutDeliveryFee.Provider>
              </CheckoutTotalAmount.Provider>
            </CheckoutPaymentMethodState.Provider>
          </CheckCourierState.Provider>
        </CheckoutVoucherState.Provider>
      </CheckoutNotesState.Provider>
    </CheckoutWhenState.Provider>
  )
}

export default CheckoutPageState
