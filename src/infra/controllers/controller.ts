export interface ControllerOutput {
  status: number;
  message?: string;
}

export interface Controller<I = unknown> {
  handle(input?: I): Promise<ControllerOutput>;
}
