import User from '../model/userModel'
import { UserRepository } from '../repository/userRepository'

export class UserService {
  userRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async createUser(newUser: {
    email: string
    password: string
    name: string
    photo: string
    isAdmin: boolean
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

  async findById(id: string) {
    try {
      const user = await this.userRepository.findById(id)
      return user
    } catch (error) {
      throw new Error('Erro ao buscar usuário pelo ID')
    }
  }

  async sendJewelsToUser(userId: string, jewelsAmount: number) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    // Atualização da quantidade de joias do usuário
    await User.findByIdAndUpdate(userId, { $inc: { jewelsAmount } })

    // Recuperação do usuário atualizado
    const updatedUser = await this.userRepository.findById(userId)
    return updatedUser
  }
}
