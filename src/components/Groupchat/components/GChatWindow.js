import React, { useRef, useState, useContext, useEffect } from "react"

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  MessageGroup,
  ConversationHeader,
  InfoButton,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react"

import { LoginState } from "../../globalstates"
import { getUser } from "../../../services/auth"

import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/analytics"

import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"

// firebase.initializeApp({
//   // your config
//   apiKey: "AIzaSyCHPf66G9keySdj7NU4kImm54l7aMvS__M",
//   authDomain: "com-sparkle-sparkle.firebaseapp.com",
//   databaseURL: "https://com-sparkle-sparkle.firebaseio.com",
//   projectId: "com-sparkle-sparkle",
//   storageBucket: "com-sparkle-sparkle.appspot.com",
//   messagingSenderId: "614635418796",
//   appId: "1:614635418796:web:8d1a182c2506b49f351b09",
//   measurementId: "G-JRBMC81JS9"
// })

const firestore = firebase.firestore()
// const analytics = firebase.analytics();

function ChatRoom({
  // auth,
  handleChangeMessage,
  currentDialog,
  handleMessageSend,
  setCurrentDialog,
}) {
  const dummy = useRef()
  const messagesRef = firestore.collection(currentDialog.id)
  const query = messagesRef.orderBy("createdAt").limit(1000)

  const [messages] = useCollectionData(query, { idField: "id" })

  const [formValue, setFormValue] = useState("")
  const [thisIsNowGC, setThisIsNowGC] = useState()

  const theUser = getUser()

  useEffect(() => {
    if (currentDialog.initiated) {
      setThisIsNowGC(currentDialog)
    } else {
      setThisIsNowGC({
        ...currentDialog,
        initiated: false,
        initiator: {
          userId: "",
          username: "",
        },
      })
    }
  }, [])

  const auth = {
    currentUser: {
      uid: theUser.userId,
      photoURL:
        "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
      username: theUser.name,
    },
  }

  const user = {
    currentUser: {
      uid: theUser.userId,
      photoURL:
        "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
      username: theUser.name,
    },
  }

  const initiateAnOrder = async () => {
    const gcDocRef = firestore.doc(`groupchat/${currentDialog.id}`)
    const gcSnap = await gcDocRef.get()
    let gcData = gcSnap.data()
    if (gcData.initiator && gcData.initiator.userId) {
      if (gcData.initiator.userId == theUser.userId) {
        if (window.confirm("You are currentlly initiating an order, stop?")) {
          updateOrderInitiate("closed his/her order", "end")
          let gcDocRef = firestore.doc(`groupchat/${currentDialog.id}`)
          let gcSnap = await gcDocRef.update({
            initiator: {},
            initiated: false,
          })
          //update currentDialog
          setThisIsNowGC({ ...thisIsNowGC, initiator: {}, initiated: false })
        }
      } else {
        alert(`${gcData.initiator.name} is currently sharing an order.`)
      }
    } else {
      updateOrderInitiate("initiated an order", "start")
      const gcDocRef1 = firestore.doc(`groupchat/${currentDialog.id}`)
      const gcSnap1 = await gcDocRef1.update({
        initiator: theUser,
        initiated: true,
      })
      //update currentDialog
      setThisIsNowGC({ ...thisIsNowGC, initiator: theUser, initiated: true })
    }
    // check if initiator is empty
    //  Create
    // when initiator has something
    //  Check if you are initiator
    //    if yes
    //        stop initiate
    //    else
    //      alert that name - is initatiator

    // // sendMessage('I initiated an order - for <address> - Click here')
    // const gcDocRef = firestore.doc(`groupchat/${currentDialog.id}`);
    //  const gcSnap = await gcDocRef.update({initiator: theUser})
    //  let gcBaby = gcSnap.data();
    //
    // alert('initiated an order')
  }

  const checkCart = async () => {
    const cartRef = firestore.collection(`groupchat/${currentDialog.id}/cart`)
    const groupchatdoc = cartRef.where("isApproved", "==", true)

    const snap = await groupchatdoc.get()
    let stringBaby = ""
    let increment = 1
    let sasda = await snap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // match if this user is initiating if yes send doc id and add orders on the array
      // get user
      // match with doc.id
      // add product via

      let gcData = doc.data()

      stringBaby = stringBaby.concat(` ${gcData.name} x${gcData.id}`)

      if (increment == snap.size) {
        alert(stringBaby)
      }
      increment++
    })
    //
    // alert(sasda)

    // check if initiator is empty
    //  Create
    // when initiator has something
    //  Check if you are initiator
    //    if yes
    //        stop initiate
    //    else
    //      alert that name - is initatiator

    // // sendMessage('I initiated an order - for <address> - Click here')
    // const gcDocRef = firestore.doc(`groupchat/${currentDialog.id}`);
    //  const gcSnap = await gcDocRef.update({initiator: theUser})
    //  let gcBaby = gcSnap.data();
    //
    // alert('initiated an order')
  }

  const sendMessage = async (textContent) => {
    // e.preventDefault();

    const { uid, photoURL, username } = auth.currentUser

    await messagesRef.add({
      text: textContent,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      username,
    })

    // setFormValue('');
    dummy.current.scrollIntoView({ behavior: "smooth" })
  }

  const updateOrderInitiate = async (textContent, oiStatus) => {
    // e.preventDefault();

    const { uid, photoURL, username } = auth.currentUser

    await messagesRef.add({
      text: textContent,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      username,
      orderInitiate: oiStatus,
    })

    // setFormValue('');
    dummy.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back onClick={handleChangeMessage} />

            <ConversationHeader.Content
              userName={currentDialog.name}
              info={`${currentDialog.occupants_ids.length} Members`}
            />

            <ConversationHeader.Actions>
              {/* <StarButton title="Add to favourites" /> */}
              {/* {thisIsNowGC?.initiated && (thisIsNowGC?.initiator?.userId == auth.currentUser.uid)?  <button onClick={initiateAnOrder}> Close Order</button>: thisIsNowGC?.initiated || (thisIsNowGC?.initiator?.userId == auth.currentUser.uid)?  <button onClick={checkCart}> Cart</button>: null   }  */}
              {}
              {/* {!thisIsNowGC?.initiated ?  <button onClick={initiateAnOrder}> Order</button>: null } */}
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList style={{ height: "30vh" }}>
            {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
            <span ref={dummy}></span>
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            attachButton={false}
            onSend={sendMessage}
            // value={formValue}
            // onChange={(e) => setFormValue(e.target.value)}
            autoFocus
          />
        </ChatContainer>
      </MainContainer>
    </>
  )
}

function getTime(dateSent) {
  //{getTime(message.date_sent)}
  const date = dateSent ? new Date(dateSent * 1000) : new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours > 9 ? hours : "0" + hours}:${
    minutes > 9 ? minutes : "0" + minutes
  }`
}

function ChatMessage(props) {
  const { text, uid, photoURL, createdAt, username, orderInitiate } =
    props.message
  const [isLoggin, setisLoggin] = useContext(LoginState)
  const theUser = getUser()
  const auth = {
    currentUser: {
      uid: theUser.userId,
      photoURL:
        "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
      name: theUser.name,
    },
  }
  const messageClass = uid === auth.currentUser.uid ? "outgoing" : "incoming"

  if (orderInitiate) {
    return (
      <>
        <MessageSeparator content={`${username}  ${text}`} />
      </>
    )
  } else {
    return (
      <>
        <MessageGroup
          direction={messageClass}
          sender={username}
          sentTime={getTime(createdAt)}
        >
          <Avatar
            src={`https://via.placeholder.com/150/3d9afc/FFFFFF?text=${username.charAt(
              0
            )}`}
            name={username}
          />
          <MessageGroup.Messages>
            <Message
              model={{
                message: text,
                sentTime: getTime(createdAt),
                sender: username,
              }}
              onClick={() => {
                alert(text)
                // navigator.clipboard.writeText('Copy this text to clipboard')
                // navigator.clipboard.writeText(text)
                // window.clipboardData.setData("Text", `${text}`)
              }}
            >
              <Message.Header sender={username} sentTime={getTime(createdAt)} />
            </Message>
          </MessageGroup.Messages>
        </MessageGroup>

        {/* <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div> */}
      </>
    )
  }
}

export default ChatRoom
