import { Elysia } from "elysia";
import { likeHeart, getHeart } from "../api/like";

const likeRoutes = (app: Elysia) => {
  app.group("/api/like", (app) =>
    app
      .post("/:id", likeHeart, {
        detail: {
          tags: ["Like"],
        },
      })
      .get("/", getHeart, {
        detail: {
          tags: ["Like"],
        },
      })
  );
};
export default likeRoutes as any;
