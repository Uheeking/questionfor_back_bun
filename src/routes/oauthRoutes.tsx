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
      .get("/callback/kakao", getKakaoUser)
      .get("/findUser/:id", getFindUser)
      .get("/deleteUser/:id", getDeleteUser)
  );
};
export default questionRoutes as any;
