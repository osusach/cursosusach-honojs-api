import type { Course } from "./models";
import type { Response, Database } from "../shared/types";

type CreateCourse = {
  database: Database;
  id: string;
  name: string;
};

type UpdateTotalOpinionsOnCourse = {
  database: Database;
  id: string;
};

export async function createCourse({
  database,
  id,
  name,
}: CreateCourse): Promise<Response> {
  const created_at = new Date();
  const updated_at = new Date();

  const course: Course = {
    id,
    name,
    total_opinions: 0,
    created_at,
    updated_at,
  };

  try {
    await database.put(id, JSON.stringify(course));
    return { success: true, message: `Course created with id ${id}` };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

// export async function updateTotalOpinionsOnCourse({
//   database,
//   id,
// }: UpdateTotalOpinionsOnCourse): Promise<Response> {
//   const updated_at = new Date();

//   const unparsedCourse = await database.get(id);

//   if (unparsedCourse) {
//     const course = JSON.parse(unparsedCourse) as Course;
//     const updatedCourse = {
//       ...course,
//       total_opinions: course.total_opinions + 1,
//       updated_at,
//     };
//     await database.put(id, JSON.stringify(updatedCourse));

//     return {
//       success: true,
//       message: `${course}`,
//     };
//   }

//   return {
//     success: false,
//     message: `Opinion with id ${id} not found.`,
//   };
// }
