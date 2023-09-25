import { CreateUserIoc } from "@/infra/ioc/create-user-ioc.ts";
import { redisSubscriber } from "@/infra/pubsub/redis/redis-subscriber.ts";
import { RedisAdapter } from "@/infra/pubsub/redis/redis-adapter.ts";
import { httpServer } from "@/infra/http/opine/opine-server.ts";
import { Status } from "http-status";
import { OpineAdapter } from "@/infra/http/opine/opine-adapter.ts";

const { createUserController } = CreateUserIoc();

// pubsub UI
redisSubscriber.subscribe(
  "create-user",
  RedisAdapter.onMessage(createUserController),
);

// http UI
httpServer.get("/healthz", function (_, res) {
  res.setStatus(Status.OK).send();
});

httpServer.post("/users", OpineAdapter.onRequest(createUserController));

const HTTP_PORT = 3333;

httpServer.listen(
  HTTP_PORT,
  () =>
    console.log(`HTTP Server listening on http://localhost:${HTTP_PORT} 🚀`),
);
