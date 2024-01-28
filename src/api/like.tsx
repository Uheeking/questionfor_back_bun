import { Context } from "elysia";
import Like from "../model/like";

export const likeHeart = async (c: Context<{ params: { id: string } }>) => {
  if (c.params && !c.params?.id) {
    c.set.status = 400;
    throw new Error("No id provided");
  }

  const id = c.params.id;
  if (!c.body) throw new Error("No body provided");
  const { isLiked } = c.body;

  const existingLike = await Like.findById(id);
  if (existingLike) {
    await Like.deleteOne({ _id: id });
    return {
      status: c.set.status,
      success: true,
      data: existingLike,
      message: "Like deleted successfully",
    };
  } else {
    const newLike = new Like({ _id: id, like: isLiked });
    const savedLike = await newLike.save();
    return {
      status: c.set.status,
      success: true,
      data: savedLike,
      message: "Like created successfully",
    };
  }
};

export const getHeart = async (c: Context) => {
  const like = await Like.find();
  if (!like || like.length === 0) {
    c.set.status = 404;
    throw new Error("No likes found!");
  }
  return like;
};
