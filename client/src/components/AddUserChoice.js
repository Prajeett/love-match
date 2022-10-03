import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";

const labelStyles = { mb: 1, mt: 1, fontSize: "18px", fontWeight: "bold" };
const AddUserChoice = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    movie: "",
    sport: "",
    cuisine: "",
    smoke: "",
    drink: ""
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/userchoice/add", {
        movie: inputs.movie,
        sport: inputs.sport,
        cuisine: inputs.cuisine,
        smoke: inputs.smoke,
        drink: inputs.drink,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/showuserchoice"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"40%"}
        >
          <Typography
            className={classes.font}
            fontSize={20}
            fontWeight={"bold"}
            padding={1}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Tell us about yourself !!
          </Typography>

          <InputLabel className={classes.font} sx={labelStyles}>
            What type of movie you like ?
          </InputLabel>
          <TextField
            className={classes.font}
            name="movie"
            onChange={handleChange}
            value={inputs.movie}
            margin="auto"
            variant="outlined"
            placeholder="horror | romantic | action .."
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            What type of sports/games you like ?
          </InputLabel>
          <TextField
            className={classes.font}
            name="sport"
            onChange={handleChange}
            value={inputs.sport}
            margin="auto"
            variant="outlined"
            placeholder=" football | rugby | cricket .."
          />
          
          <InputLabel className={classes.font} sx={labelStyles}>
            What type of cuisine you like ?
          </InputLabel>
          <TextField
            className={classes.font}
            name="cuisine"
            onChange={handleChange}
            value={inputs.cuisine}
            placeholder="chinese | italian | indian .."
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Do you smoke ?
          </InputLabel>
          <TextField
            className={classes.font}
            name="smoke"
            onChange={handleChange}
            value={inputs.smoke}
            placeholder="yes | no ?"
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Do you drink ?
          </InputLabel>
          <TextField
            className={classes.font}
            name="drink"
            onChange={handleChange}
            value={inputs.drink}
            placeholder="yes | no ?"
            margin="auto"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddUserChoice;
