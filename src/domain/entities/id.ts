import cuid2 from "cuid2";
import { z } from "zod";

export const idSchema = z
  .string()
  .cuid2()
  .optional()
  .transform((
    value,
  ) => (!value ? cuid2.createId() : value));

export type Id = z.infer<typeof idSchema>;
