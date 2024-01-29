import { Schema, model } from "mongoose";

const kakaoSchema = new Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
  },
});
const User = model("Kakao", kakaoSchema);
export default User;
