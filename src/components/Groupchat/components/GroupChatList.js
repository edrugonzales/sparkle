import React from "react"
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import { Avatar, Conversation } from "@chatscope/chat-ui-kit-react"
import getUserName from "../functions/getUserName"
import { getUser } from "../../../services/auth"


import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"

import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/analytics"

firebase.initializeApp({
  // your config
  apiKey: "AIzaSyCHPf66G9keySdj7NU4kImm54l7aMvS__M",
  authDomain: "com-sparkle-sparkle.firebaseapp.com",
  databaseURL: "https://com-sparkle-sparkle.firebaseio.com",
  projectId: "com-sparkle-sparkle",
  storageBucket: "com-sparkle-sparkle.appspot.com",
  messagingSenderId: "614635418796",
  appId: "1:614635418796:web:8d1a182c2506b49f351b09",
  measurementId: "G-JRBMC81JS9",
})

const firestore = firebase.firestore()

const GroupChatList = ({
  groupChatList,
  usersFromServer,
  handleDialogChange,
}) => {
  let defaultChatGroup = {}

  const theUser = getUser()

  const groupchatsRef = firestore.collection("groupchat")
  const query = groupchatsRef.orderBy("createdAt").limit(1000)

  const [groupchats] = useCollectionData(query, { idField: "id" })

  return (
    <>
      {groupchats
        ?.filter((gcs) => gcs.occupants_ids.includes(theUser.userId))
        .map((value) => (
          <Conversation
            lastSenderName={value.lastSenderName}
            name={value.name}
            info={value.last_message ? value.last_message : "No messages yet"}
            onClick={() => {
              handleDialogChange(value)
            }}
            lastActivityTime={`${value.occupants_ids.length} members`}
            unreadCnt={value.unread_messages_count}
          >
            <Avatar
              src={`https://via.placeholder.com/150/3d9afc/fdc300?text=${value.name
                .split(" ")
                .map((x) => x[0])
                .join("")
                .toUpperCase()}`}
              name={value.name}
            />
          </Conversation>
        ))}
    </>
  )
}

export default GroupChatList
