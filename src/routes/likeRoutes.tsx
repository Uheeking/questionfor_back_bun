import { Elysia } from "elysia";
import { likeHeart } from "../api/like";

const likeRoutes = (app: Elysia) => {
  app.group("/api/like", (app) => app.post("/:id", likeHeart));
};
export default likeRoutes as any;
