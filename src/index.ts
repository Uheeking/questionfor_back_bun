import { Elysia } from "elysia";
import likeRoutes from "./routes/likeRoutes";
import questionRoutes from "./routes/questionRoutes";
import oauthRoutes from "./routes/oauthRoutes";
import { cors } from "@elysiajs/cors";
import { connectDB } from "./config";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia();
connectDB();
app.use(
  cors({
    credentials: true,
    origin: /localhost.*/,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  })
);

app
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia about QuestionFor Documentation",
          version: "1.0.0",
        },
        tags: [
          { name: "Like", description: "About showed like and heart" },
          { name: "Question", description: "Question for Uheeking" },
          { name: "Oauth", description: "Authentication about User" },
        ],
      },
    })
  )
  .listen(3002);
app.get("/", () => "Welcome to our API");
app.use(likeRoutes);
app.use(questionRoutes);
app.use(oauthRoutes);

app.listen(Bun.env.PORT || 3002);
console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
