import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import { Button, Dialog } from "@material-ui/core"
import { TextField } from "@material-ui/core"

const buttonStyle = makeStyles((theme) => ({
  regularButton: {
    fontFamily: "visby",
    fontWeight: "bold",
    width: "100%",
    margin: "5px",
    background: "#ffcf10",
    border: 0,
    borderRadius: 10,
    color: "gray",
    height: 60,
    padding: "0 30px",
  },
  outlinedButton: {
    fontFamily: "visby",
    fontWeight: "bold",
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
}))

const SpecialNotesDialog = ({ showDialog, onConfirm, onCancel }) => {
  const buttonClass = buttonStyle()

  const [notes, setnotes] = useState("")

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
              margin: "10px",
            }}
          >
            <span>
              <NoteAddIcon />
            </span>
            <span className={buttonClass.header}>Special instructions</span>
          </div>
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Type something..."
              multiline
              rows={5}
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setnotes(e.target.value)
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <Button
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
                onConfirm(notes)
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

export default SpecialNotesDialog
