# CursosUSACH Hono.js API

Work in progress...

## Technologies

- TypeScript with Hono.js
- Cloudflare Workers, KV (nosql)
- Zod

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

## TODO
- [X] Connect to KV (nosql db at the edge)
- [ ] Schema parser to validate bodies (Zod)
  - [X] Course
  - [ ] Opinion
- [ ] CRUD for courses
  - [X] Create
  - [X] Read
  - [ ] Update
  - [ ] Delete
- [ ] CRUD for opinions
  - [ ] Create
  - [ ] Read
  - [ ] Update
  - [ ] Delete

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

| score | title |
| ----------- | ----------- |
| 1 | Muy fácil |
| 2 | Fácil |
| 3 | Medio |
| 4 | Difícil |
| 5 | Muy difícil |

### Dedicated Time

| score | title |
| ----------- | ----------- |
| 1 | 1-2 horas semanales |
| 2 | 3-4 horas semanales  |
| 3 | 5-6 horas semanales |
| 4 | 7-8 horas semanales |
| 5 | >9 horas semanales |

### Faculties

| abbreviation | full name |
| ----------- | ----------- |
| fing | Facultad de Ingeniería |
| fciencia | Facultad de Ciencias |
| fahu | Facultad de Humanidades |
| fae | Facultad de Administración y Economía |
| fatec | Facultad Tecnológica |
| fcm | Facultad de Ciencias Médicas |
| fqyb | Facultad de Química y Biología |
| fderecho | Facultad de Derecho |

## Why use such obscure technologies?

Cuz cloudflare workers free tier is pretty good and the Hono.js way of creating an api is pretty nice, plus, the edge.

<p align="center"><img width="300" src="https://pbs.twimg.com/media/FnAgPUzX0AAAA_N?format=jpg&name=large" alt="USACH Open Source Logo"></p>
