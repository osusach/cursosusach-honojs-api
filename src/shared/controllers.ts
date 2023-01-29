import type { Course } from "../course/models";
import type { Response, Database } from "../shared/types";

type UpdateTotalOpinionsOnCourse = {
  database: Database;
  course_id: string;
};

export async function updateTotalOpinionsOnCourse({
  database,
  course_id,
}: UpdateTotalOpinionsOnCourse): Promise<Response> {
  const updated_at = new Date();

  const unparsedCourse = await database.get(course_id);

  if (unparsedCourse) {
    const course = JSON.parse(unparsedCourse) as Course;
    const updatedCourse = {
      ...course,
      total_opinions: course.total_opinions + 1,
      updated_at,
    };
    await database.put(course_id, JSON.stringify(updatedCourse));

    return {
      success: true,
      message: `${course}`,
    };
  }

  return {
    success: false,
    message: `Opinion with id ${course_id} not found.`,
  };
}
