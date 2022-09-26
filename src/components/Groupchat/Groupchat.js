import React, { useState, useEffect, useCallback, useContext } from "react"
import { getUser, isLoggedIn } from "../../services/auth"
import { Backdrop, CircularProgress } from "@material-ui/core"
import { ConversationList } from "@chatscope/chat-ui-kit-react"

import Login from "../LoginPage"
import LoginModal from "../LoginModal"
import ConnectyCube from "connectycube"
import { LoginState } from "../globalstates"
import GroupChatList from "./components/GroupChatList"
import GChatWindow from "./components/GChatWindow"
import FABaddGC from "./components/FABaddGC"
import GCLoadingIndicator from "./components/GCLoadingIndicator"
import ConfirmationDialog from "../Dialogs/ConfirmationDialog"
import InfoDialog from "../Dialogs/InfoDialog"

import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/analytics"

import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
const firestore = firebase.firestore()

const config = [
  {
    appId: 5055,
    authKey: "quRaVbQHdyLbVeF",
    authSecret: "w9fkrNxjMfydLw-",
  },
  {
    debug: {
      mode: 0,
    },
  },
  {
    chat: {
      streamManagement: {
        enable: true,
      },
    },
  },
]

const user = () => ({
  email: typeof window !== "undefined" ? getUser().email : null, //"a.domacena@sparkles.com.ph",
  password: "Password1", //const password
})

const Groupchat = () => {
  const [isMessage, setIsMessage] = useState(false)
  const [session, setSession] = useState({})
  const [isConnectedToChat, setIsConnectedToChat] = useState(false)
  const [showConfirmationDialog, setshowConfirmationDialog] = useState(false)
  const [backDropState, setbackDropState] = useState(false)
  const [dialogState, setDialogState] = useState({
    showDialog: false,
    dialogMessage: "",
    isError: false,
  })
  const [dialog, dialogSet] = useState([{}])
  const [messages, messagesSet] = useState(null)
  const [currentDialog, currentDialogSet] = useState({})
  const [usersFromServer, usersFromServerSet] = useState([])
  const [messageToBeSent, setMessageToBeSent] = useState("")
  const [inviteDetails, setInviteDetails] = useState({
    creatorName: "User",
    name: "GC Name",
    hasInvite: false,
  })

  const [isLoggin, setisLoggin] = useContext(LoginState)

  useEffect(async () => {
    const query =
      typeof window !== `undefined`
        ? new URLSearchParams(window.location.search)
        : ""
    const dialogIdInvite = query.get("invite")
    //

    if (dialogIdInvite) {
      const docRef = firestore.doc(`groupchat/${dialogIdInvite}`)
      const docSnap = await docRef.get()

      //
      // setInviteDetails(docSnap)
      if (docSnap.data().creatorName) {
        const invDeets = docSnap.data()

        setInviteDetails({ ...invDeets, id: dialogIdInvite })
      } else {
        // doc.data() will be undefined in this case
      }
      if (isLoggin) {
        whenInviteIsOnLink(dialogIdInvite)
      } else {
        //Show popout box with login and note the invitation
      }
    }
  }, [isLoggin])

  const fetchDialogsFromServer = useCallback(async () => {
    const dialogsFromServer = []
    // await ConnectyCube.chat.dialog.list()
    const currentUserId = session.id
    let privatChatIdsUser = []

    const dialogs = dialogsFromServer.items.map((elem) => {
      if (elem.type === 4) {
        elem.occupants_ids.forEach((elem) => {
          elem !== currentUserId.id && privatChatIdsUser.push(elem)
        })
      }
      return elem
    })

    // console.trace({dialogsFromServer})
    // console.trace({dialogs})
    dialogSet(dialogsFromServer)
  }, [])

  const whenInviteIsOnLink = useCallback(async (dialogID) => {
    setshowConfirmationDialog(true)
  }, [])

  const handleDialogChange = useCallback(async (newDialog) => {
    currentDialogSet(newDialog)
    setIsMessage(!isMessage)
    // getMessages(newDialog._id)
  })

  const handleMessageSend = useCallback(
    async (textContent, dialogId, xmpp_room_jid) => {
      const date = Math.floor(Date.now() / 1000)
      const message = {
        type: "groupchat",
        body: textContent,
        extension: {
          save_to_history: 1,
          dialog_id: currentDialog?._id ? currentDialog?._id : dialogId,
          sender_id: session.id,
          date_sent: date,
        },
        markable: 1,
      }

      message.id = ConnectyCube.chat.send(
        currentDialog?.xmpp_room_jid
          ? currentDialog?.xmpp_room_jid
          : xmpp_room_jid,
        message
      )

      // set up listeners
      ConnectyCube.chat.onMessageListener = onMessage
      ConnectyCube.chat.onSentMessageCallback = onSentMessageCallback
      ConnectyCube.chat.onDeliveredStatusListener = onDeliveredStatusListener
      ConnectyCube.chat.onReadStatusListener = onReadStatusListener

      function onMessage(userId, message) {
        if (currentDialog._id == message.dialog_id) {
          messagesSet((messages) => [
            ...messages,
            {
              sender_id: message.extension.sender_id,
              message: message.body,
              created_at: message.extension.date_sent,
            },
          ])
        }
        fetchDialogsFromServer()
      }

      function onSentMessageCallback(failedMessage, msg) {}

      function onDeliveredStatusListener(messageId, dialogId, userId) {}

      function onReadStatusListener(messageId, dialogId, userId) {}

      function sendReadStatus(messageId, userId, dialogId) {
        ConnectyCube.chat.sendReadStatus({ messageId, userId, dialogId })
      }

      function sendDeliveredStatus(messageId, userId, dialogId) {
        ConnectyCube.chat.sendDeliveredStatus({ messageId, userId, dialogId })
      }
    }
  )

  const handleChangeMessage = (event) => {
    currentDialogSet(null)
    messagesSet(null)
    setIsMessage(!isMessage)
  }

  const ProtoTypeChat = (props) => {
    const { isMessage } = props
    if (isMessage) {
      return (
        <>
          <GChatWindow
            handleChangeMessage={handleChangeMessage}
            handleMessageSend={handleMessageSend}
            currentDialog={currentDialog}
            messages={messages}
            usersFromServer={usersFromServer}
            session={session}
          />
        </>
      )
    }
    // if (isConnectedToChat && dialog)
    else {
      return (
        <>
          {/* List of groupchats */}
          <ConversationList
            loading={false}
            className="container-conversation"
            style={{ height: "35vh" }}
          >
            {dialog.length ? (
              <GroupChatList
                groupChatList={dialog}
                usersFromServer={usersFromServer}
                handleDialogChange={handleDialogChange}
              />
            ) : (
              <p>Create/Join a group chat</p>
            )}
          </ConversationList>
          {/* Floating menu */}
          <FABaddGC
            // session={session}
            // ConnectyCube={ConnectyCube}
            handleDialogChange={handleDialogChange}
            // handleMessageSend={handleMessageSend}
          />
        </>
      )
    }

    //Show loader while connecting
    // return <GCLoadingIndicator />
  }

  const ChatOrLogin = (props) => {
    let userLoggedIn = isLoggin
    const query =
      typeof window !== `undefined`
        ? new URLSearchParams(window.location.search)
        : ""
    const dialogIdInvite = query.get("invite")
    let result = userLoggedIn ? (
      <ProtoTypeChat isMessage={isMessage}> </ProtoTypeChat>
    ) : (
      <>
        {dialogIdInvite ? (
          <div>
            <p className="inviteDetails">{`${inviteDetails.creatorName} is inviting you to ${inviteDetails.name} group chat`}</p>
          </div>
        ) : (
          <></>
        )}
        <LoginModal />
      </>
    )
    return result
  }

  // function lastDate({ lastDate, lastMessage, updatedDate }) {
  //   //
  //   //              SAMPLE
  //   // <li onClick={() => this.goToChat(item)}>
  //   //       <div className="dialog-wrap-avatar">
  //   //         <Avatar photo={item.photo} name={item.name} size={50} />
  //   //       </div>
  //   //       <div className="dialog-wrap-block">
  //   //         <div className="dialog-wrap-block-left">
  //   //           <h5>{item.name}</h5>
  //   //           <span>{item.last_message === '' ? "No messages yet" : item.last_message}</span>
  //   //         </div>
  //   //         <div className="dialog-wrap-block-right">
  //   //           <p>{lastDate({
  //   //             lastDate: item.last_message_date_sent,
  //   //             lastMessage: item.last_message,
  //   //             updatedDate: item.updated_date,
  //   //           })}</p>
  //   //           {item.unread_messages_count > 0 &&
  //   //             <span>{item.unread_messages_count}</span>
  //   //           }
  //   //         </div>
  //   //       </div>
  //   //     </li>
  //   const monthes = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ]
  //   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  //   const msgLastDate = lastMessage
  //     ? new Date(lastDate * 1000)
  //     : new Date(updatedDate)
  //   const msgYear = msgLastDate.getFullYear()
  //   const msgMonth = msgLastDate.getMonth()
  //   const msgDate = msgLastDate.getDate()
  //   const msgDay = msgLastDate.getDay()
  //   const msgHours = msgLastDate.getHours()
  //   const msgMinutes = msgLastDate.getMinutes()
  //   const LastDate = new Date()
  //   const curYear = LastDate.getFullYear()
  //   const curMonth = LastDate.getMonth()
  //   const curDate = LastDate.getDate()
  //   const curDay = LastDate.getDay()

  //   if (curYear > msgYear) {
  //     return `${monthes[msgMonth]} ${msgDate}, ${msgYear}`
  //   } else if (curMonth > msgMonth) {
  //     return `${monthes[msgMonth]} ${msgDate}`
  //   } else if (curDate > msgDate + 6) {
  //     return `${monthes[msgMonth]} ${msgDate}`
  //   } else if (curDay > msgDay) {
  //     return `${days[msgDay]}`
  //   } else {
  //     return `${msgHours > 9 ? msgHours : "0" + msgHours}:${
  //       msgMinutes > 9 ? msgMinutes : "0" + msgMinutes
  //     }`
  //   }
  // }

  return (
    <div>
      <ChatOrLogin />
      <InfoDialog
        showDialog={dialogState.showDialog}
        message={dialogState.dialogMessage}
        onConfirm={() => {
          setDialogState((prevState) => ({
            ...prevState,
            showDialog: false,
          }))
        }}
      />
      <ConfirmationDialog
        showDialog={showConfirmationDialog}
        message={`Accept ${inviteDetails.creatorName}'s - ${inviteDetails.name} GC invitation?`}
        onConfirm={async () => {
          const docRef = firestore.doc(`groupchat/${inviteDetails.id}`)
          await docRef.update({
            occupants_ids: firebase.firestore.FieldValue.arrayUnion(
              getUser().userId
            ),
          })
          setshowConfirmationDialog(false)
        }}
        onDecline={() => {
          setshowConfirmationDialog(false)
          setbackDropState(false)
        }}
      />
      <Backdrop
        style={{ zIndex: 100 }}
        open={backDropState}
        // onClick={() => {
        //   setbackDropState()
        // }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Groupchat
