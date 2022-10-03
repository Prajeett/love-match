import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userChoiceSchema = new Schema({
  movie: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  smoke: {
    type: String,
    required: true,
  },
  drink: {
    type: String,
    required: true,
  },
  matchScore: {
    type: String,
    required: false,
  },
  chatCode: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("UserChoice", userChoiceSchema);