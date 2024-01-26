import { Schema, model } from "mongoose";

const questionSchema = new Schema({
  name: {
    type: String,
    require: [true, "User must type name"],
  },
  text: {
    type: String,
  },
  password: {
    type: String,
    require: [true, "User must type password"],
  },
  answer: {
    type: String,
  },
});
const Question = model("Question", questionSchema);
export default Question;
