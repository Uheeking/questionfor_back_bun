import { Context } from "elysia";
import Question from "../model/question";

export const getQuestion = async (c: Context) => {
  const question = await Question.find();
  if (!question || question.length === 0) {
    c.set.status = 404;
    throw new Error("No questions found!");
  }
  return question;
};
