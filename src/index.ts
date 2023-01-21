import { Hono } from "hono";
import { cors } from "hono/cors";
import course from "./app/course/routes";

const app = new Hono();
app.use(cors());
app.get("/", (c) => c.text("Hello Hono!"));

// routes
app.route("/course", course);

export default app;
