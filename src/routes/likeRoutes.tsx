import { Elysia } from "elysia";
import { likeHeart, getHeart } from "../api/like";

const likeRoutes = (app: Elysia) => {
  app.group("/api/like", (app) =>
    app.post("/:id", likeHeart).get("/", getHeart)
  );
};
export default likeRoutes as any;
