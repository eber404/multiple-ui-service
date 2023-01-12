import { validate } from 'uuid'

export class User {
  public readonly id!: string
  public readonly name!: string
  public readonly email!: string
  public readonly password!: string

  constructor(props: Omit<User, 'id'>, id?: string) {
    if (!id) {
      this.id = crypto.randomUUID()
    }

    for (const key in props) {
      if (!props[key]) {
        throw Error(`[user entity] please, inform a valid prop for ${key}`)
      }
    }

    if (id && !validate(id)) {
      throw Error('[user entity] please, inform a valid id for user')
    }

    Object.assign(this, props)
  }
}
