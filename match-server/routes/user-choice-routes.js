import express from "express";
import {
  getAllUserChoice,
  addUserChoice,
  getById,
  deleteUserChoice,
  getByUserId,
  getAllUserMatch
} from "../controllers/user-choice-controller";
const userChoiceRouter = express.Router();

userChoiceRouter.get("/show", getAllUserChoice);
userChoiceRouter.get("/showmymatch/:id", getAllUserMatch);
userChoiceRouter.post("/add", addUserChoice);
userChoiceRouter.get("/:id", getById);
userChoiceRouter.delete("/:id", deleteUserChoice);
userChoiceRouter.get("/user/:id", getByUserId);

export default userChoiceRouter;
