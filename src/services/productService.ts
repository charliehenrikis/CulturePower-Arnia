import { Product } from '../model/productModel'
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

  async updateProduct(id: string, newData: any) {
    try {
      const product = await this.productRepository.findByIdAndUpdate(
        id,
        newData
      )

      if (!product) {
        throw new Error('Produto não encontrado')
      }

      return product
    } catch (error: any) {
      throw new Error(`Erro ao atualizar o produto: ${error.message}`)
    }
  }

  async findByIdAndUpdate(id: string, newData: any) {
    return await Product.findByIdAndUpdate(id, newData, { new: true }).exec()
  }

  async availableProduct(userId: string, amount: number) {
    try {
      // Buscar todos os produtos no repositório
      const allProducts = await this.productRepository.findAll()
      console.log('all')

      // Filtrar os produtos com quantidade maior que zero
      const availableProducts = allProducts.filter(
        (product) =>
          product.amount > 0 &&
          (amount === undefined || product.amount >= amount)
      )
      console.log(availableProducts)
      // Retornar os produtos disponíveis
      return availableProducts
    } catch (error) {
      throw new Error('Erro ao buscar ou filtrar os produtos disponíveis')
    }
  }
}
