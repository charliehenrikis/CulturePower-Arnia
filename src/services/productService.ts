import { ProductRepository } from '../repository/productRepository'

export class ProductService {
  productRepository: ProductRepository
  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  async createProduct(newProduct: {
    name: string
    value: number
    amount: number
    description: string
    photo: string
  }) {
    try {
      const createdProduct =
        await this.productRepository.createProduct(newProduct)
      return createdProduct
    } catch (error) {
      throw new Error('Erro na criação do produto')
    }
  }

  async findById(id: string) {
    try {
      const product = await this.productRepository.findById(id)
      return product
    } catch (error) {
      throw new Error('Erro ao buscar produto pelo ID')
    }
  }

  async findAll() {
    try {
      const findProduct = await this.productRepository.findAll()
      return findProduct
    } catch (error) {
      throw new Error('Erro ao buscar todos os produtos')
    }
  }
}
