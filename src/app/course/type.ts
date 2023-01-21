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
