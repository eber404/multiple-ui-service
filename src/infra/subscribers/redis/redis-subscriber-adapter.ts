import { Controller } from '@/presentation/controllers/controller.ts'

export class RedisPubSubAdapter {
  static onMessage(controller: Controller) {
    return async function (message: string) {
      try {
        console.log('adapter', message)

        await controller.handle({
          data: JSON.parse(message),
        })
      } catch (error) {
        console.log('[redis pubsub adapter]', error)
      }
    }
  }
}
