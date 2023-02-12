import { OpinionBody, Opinion } from "./models";
import type { Response } from "../shared/types";
import { useGenerateRandomString } from "../shared/utils";

type CreateOpinion = {
  database: D1Database;
  body: OpinionBody;
};

export async function createOpinion({
  database,
  body,
}: CreateOpinion): Promise<Response> {
  const created_at = new Date().toDateString();
  const id = useGenerateRandomString();

  const opinion: Opinion = {
    id,
    ...body,
    created_at,
  };

  const { success, error } = await database
    .prepare(
      "INSERT INTO opinions (id, course_id, summary, advice, difficulty, dedicated_time, created_at) values (?, ?, ?, ?, ?, ?, ?)"
    )
    .bind(
      id,
      opinion.course_id,
      opinion.summary,
      opinion.advice || null,
      opinion.difficulty,
      opinion.dedicated_time,
      created_at
    )
    .run();

  if (success) return { success, message: `Opinion created with ID ${id}` };

  return { success, message: error! };
}

type GetOpinionById = {
  database: D1Database;
  id: string;
};

export async function getOpinionById({ database, id }: GetOpinionById) {
  const { success, results, error } = await database
    .prepare("SELECT * FROM opinions WHERE id = ?1")
    .bind(id)
    .all();

  if (success) return { success, message: results };

  return { success, message: error! };
}
