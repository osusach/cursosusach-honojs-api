import { z } from "zod";

// Opinion
type OpinionId = string;

const dedicatedHoursPerWeek = ["1-2", "3-4", "5-6", "7-8", ">9"] as const;

const difficultyLevels = [
  "Muy fácil",
  "Fácil",
  "Medio",
  "Difícil",
  "Muy difícil",
] as const;

// for schema validation
export const OpinionBodySchema = z.object({
  course_id: z.string(),
  information: z.object({
    summary: z.string(),
    advice: z.optional(z.string()),
  }),
  perceived_difficulty: z.enum(difficultyLevels),
  dedicated_time: z.enum(dedicatedHoursPerWeek),
});

export type OpinionBody = z.infer<typeof OpinionBodySchema>;

export interface Opinion extends OpinionBody {
  id: OpinionId;
  created_at: Date;
  updated_at: Date;
}

// validate body route
export const GetOpinionKeysSchema = z.object({
  course_id: z.string(),
  cursor: z.optional(z.string()),
});

// Database name
export interface Bindings {
  opinion: KVNamespace;
  course: KVNamespace;
}
