import { Elysia } from "elysia";
import likeRoutes from "./routes/likeRoutes";
import questionRoutes from "./routes/questionRoutes";
import { cors } from "@elysiajs/cors";
import { connectDB } from "./config";

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

app.get("/", () => "Welcome to our API");
app.use(likeRoutes);
app.use(questionRoutes);

app.listen(Bun.env.PORT || 3002);
console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
