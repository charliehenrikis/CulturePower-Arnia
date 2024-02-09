import { Product } from '../model/productModel'

export class ProductRepository {
  async createProduct(productData: any) {
    const product = new Product(productData)
    await product.save()
    return product
  }

  async findAll() {
    return await Product.find()
  }

  async deleteProduct(id: string) {
    const deletedProduct = await Product.findByIdAndDelete(id).exec()
    return deletedProduct
  }

  async findById(id: string) {
    return await Product.findById(id).exec()
  }

  async findByIdAndUpdate(id: string, newData: any) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, newData, {
        new: true,
      }).exec()
      return updatedProduct
    } catch (error: any) {
      throw new Error(`Erro ao salvar o produto: ${error.message}`)
    }
  }
}
