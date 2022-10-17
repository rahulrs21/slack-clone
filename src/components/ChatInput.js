import { Button } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components';
import {auth, db} from '../firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({channelName, channelId, chatRef}) {
  const [input, setInput] = useState('');

  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();     // when we have 'form' and hit submit button on it, the page will refresh, so to prevent that we use this.

    if(!channelId) {
        return false;
    } 

    // This will create one more collection inside the collection, i.e 'messages'
    // so, firebase firestore database format like this -->  rooms->channelId(Channel Name)->messages->Data(All the message)
    db.collection('rooms').doc(channelId).collection('messages').add({
        message: input,   // useRef uses the current value and give it to message
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL
    });

    chatRef.current.scrollIntoView({
      behavior: "smooth",
    })

    // when u send the message, then u need to clear the text
    setInput('');
  }

  return (
    <ChatInputContainer>
      <form>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
        <Button hidden type='submit' onClick={sendMessage}>
            SEND
        </Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput


const ChatInputContainer = styled.div `
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > Button {
        display: none !important;
    }
`;