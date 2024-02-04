import React from 'react'
import LeftBar from '../../../components/leftBar/LeftBar'
import './Chat.css'

const Chat = () => {
  return (
    <div className='chat' style={{display:'flex'}}>
      <LeftBar/>
      <div className="chat-content">
        <div className="chat-header">
          <h3> U-Pick Up Support </h3>
        </div>
        <div className="message"></div>
      </div>
    </div>
  )
}

export default Chat
