import {
    Avatar, Box, Card, CardContent,
    CardHeader,
    Typography
  } from "@mui/material";
  import Button from '@mui/material/Button';
  import LiveTvSharpIcon from '@mui/icons-material/LiveTvSharp';
  import SportsSoccerSharpIcon from '@mui/icons-material/SportsSoccerSharp';
  import LiquorSharpIcon from '@mui/icons-material/LiquorSharp';
  import VapeFreeSharpIcon from '@mui/icons-material/VapeFreeSharp';
  import FastfoodSharpIcon from '@mui/icons-material/FastfoodSharp';
  import { useState } from "react";
  import Chat from "./Chat";
  import io from "socket.io-client";

  import React from "react";
  import { useStyles } from "./utils";

  const socket = io.connect("http://localhost:3001");

  const UserChoiceMatch = ({ chatCode, matchScore, movie, sport, cuisine, smoke, drink, userName, isUser, id }) => {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [showBox, setShowBox] = useState(false);

    const joinRoom = () => {

      console.log("Join Room Clicked")
      console.log(chatCode)

      setRoom(chatCode);
      setUsername(userName);
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
    };

    const leaveRoom = () => {
      setShowChat(false);
      setShowBox(true);
    };
    
    return (
      <div>
         {
          !showBox ? ( 
          <Card
            sx={{
            width: "30%",
            margin: "auto",
            mt: 1,
            padding: 2,
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          {isUser && (
            <Box display="flex" >
            
            </Box>
          )}
         <div >
          <CardHeader
              avatar={
                <Avatar
                  className={classes.font}
                  sx={{ bgcolor: "red" }}
                  aria-label="recipe"
                >
                  {matchScore}
                </Avatar>
              }
              title={userName}
            />
         </div>
          
  
          <CardContent>
            <hr />
            <br />
            {
              !showChat ? 
              (
                <div className="chat-option">
              <Typography
                className={classes.font}
                variant="body2"
                color="text.secondary"
              >
                <Button variant="contained" endIcon={<LiveTvSharpIcon />}> </Button> {": "} <Button variant="contained" color="success">{movie}</Button> <br/>
                <br/>
                <Button variant="contained" endIcon={<SportsSoccerSharpIcon />}> </Button> {": "} <Button variant="contained" color="success">{sport}</Button><br/>
                <br/>
                <Button variant="contained" endIcon={<FastfoodSharpIcon />}> </Button> {": "} <Button variant="contained" color="success">{cuisine}</Button><br/><br/>
                <Button variant="contained" endIcon={<VapeFreeSharpIcon />}> </Button> {": "} <Button variant="contained" color="success">{smoke}</Button><br/><br/>
                <Button variant="contained" endIcon={<LiquorSharpIcon />}> </Button> {": "} <Button variant="contained" color="success">{drink}</Button><br/><br/>
                <Button variant="contained" color="error" onClick={joinRoom}>Lets Chat</Button>
              </Typography>
            </div>
              ) : (
                <Chat socket={socket} username={username} room={room} />
              )
            }
        
          </CardContent>
          
        </Card>
          ) : 
          (
            <Button variant="contained" color="error" onClick={leaveRoom}>Finish Chat</Button>
          )
        }
      </div>
    );
  };
  
  export default UserChoiceMatch;
  