import { Hono } from "hono";
import { cors } from "hono/cors";
import { opinion } from "./opinion/routes";
import { course } from "./course/routes";

const app = new Hono();
app.use(cors());
app.get("/", (c) => c.text("Hello Hono!"));

// routes
app.route("/opinion", opinion);
app.route("/course", course);

export default app;
