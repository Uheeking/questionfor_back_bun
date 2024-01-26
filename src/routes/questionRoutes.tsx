import { Elysia } from "elysia";
import { getQuestion } from "../api/question";

const questionRoutes = (app: Elysia) => {
  app.group("/api/question", (app) => app.get("/", getQuestion));
};
export default questionRoutes as any;
