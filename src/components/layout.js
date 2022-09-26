import React, { Component, useContext } from "react"
import Draggable, { DraggableCore } from "react-draggable"
import PropTypes, { func } from "prop-types"
import "./layout.scss"
import Bubble_container from "./Bubble_container"
import Zoom from "react-reveal/Zoom"

import { BackToTop } from "material-ui-back-to-top"

import DragHandleIcon from "@material-ui/icons/DragHandle"
import CloseIcon from "@material-ui/icons/Close"
import MinimizeIcon from "@material-ui/icons/Minimize"
import SparkHeadCircleV2 from "../assets/images/spark_head_with_circle_v2.png"
import { ShowBubbleContext } from "./globalstates"

function BubbleContainerMemo() {
  return <Bubble_container className="dont-drag-me" />
}

// function BubbleLogo() {
//   const [showBubbleState, setShowBubbleState] = useContext(ShowBubbleContext)
//   return (
//     <div
//       className="bubble-head"
//       style={{
//         position: "fixed",
//         bottom: "225px",
//         right: "10px",
//         zIndex: "990",
//         visibility: showBubbleState ? "visible" : "hidden",
//       }}
//     >
//       <img
//         src={SparkHeadCircleV2}
//         style={{ transition: "all 300ms ease-in-out", height: "70px" }}
//         className="br-100 pa1 ba b--black-10 h3 w3 bubble-head"
//         alt="chat head"
//       />
//     </div>
//   )
// }

const BubMemoComponent = React.memo(BubbleContainerMemo)

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0,
      },
      controlledPosition: {
        x: -400,
        y: 200,
      },
      startLocation: {},
      showOverlay: false,
    }
    this.handleClickBubble = this.handleClickBubble.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.onStart = this.onStart.bind(this)
    this.onStop = this.onStop.bind(this)
    this.adjustXPos = this.adjustXPos.bind(this)
    this.adjustYPos = this.adjustYPos.bind(this)
    this.onControlledDrag = this.onControlledDrag.bind(this)
    this.onControlledDragStop = this.onControlledDragStop.bind(this)

    const query =
      typeof window !== `undefined`
        ? new URLSearchParams(window.location.search)
        : ""
    const dialogIdInvite = query.get("invite")
    //

    if (dialogIdInvite) {
      this.state.showOverlay = true
    }
  }

  handleClickBubble() {
    this.setState({ showOverlay: !this.state.showOverlay })
  }

  handleDrag(e, ui) {
    const { x, y } = this.state.deltaPosition
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    })
  }

  onStart() {
    this.setState({
      //eslint-disable-next-line react/no-direct-mutation-state
      activeDrags: ++this.state.activeDrags,
      startLocation: this.state.deltaPosition,
    })
  }

  onStop() {
    //eslint-disable-next-line react/no-direct-mutation-state
    this.setState({ activeDrags: --this.state.activeDrags })

    if (this.state.deltaPosition === this.state.startLocation) {
      // handleClick(e);

      this.handleClickBubble()
    }
  }

  // For controlled component
  adjustXPos(e) {
    e.preventDefault()
    e.stopPropagation()
    const { x, y } = this.state.controlledPosition
    this.setState({ controlledPosition: { x: x - 10, y } })
  }

  adjustYPos(e) {
    e.preventDefault()
    e.stopPropagation()
    const { controlledPosition } = this.state
    const { x, y } = controlledPosition
    this.setState({ controlledPosition: { x, y: y - 10 } })
  }

  onControlledDrag(e, position) {
    const { x, y } = position
    this.setState({ controlledPosition: { x, y } })
  }

  onControlledDragStop(e, position) {
    this.onControlledDrag(e, position)
    this.onStop()
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { children, data } = this.props
    const dragHandlers = {
      onStart: this.onStart,
      onStop: this.onStop,
      onDrag: this.handleDrag,
    }
    // eslint-disable-next-line no-unused-vars
    //wip
    const { deltaPosition, controlledPosition } = this.state

    return (
      <div>
        <main>{children}</main>
        <BackToTop
          buttonPosition={{ bottom: 100, right: "46%" }}
          buttonShowDuration={100000}
          size={"small"}
          style={{ zIndex: "999" }}
        />
        <Draggable allowAnyClick="true" handle=".drag-handle" axis="y">
          {/* <Zoom right when={this.state.showOverlay}> */}
          <div
            className="overlay-bubble-feature"
            style={{
              position: "fixed",
              bottom: "0px",
              right: "0px",
              display: this.state.showOverlay ? "block" : "none",
              transform: this.state.showOverlay ? "scale(1)" : "scale(0)",
              zIndex: "990",
              backdropFilter: "blur(10px)",
            }}
          >
            <strong
              className="drag-handle-container"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span
                onClick={this.handleClickBubble}
                style={{
                  marginTop: "auto",
                  marginLeft: "9px",
                  paddingRight: "11%",
                }}
              >
                Chats
              </span>
              <DragHandleIcon
                className="drag-handle"
                style={{ cursor: "move" }}
              />
              <CloseIcon
                style={{ paddingLeft: "20%" }}
                onClick={this.handleClickBubble}
              />
            </strong>

            <BubMemoComponent />
          </div>
          {/* </Zoom> */}
        </Draggable>

        {/* <Zoom right when={!this.state.showOverlay}>   */}
        <Draggable {...dragHandlers} axis="y">
          <div
            className="bubble-head"
            style={{
              position: "fixed",
              bottom: "100px",
              right: "10px",
              zIndex: "990",
            }}
          >
            <img
              src={SparkHeadCircleV2}
              style={{ transition: "all 300ms ease-in-out", height: "70px" }}
              className="br-100 pa1 ba b--black-10 h3 w3 bubble-head"
              alt="chat head"
            />
          </div>
          {/* <BubbleLogo /> */}
        </Draggable>
        {/* </Zoom> */}

        <p className="version">version 1.0.0+0</p>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
