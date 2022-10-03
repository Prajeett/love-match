import React from 'react';
import { useState } from "react";
import Chat from "./Chat";
import "../chat.css";

const ChatHome = ({socket}) => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
          socket.emit("join_room", room);
          setShowChat(true);
        }
      };


  return (
    <div className="chatapp">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Chat !!</h3>
          <input
            type="text"
            placeholder="prajit..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="passcode"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  )
}

export default ChatHome;