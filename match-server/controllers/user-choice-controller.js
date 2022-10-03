import mongoose from "mongoose";
import User from "../model/User";
import UserChoice from "../model/UserChoice";

export const getAllUserChoice = async (req, res, next) => {
  let userChoices;
  try {
    userChoices = await UserChoice.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!userChoices) {
    return res.status(404).json({ message: "No User Choice Found" });
  }
  return res.status(200).json({ userChoices });
};

export const addUserChoice = async (req, res, next) => {
  const { movie, sport, cuisine, smoke, drink, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this id" });
  }
  const userChoice = new UserChoice({
    movie,
    sport,
    cuisine,
    smoke,
    drink,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await userChoice.save({ session });
    existingUser.userChoice.push(userChoice);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ userChoice });
};


export const getById = async (req, res, next) => {
  const id = req.params.id;
  let userChoice;
  try {
    userChoice = await UserChoice.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!userChoice) {
    return res.status(404).json({ message: "No User Choice Found" });
  }
  return res.status(200).json({ userChoice });
};

export const deleteUserChoice = async (req, res, next) => {
  const id = req.params.id;

  let userChoice;

  try {
    userChoice = await UserChoice.findByIdAndRemove(id).populate("user");
    await userChoice.user.blogs.pull(blog);
    await userChoice.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!userChoice) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userChoice;
  try {
    userChoice = await User.findById(userId).populate("userChoice");
  } catch (err) {
    return console.log(err);
  }
  if (!userChoice) {
    return res.status(404).json({ message: "No User Choices Found" });
  }
  return res.status(200).json({ user: userChoice });
};

export const getAllUserMatch = async (req, res, next) => {
  
  let allUserChoices;
  const userId = req.params.id;
  let userChoices;
  let selfChoice;
  let matchedUserChoices;

  console.log(userId);
  
  try {
    allUserChoices = await UserChoice.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!allUserChoices) {
    return res.status(404).json({ message: "No User Choice Found" });
  }

  userChoices = allUserChoices.filter((userChoice) => ( userChoice.user._id != userId ));
  selfChoice = allUserChoices.filter((userChoice) => ( userChoice.user._id == userId ));
  matchedUserChoices = findMatch(userChoices , selfChoice);

  userChoices = matchedUserChoices;

  return res.status(200).json({ userChoices });
};

function findMatch( userChoices, selfChoice) {

    let tempUserChoice = [];
    let numberOfCriteria = 5;
    let weightOfEachCriteria = Math.floor(100 / numberOfCriteria);

    console.log(selfChoice);

    console.log('----------------');

    userChoices.forEach(element => {

      let matchScore = 0;
        
        if (element.sport === selfChoice[0].sport) {
            matchScore += weightOfEachCriteria;
        }

        if (element.cuisine === selfChoice[0].cuisine) {
            matchScore += weightOfEachCriteria;
        }
        if (element.movie === selfChoice[0].movie) {
          matchScore += weightOfEachCriteria;
        }
        if (element.smoke === selfChoice[0].smoke) {
          matchScore += weightOfEachCriteria;
        }
        if (element.drink === selfChoice[0].drink) {
          matchScore += weightOfEachCriteria;
        }

        console.log('User :  ' + element.user.name);
        console.log('Score ' + matchScore);

        element.matchScore = matchScore;
        element.chatCode = createChatCode( element, selfChoice[0]);

        if (matchScore >= 80) {
            tempUserChoice.push(element);
        }
    });

    return tempUserChoice;
}

function createChatCode( userChoice, selfChoice) {

  let tempNames = [];
  let chatCode;

  tempNames.push(selfChoice.user.name);
  tempNames.push(userChoice.user.name);

  tempNames.sort();
  chatCode = tempNames.join('');

  console.log(chatCode);
  
  return chatCode;
}