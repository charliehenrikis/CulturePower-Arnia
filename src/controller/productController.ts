import { Request, Response } from 'express'
import { ProductService } from '../services/productService'
import { ProductRepository } from '../repository/productRepository'

const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)

export const createProductController = async (req: Request, res: Response) => {
  try {
    // Extrai os dados do corpo da requisição
    const { id, name, value, amount, description, photo } = req.body
    console.log(req.body)

    const existingProduct = await productRepository.findById(id)
    if (existingProduct) {
      return res
        .status(400)
        .send({ message: 'Já existe este produto, cadastre um novo' })
    }

    // Cria o produto
    const newProductcreate = productService.createProduct({
      name,
      value,
      amount,
      description,
      photo,
    })

    res.status(201).send({ message: 'Produto foi criado!', newProductcreate })
  } catch (error) {
    res.status(400).send({
      message: 'Houve um erro na criação do Produto',
    })
  }
}
