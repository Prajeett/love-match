import React from 'react';
import { useState } from "react";
import Chat from "./Chat";
import "../chat.css";

const MatchChatHome = ({socket}) => {

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
          <h3>Excited to chat ??</h3>
          <input
            type="hidden"
            placeholder="prajit..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="hidden"
            placeholder="passcode"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>LET ME IN PLEASE</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  )
}

export default MatchChatHome;