import { Controller } from "@/domain/controllers/controller.ts";
import { OnMessageInput } from "@/domain/pubsub/subscriber.ts";
import { DomainError } from "@/domain/errors/domain-error.ts";

export class RedisAdapter {
  static onMessage(controller: Controller) {
    return async function ({ message }: OnMessageInput) {
      const onSuccess = () => {
        console.log(`${RedisAdapter.name} success!`);
      };

      const onError = (error: DomainError) => {
        console.log(`${RedisAdapter.name} error:`, error);
      };

      try {
        await controller.handle({
          input: JSON.parse(message),
          handlers: {
            onSuccess,
            onError,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
}
