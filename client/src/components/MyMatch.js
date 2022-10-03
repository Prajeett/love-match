import React, { useEffect, useState } from "react";
import axios from "axios";
import UserChoiceMatch from "./UserChoiceMatch";

const MyMatch = () => {

  const [userChoices, setUserChoices] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/userchoice/showmymatch/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUserChoices(data.userChoices));
  }, []);

  console.log(userChoices);
  
  return (
    <div>
      {userChoices &&
        userChoices.map((userChoice, index) => (
          <UserChoiceMatch
            id={userChoice._id}
            isUser={localStorage.getItem("userId") === userChoice.user._id}
            matchScore={userChoice.matchScore}
            chatCode={userChoice.chatCode}
            movie={userChoice.movie}
            sport={userChoice.sport}
            cuisine={userChoice.cuisine}
            smoke={userChoice.smoke}
            drink={userChoice.drink}
            userName={userChoice.user.name}
          />
        ))}
    </div>
  );
};

export default MyMatch;
