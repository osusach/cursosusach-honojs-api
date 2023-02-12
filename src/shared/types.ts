import type { ZodIssue } from "zod";

export type Response = {
  success: boolean;
  message:
    | string
    | ZodIssue[]
    | KVNamespaceListResult<unknown, string>
    | unknown[];
};

export type Database = KVNamespace<string>;
