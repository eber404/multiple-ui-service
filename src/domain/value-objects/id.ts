import cuid2 from "cuid2";
import { z } from "zod";
import _ from "lodash";

export const idSchema = z
  .string()
  .cuid2()
  .optional()
  .transform((value) => (_.isEmpty(value) ? cuid2.createId() : value));

export type Id = z.infer<typeof idSchema>;
