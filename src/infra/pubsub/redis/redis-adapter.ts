import { Controller } from "@/domain/controllers/controller.ts";
import { OnMessageInput } from "@/domain/pubsub/subscriber.ts";

export class RedisAdapter {
  static onMessage(controller: Controller) {
    return async function ({ message }: OnMessageInput) {
      try {
        await controller.handle(JSON.parse(message));
      } catch (error) {
        console.log(`[RedisAdapter]`, error);
      }
    };
  }
}
