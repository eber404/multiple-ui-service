import { z } from "zod";
import { Err, Ok, Result } from "oxide";

export const emailSchema = z.string().email();

export type Email = z.infer<typeof emailSchema>;

export class EmailValidator {
  public static validate(email: string): Result<Email, string> {
    const validation = emailSchema.safeParse(email);

    if (!validation.success) {
      return Err(validation.error.message);
    }

    return Ok(validation.data);
  }
}
