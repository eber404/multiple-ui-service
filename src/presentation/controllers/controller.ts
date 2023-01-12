export interface Controller<Input = any, Output = void> {
  handle(props?: Input): Promise<Output>;
}
