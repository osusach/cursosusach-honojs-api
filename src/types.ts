export type Opinion = {
  id: string;
  course_id: string;
  difficulty: number;
  summary: string;
  advice?: string;
  comment?: string;
  dedicated_time: number;
  created_at: Date;
};

export type Course = {
  id: string;
  code: string | null;
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
