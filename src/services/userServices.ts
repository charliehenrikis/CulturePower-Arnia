/* eslint-disable @typescript-eslint/no-unused-vars */
import User from '../model/userModel'
import { ProductRepository } from '../repository/productRepository'
import { UserRepository } from '../repository/userRepository'

export class UserService {
  userRepository: UserRepository
  productRepository = new ProductRepository()

  constructor(
    userRepository: UserRepository
    //  productRepository: ProductRepository
  ) {
    this.userRepository = userRepository
    //  this.productRepository = productRepository
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

  async updateUser(id: string, newData: any) {
    try {
      const user = await this.userRepository.findByIdAndUpdate(id, newData)

      if (!user) {
        throw new Error('Produto não encontrado')
      }

      return user
    } catch (error: any) {
      throw new Error(`Erro ao atualizar o usuario: ${error.message}`)
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

  async redeemProduct(userId: string, productId: string) {
    try {
      // pegar os ID que preciso por parametros
      const user: any = await this.userRepository.findById(userId)
      const product: any = await this.productRepository.findById(productId)

      if (!user || !product) {
        throw new Error('Usuário ou produto não encontrado')
      }

      console.log(
        `Usuário ${user.name} e produto ${product.name} buscados com sucesso.`
      )

      // verifica se tem joias o suficiente para efetuar o resgate
      if (user.jewelsAmount < product.value) {
        throw new Error('Saldo insuficiente para resgatar o produto')
      } else {
        // efetua a troca e envia pro banco
        user.jewelsAmount -= product.value
        user.products.push(product)

        // atualiza e decrementa usuarios e produtos
        const update = this.userRepository.findByIdAndUpdate(userId, user)
        if (product.amount > 0) {
          product.amount-- // Reduz a quantidade do produto
        } else {
          throw new Error('Não há este produto em estoque no momento')
        }

        const updateProducts = this.productRepository.findByIdAndUpdate(
          productId,
          product
        )
      }

      // Adiciona o produto resgatado à lista de produtos no array do usuario
      console.log(`Produto ${product.name} resgatado por ${user.name}`)

      return {
        success: true,
        user,
      }
    } catch (error: any) {
      throw new Error(`Erro ao resgatar o produto: ${error.message}`)
    }
  }
}
