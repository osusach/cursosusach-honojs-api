import { Hono } from "hono";
import type { Course } from "./types";

const course = new Hono();

// GET /course/
course.get("/", (c) => c.json({ mesasage: "hello" }));

// GET /course/:id
course.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.text("");
});

// POST /course/
course.post("/", async (c) => {
  const body = await c.req.json();
  console.log(body);
  return c.json({ message: "successfull" });
});

export default course;
