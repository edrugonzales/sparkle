import React, { useState } from "react"
import InfoDialog from "../../Dialogs/InfoDialog"
import { getUser } from "../../../services/auth"

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore = firebase.firestore();

const FABaddGC = ({
  session,
  ConnectyCube,
  handleDialogChange,
  handleMessageSend,
}) => {
  const theUser = getUser()
  const groupchatRef = firestore.collection('groupchat');

  return (
    <div className="floating-menu">
      <div
        onClick={async () => {

          const enteredName = prompt("Please enter your groupchat name")
          const params = {
            occupants_ids: [theUser.userId],
            creatorName: theUser.name,
            creatorId: theUser.userId,
            name: enteredName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            occupants_count: 1,
            last_message: 'placeholder last message'
          }
          if (enteredName) {
            const gcId = enteredName.replaceAll(' ', '-').concat('-',Math.floor(1000 + Math.random() * 9000).toString());
           await groupchatRef.doc(gcId).set(params); 
           const messagesRef = firestore.collection(gcId);
           await messagesRef.add({
            text: `Join me in ${enteredName} GC - ${window.location.origin}/?invite=${gcId}`,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: theUser.userId,
            username: theUser.name
           }); 
          
            await handleDialogChange({...params, id: gcId})
          }
        }}
        className="floating-menu-item"
      >
        <div className="floating-menu-icon">
          <span className="material-icons"> + </span>
        </div>

        
      </div>
    </div>
  )
}

export default FABaddGC