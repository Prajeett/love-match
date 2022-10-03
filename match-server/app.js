import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import messageRouter from "./routes/messageRoutes";
import router from "./routes/user-routes";
import userChoiceRouter from "./routes/user-choice-routes";
import cors from "cors";
import { Server } from "socket.io";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.use("/api/userchoice", userChoiceRouter);
app.use("/api/message", messageRouter);

  const server = app.listen(process.env.PORT, () =>
        console.log(`Server started on ${process.env.PORT}`)
    );  

  mongoose
  .connect(
    `${process.env.DB_URL}`
  )
  .then(() =>
    console.log("Connected to Database")
  )
  .catch((err) => console.log(err));






