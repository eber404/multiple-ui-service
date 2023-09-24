import { DomainErrorType } from "@/domain/errors/error-type.ts";

export class DomainError {
  public readonly message: string;
  public readonly type: DomainErrorType;

  constructor(props: DomainError) {
    this.message = props.message;
    this.type = props.type;
  }
}
