import { Hono } from "hono";
import { z } from "zod";
import { generateRandomString } from "../utils/generateRandomString";
import { type Course, faculties } from "./type";

export interface Env {
  course: KVNamespace;
}

const CourseCreateSchema = z.object({
  code: z.string().optional(),
  title: z.string(),
  faculty: z.enum(faculties),
});

const facultySchema = z.enum(faculties);

type CourseCreateSchema = z.infer<typeof CourseCreateSchema>;

const course = new Hono<{ Bindings: Env }>();

// GET /course/
course.get("/", async (c) => {
  const res = await c.env.course.list();
  return c.json({ message: res });
});

// GET /course/:id
course.get("/:id", async (c) => {
  const id = c.req.param("id");
  const res = await c.env.course.get(id);

  return c.json({ message: JSON.parse(res || "none") });
});

// GET /course/faculty/:abbreviation
course.get("/faculty/:abbreviation", async (c) => {
  const abbreviation = c.req.param("abbreviation");
  const parseAbbreviation = facultySchema.safeParse(abbreviation);

  if (parseAbbreviation.success) {
    const res = await c.env.course.list({ prefix: parseAbbreviation.data });
    return c.json({ success: true, message: res });
  }

  c.status(400);
  return c.json({ success: false, error: parseAbbreviation.error.issues });
});

// POST /course/
course.post("/", async (c) => {
  const body = await c.req.json();
  const parseBody = CourseCreateSchema.safeParse(body);

  if (parseBody.success) {
    const id = generateRandomString();

    const newCourse: Course = {
      ...parseBody.data,
      id,
      code: parseBody.data.code || null,
      dedicated_time: { score: null, title: null },
      difficulty: { score: null, title: null },
    };

    const newCourseKey = `${parseBody.data.faculty}-${id}`;

    await c.env.course.put(newCourseKey, JSON.stringify(newCourse));

    return c.json({
      success: true,
      message: `new course added with key ${newCourseKey}`,
    });
  }

  c.status(400);
  return c.json({ success: false, error: parseBody.error.issues });
});

export default course;
