import { CreateUserIoc } from "@/infra/ioc/create-user-ioc.ts";
import { RedisSubscriber } from "@/infra/pubsub/redis/redis-subscriber.ts";
import { RedisAdapter } from "@/infra/pubsub/redis/redis-adapter.ts";
import { fastifyServer } from "@/infra/http/fastify/server.ts";
import { FastifyAdapter } from "@/infra/http/fastify/fastify-adapter.ts";

const redisSubscriber = new RedisSubscriber();

const { createUserController } = CreateUserIoc();

redisSubscriber.subscribe(
  "create-user",
  RedisAdapter.onMessage(createUserController),
);

fastifyServer.post("/users", FastifyAdapter.onRequest(createUserController));
