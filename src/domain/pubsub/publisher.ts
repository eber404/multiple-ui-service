export interface Publisher {
  publish(channel: string, message: string): Promise<void>;
}
