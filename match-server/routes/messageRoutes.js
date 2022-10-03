import { addMessage, getMessages } from "../controllers/messageController";
import express from "express";
const messageRouter = express.Router();

messageRouter.post("/addmsg/", addMessage);
messageRouter.post("/getmsg/", getMessages);

export default messageRouter;
