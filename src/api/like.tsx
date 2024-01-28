import { Context } from "elysia";
import Like from "../model/like";

export const likeHeart = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { isLiked } = req.body;
    const existingLike = await Like.findOne({ _id: id });

    if (existingLike) {
      await Like.deleteOne({ _id: id });
      console.log("삭제되었습니다. ");
      res.json({
        _id: id,
        like: isLiked,
        message: "Like deleted successfully.",
      });
    } else {
      const newLike = new Like({ _id: id, like: isLiked });
      const savedLike = await newLike.save();
      console.log(newLike);
      res.json(savedLike);
    }
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
