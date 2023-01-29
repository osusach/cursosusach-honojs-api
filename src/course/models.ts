import { z } from "zod";

// for schema validation
export const CourseBodySchema = z.object({
  id: z.string(),
  name: z.string(),
});

type CourseBody = z.infer<typeof CourseBodySchema>;

export interface Course extends CourseBody {
  total_opinions: number;
  created_at: Date;
  updated_at: Date;
}

// Database namespace
export interface Bindings {
  course: KVNamespace;
}
