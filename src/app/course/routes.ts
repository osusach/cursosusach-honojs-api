import { Hono } from "hono";
import type { Course } from "./type";
import { generateRandomString } from "../utils/generateRandomString";

export interface Env {
  course: KVNamespace;
}

const course = new Hono<{ Bindings: Env }>();

// GET /course/
course.get("/", async (c) => {
  const res = await c.env.course.list();
  return c.json({ mesasage: res });
});

// GET /course/:id
course.get("/:id", async (c) => {
  const id = c.req.param("id");
  const res = await c.env.course.get(id);

  return c.json({ message: JSON.parse(res) });
});

// POST /course/
course.post("/", async (c) => {
  const body = await c.req.json();
  await c.env.course.put(generateRandomString(), JSON.stringify(body));
  return c.json({ message: "successfull" });
});

export default course;
