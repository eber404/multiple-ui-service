import { connect } from "redis";

import { PubSub } from "@/infra/pubsub/pubsub.ts";

const redisClient = await connect({ hostname: "redis" });

export class RedisPubSub implements PubSub {
  private readonly client = redisClient;

  async onMessage(
    topic: string,
    callback: (message: string) => void,
  ): Promise<void> {
    const sub = await this.client.subscribe(topic);

    for await (const { channel, message } of sub.receive()) {
      if (channel === topic) {
        callback(message);
      }
    }
  }
  async publish(topic: string, message: string) {
    const subscribers = await this.client.publish(topic, message);
    console.log("subscribers", subscribers);
  }
}
