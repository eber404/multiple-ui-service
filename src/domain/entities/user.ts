import { z, ZodError } from "zod";

import { Id, idSchema } from "./id.ts";
import { Email, emailSchema } from "./email.ts";
import { BadInputException } from "@/domain/exceptions/bad-input.ts";

const userSchema = z.object({
  id: idSchema,
  name: z.string().min(3),
  email: emailSchema,
  password: z.string().min(8),
});

type UserIn = z.input<typeof userSchema>;
type UserOut = z.output<typeof userSchema>;

export class User {
  public readonly id: Id;
  public readonly name: string;
  public readonly email: Email;
  public readonly password: string;

  private constructor(props: UserOut) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
  }

  static new(input: UserIn): User {
    const validation = userSchema.safeParse(input);

    if (!validation.success) {
      throw new BadInputException(this.buildErrorMessage(validation.error));
    }

    return new User(validation.data);
  }

  private static buildErrorMessage(error: ZodError) {
    const errors = error.errors.map((err) => ({
      message: err.message,
      fields: err.path,
    }));

    return JSON.stringify(errors, null, 2);
  }
}
