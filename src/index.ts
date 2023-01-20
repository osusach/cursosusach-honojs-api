import { Hono } from "hono";
import course from "./course";

const app = new Hono();
app.route("/course", course);

app.get("/", (c) => c.text("Hello Hono!"));

export default app;
