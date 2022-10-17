import { Avatar } from '@mui/material';
import React from 'react'
import styled from 'styled-components';

function Message({message, timestamp, user, userImage}) {
  
 
  return (
    <MessageContainer>
      <Avatar className='img_Message' src={userImage} alt="" >{user[0]}</Avatar>
      <MessageInfo>
        <h4>
            {user} {' '}
            <span>
                {new Date(timestamp?.toDate()).toUTCString()}
            </span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  )
}

export default Message

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    > .img_Message {
        height: 50px;
        border-radius: 8px;
    }
`;

const MessageInfo = styled.div`
    padding-left: 10px;

    > h4 > span {
        color: gray;
        font-weight: 400;
        margin-left: 4px;
        font-size: 12px;
    }
`;