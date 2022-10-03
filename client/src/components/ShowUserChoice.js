import React, { useEffect, useState } from "react";
import axios from "axios";
import UserChoice from "./UserChoice";

const ShowUserChoice = () => {

  const [userChoices, setUserChoices] = useState();
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/userchoice/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUserChoices(data.userChoices));
    sendRequest().then((data) => setUser(data.user));
  }, []);

  console.log(userChoices);
  
  return (
    <div>
      {" "}
      {user && user.userChoice &&
        user.userChoice.map((userChoice, index) => (
          <UserChoice
            id={userChoice._id}
            isUser={localStorage.getItem("userId") === userChoice.user._id}
            movie={userChoice.movie}
            sport={userChoice.sport}
            cuisine={userChoice.cuisine}
            smoke={userChoice.smoke}
            drink={userChoice.drink}
            userName={user.name}
            chatCode={userChoice.chatCode}
          />
        ))}
    </div>
  );
};

export default ShowUserChoice;
