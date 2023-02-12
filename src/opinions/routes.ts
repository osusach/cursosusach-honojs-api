import { Hono } from "hono";
import { Bindings } from "@shared/bindings";
import {
  type Opinion,
  // type Bindings,
  OpinionBodySchema,
} from "./models";
import { createOpinion, getOpinionById } from "./controllers";

export const opinions = new Hono<{ Bindings: Bindings }>();

opinions.get("/", async (c) => {
  const { success, results, error } = await c.env.database
    .prepare("SELECT * FROM opinions")
    .all();

  if (success) {
    c.status(200);
    return c.json({ success, message: results });
  }
  return c.json({ success, message: error });
});

opinions.get("/:id", async (c) => {
  const id = c.req.param("id");
  const { database } = c.env;

  const response = await getOpinionById({ database, id });

  if (response.success) {
    c.status(200);
    return c.json(response);
  }

  // error on the server
  c.status(500);
  return c.json(response);
});

opinions.post("/", async (c) => {
  const body = await c.req.json();
  const validation = OpinionBodySchema.safeParse(body);

  if (validation.success) {
    const { data } = validation;
    const { database } = c.env;

    const response = await createOpinion({
      database,
      body: data,
    });

    if (response.success) {
      c.status(200);
      return c.json(response);
    }

    // error on the server
    c.status(500);
    return c.json(response);
  }

  // error on user input
  c.status(400);
  return c.json({ success: false, message: validation.error.issues });
});
