import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput';
import { selectRoomId } from '../features/appSlice';

import {useCollection, useDocument} from "react-firebase-hooks/firestore"  // need to write manually to fetch the message section
import { db } from '../firebase';
import Message from '../components/Message'

function Chat() {
  // used for bottom-effect message chat
  const chatRef = useRef(null); 

  const roomId = useSelector(selectRoomId);

  // roomDetails and roomMessages are fetching the room names from firestore
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  )
  const [roomMessages, loading] = useCollection(
    roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
  )

  // used for bottom-effect message chat
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
        behavior: "smooth"
    })
    // get the chatRef, and go to the current thing u r pointing at and scroll into the view  
  }, [roomId, loading])

//   console.log(roomDetails?.data())
//   console.log("This is room Message",roomMessages)

  return (
    <ChatContainer>
        {roomDetails && roomMessages && (
            <>
                <Header>
                    <HeaderLeft>
                        <h4><strong>#{roomDetails?.data().name}</strong></h4>
                        <StarBorderOutlinedIcon />
                    </HeaderLeft>

                    <HeaderRight>
                        <p>
                            <InfoOutlinedIcon /> Details
                        </p>
                    </HeaderRight>
                </Header>
                

                {/* List out the messages */}
                <ChatMessages>
                    {roomMessages?.docs.map((doc) => {
                        // destructuring the 'messages' section in firestore
                        const {message, timestamp, user, userImage} = doc.data();     // doc.data() - pulling apart from the 'messages' document
                        return (
                            <Message 
                                key={doc.id}
                                message={message}
                                timestamp={timestamp}
                                user={user}
                                userImage={userImage}
                            />
                        )
                    })}

                    {/* create a empty div to get the 'bottom-effect' once you send the message in ur chatroom */}
                    <ChatBottom  ref={chatRef} />
                </ChatMessages>
            
                {/* Creating component and passing props */}
                <ChatInput
                    chatRef = {chatRef}
                    channelName = {roomDetails?.data().name}
                    channelId = {roomId}
                />
            
            </>
        )}
    </ChatContainer>
  )
}

export default Chat


const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;

`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    >h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root {
        margin-left: 20px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    
    > p {
        display: flex;
        align-items: center;
        font-style: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`;

const ChatMessages = styled.div`
`;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;