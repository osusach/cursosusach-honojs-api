# CursosUSACH Hono.js API

Work in progress...

## TODO
- [ ] Schema parser to validate bodies (Zod)
- [ ] Connect to KV (nosql db at the edge)
- [ ] CRUD for courses
- [ ] CRUD for opinions

## Getting Started

Development mode, run locally pressing L on your terminal

```bash
npm install
npm run dev
```

Deployment

```
npm run deploy
```

## Types

### Opinion

```typescript
{
  id: string;
  course_id: string;
  difficulty: number;
  summary: string;
  advice?: string;
  comment?: string;
  dedicated_time: number;
  created_at: Date;
}
```

### Course

```typescript
{
  id: string;
  code: string | null;
  title: string;
  dedicated_time: {
    score: number | null;
    title: string | null;
  }
  difficulty: {
    score: number | null;
    title: string | null;
  }
}
```

## Convertion tables

### Difficulty

| score      | title |
| ----------- | ----------- |
| 1 | Muy facil |
| 2 | Facil |
| 3 | Medio |
| 4 | Dificil |
| 5 | Muy dificil |

### Dedicated Time

| score      | title |
| :-----------: | :-----------: |
| 1 | 1-2 horas semanales |
| 2 | 3-4 horas semanales  |
| 3 | 5-6 horas semanales |
| 4 | 7-8 horas semanales |
| 5 | >9 horas semanales |