export const faculties = [
  "fing",
  "fciencia",
  "fahu",
  "fae",
  "fatec",
  "fcm",
  "fqyb",
  "fderecho",
] as const;

type Faculties = typeof faculties[number];

export type Course = {
  id: string;
  code: string | null;
  faculty: Faculties;
  title: string;
  dedicated_time: {
    score: number | null;
    title: string | null;
  };
  difficulty: {
    score: number | null;
    title: string | null;
  };
};
