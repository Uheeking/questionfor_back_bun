import { Elysia, t } from "elysia";
import { postRegisterQuestion, getQuestion } from "../api/question";

const questionRoutes = (app: Elysia) => {
  app.group("/api/question", (app) =>
    app.post("/", postRegisterQuestion).get("/", getQuestion)
  );
};
export default questionRoutes as any;
