import { createUser } from './user/createUser'
import { validateUser } from './user/validateUser'

class UserService {
  async createUser(newUser: {
    email: any
    password: string | Buffer
    name: any
    photo: any
  }) {
    try {
      await validateUser(newUser)
      const createdUser = await createUser(newUser)
      return createdUser
    } catch (error) {
      throw new Error('Erro na criação do usuário')
    }
  }
}

export default new UserService()
