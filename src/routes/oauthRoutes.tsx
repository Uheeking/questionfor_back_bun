import { Elysia } from "elysia";
import { getKakaoUser, getFindUser, getDeleteUser } from "../api/oauth";
import { sessionPlugin } from "elysia-session";
import { MemoryStore } from "elysia-session/stores/memory";

const questionRoutes = (app: Elysia) => {
  app.group("/api/oauth", (app) =>
    app
      .use(
        sessionPlugin({
          cookieName: Bun.env.SERCETKEY, // Optional
          store: new MemoryStore(),
          expireAfter: 60 * 60, // 15 minutes
        })
      )
      .get("/callback/kakao", getKakaoUser, {
        detail: {
          tags: ["Oauth"],
        },
      })
      .get("/findUser/:id", getFindUser, {
        detail: {
          tags: ["Oauth"],
        },
      })
      .get("/deleteUser/:id", getDeleteUser, {
        detail: {
          tags: ["Oauth"],
        },
      })
  );
};
export default questionRoutes as any;
