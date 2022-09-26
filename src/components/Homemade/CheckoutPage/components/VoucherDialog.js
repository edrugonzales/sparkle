import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import LocalActivityOutlinedIcon from "@material-ui/icons/LocalActivityOutlined"
import { Button, Dialog } from "@material-ui/core"
import { TextField } from "@material-ui/core"

const buttonStyle = makeStyles((theme) => ({
  regularButton: {
    width: "100%",
    margin: "5px",
    background: "#ffcf10",
    border: 0,
    borderRadius: 10,
    color: "black",
    height: 60,
    padding: "0 30px",
  },
  outlinedButton: {
    width: "100%",
    margin: "5px",
    border: "2px solid gray",
    color: "gray",
    borderRadius: 10,
    height: 60,
    padding: "0 30px",
  },
  header: {
    fontFamily: "visby",
    fontWeight: "bold",
    paddingBottom: "0.4em",
    marginLeft: "0.4em",
  },
  textBox: {
    fontFamily: "visby",
  },
}))

const VoucherDialog = ({ showDialog, onConfirm, onCancel }) => {
  const buttonClass = buttonStyle()

  const [voucher, setvoucher] = useState("")

  return (
    <div>
      <Dialog open={showDialog} onClose={showDialog} fullWidth onBackdropClick={() => {
                onCancel()
              }}>
        <div
          style={{
            display: "contents",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "5px",
            }}
          >
            <span>
              <LocalActivityOutlinedIcon />
            </span>
            <span className={buttonClass.header}>Voucher code</span>
          </div>
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Type voucher code here..."
              multiline
              rows={5}
              variant="outlined"
              fullWidth
              className={buttonClass.textBox}
              onChange={(e) => {
                setvoucher(e.target.value)
              }}
            />
          </div>
          <span
            style={{
              margin: "10px",
              textAlign: "center",
              fontFamily: "visby",
            }}
          >
            Voucher will be applied once order is accepted by the shop
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px",
            }}
          >
            <Button
              variant="outlined"
              className={buttonClass.outlinedButton}
              onClick={() => {
                onCancel()
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              className={buttonClass.regularButton}
              onClick={() => {
                onConfirm(voucher)
              }}
              color="primary"
            >
              Done
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default VoucherDialog
