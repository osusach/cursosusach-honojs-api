import { OpinionBody, Opinion } from "./models";
import type { Response } from "../shared/types";
import { useGenerateRandomString } from "../shared/utils";

type Database = KVNamespace<string>;

type GetOpinionsByCourse = {
  database: Database;
  courseId: string;
  cursor?: string;
};

type CreateOpinion = {
  database: Database;
  body: OpinionBody;
};

export async function createOpinion({
  database,
  body,
}: CreateOpinion): Promise<Response> {
  const created_at = new Date();
  const updated_at = new Date();
  const id = useGenerateRandomString();
  const courseId = body.course_id;

  const opinion: Opinion = {
    id,
    ...body,
    created_at,
    updated_at,
  };

  try {
    await database.put(`${courseId}:${id}`, JSON.stringify(opinion));
    return { success: true, message: `Opinion created with id ${id}` };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

export async function getOpinionsByCourse({
  database,
  courseId,
  cursor,
}: GetOpinionsByCourse): Promise<Response> {
  // for pagination, cursor retrieves the remaining keys
  if (cursor) {
    const opinions = await database.list({ cursor });
    return {
      success: true,
      message: opinions,
    };
  }

  const opinions = await database.list({ prefix: courseId });
  return {
    success: true,
    message: opinions,
  };
}
