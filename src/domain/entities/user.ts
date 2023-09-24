import { Err, Ok, Result } from "oxide";
import { z } from "zod";

import { Id, idSchema } from "@/domain/value-objects/id.ts";

const userSchema = z.object({
  id: idSchema,
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

type UserInput = z.input<typeof userSchema>;
type UserProps = UserInput & { id?: Id };

export class User {
  public readonly id: Id;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  static new(props: UserProps): Result<User, string> {
    const validation = userSchema.safeParse(props);

    if (!validation.success) return Err(validation.error.message);

    return Ok(new User(validation.data));
  }
}
