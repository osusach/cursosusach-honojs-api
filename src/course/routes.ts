import { Hono } from "hono";
import { type Bindings, CourseBodySchema } from "./models";
import { createCourse } from "./controllers";
import { updateTotalOpinionsOnCourse } from "../shared/controllers";

export const course = new Hono<{ Bindings: Bindings }>();

course.post("/", async (c) => {
  const body = await c.req.json();
  const validatedBody = CourseBodySchema.safeParse(body);

  if (validatedBody.success) {
    const courseId = validatedBody.data.id;
    const courseName = validatedBody.data.name;
    const database = c.env.course;

    const response = await createCourse({
      database,
      id: courseId,
      name: courseName,
    });

    if (response.success) {
      await updateTotalOpinionsOnCourse({ database, course_id: courseId });

      c.status(200);
      return c.json(response);
    }

    c.status(500);
    return c.json(response);
  }

  c.status(400);
  return c.json({ success: false, message: validatedBody.error.issues });
});
