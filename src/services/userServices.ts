import { UserRepository } from '../repository/userRepository'

export class UserService {
  userRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async createUser(newUser: {
    email: any
    password: string | Buffer
    name: any
    photo: any
  }) {
    try {
      const createdUser = await this.userRepository.createUser(newUser)
      return createdUser
    } catch (error) {
      throw new Error('Erro na criação do usuário')
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email)
      return user
    } catch (error) {
      throw new Error('Erro ao buscar usuário por e-mail')
    }
  }
}
