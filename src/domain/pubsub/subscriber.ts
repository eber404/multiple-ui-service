export interface OnMessageInput {
  message: string;
}

type OnMessage = ({ message }: OnMessageInput) => void;

export interface Subscriber {
  subscribe(channel: string, onMessage: OnMessage): void;
}
