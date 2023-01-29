import { Hono } from "hono";
import { useGenerateRandomString } from "../shared/utils";
import {
  type Opinion,
  type Bindings,
  OpinionBodySchema,
  GetOpinionKeysSchema,
} from "./models";
import { createOpinion } from "./controllers";
import { updateTotalOpinionsOnCourse } from "../shared/controllers";

export const opinion = new Hono<{ Bindings: Bindings }>();

opinion.get("/", async (c) => {
  const body = await c.req.json();

  return c.json({ response: "" });
});

opinion.get("/:id", async (c) => {
  const id = c.req.param("id");

  return c.json({ response: "" });
});

opinion.post("/", async (c) => {
  const body = await c.req.json();
  const validatedBody = OpinionBodySchema.safeParse(body);

  if (validatedBody.success) {
    const courseId = validatedBody.data.course_id;
    const courseBody = validatedBody.data;
    const database = c.env.course;

    const response = await createOpinion({
      database,
      body: courseBody,
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
