import { Schema, model } from "mongoose";

const LikeSchema = new Schema({
  bno: {
    type: Schema.ObjectId,
  },
  like: {
    type: Boolean,
  },
});

const Like = model("Like", LikeSchema);
export default Like;
