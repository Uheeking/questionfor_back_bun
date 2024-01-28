import { Context } from "elysia";
import Question from "../model/question";

export const postRegisterQuestion = async (c: Context) => {
  if (!c.body) throw new Error("No body provided");

  const question = await Question.create(c.body);

  if (!question) {
    c.set.status = 400;
    throw new Error("Invalid question data!");
  }

  c.set.status = 201;
  return {
    status: c.set.status,
    success: true,
    data: question,
    message: "Question created successfully",
  };
};

export const getQuestion = async (c: Context) => {
  console.log("getQuestion");

  const question = await Question.find();
  if (!question || question.length === 0) {
    c.set.status = 404;
    throw new Error("No questions found!");
  }
  return question;
};
