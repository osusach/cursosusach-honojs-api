import { Hono } from "hono";
import { cors } from "hono/cors";
import { opinions } from "./opinions/routes";
import { course } from "./course/routes";

const app = new Hono();
app.use(cors());
app.get("/", (c) => c.text("Hello mom, the API is working!"));

// routes
app.route("/opinions", opinions);
app.route("/courses", course);

export default app;
