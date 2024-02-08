import { Request, Response } from 'express'
import { ProductService } from '../services/productService'
import { ProductRepository } from '../repository/productRepository'

const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)

export const createProductController = async (req: Request, res: Response) => {
  try {
    // Extrai os dados do corpo da requisição
    const { name, value, amount, description, photo } = req.body
    console.log(req.body)

    // Cria o produto
    const resultProduct = productService.createProduct({
      name,
      value,
      amount,
      description,
      photo,
    })

    res
      .status(201)
      .send({ message: `produto foi criado com sucesso`, resultProduct })
  } catch (error) {
    res.status(400).send({
      message: 'Houve um erro na criação do Produto',
    })
  }
}

export const listAllProduct = async (req: Request, res: Response) => {
  const products = await productService.findAll()
  res.status(200).send(products)
}

export const ListProductByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.replace('id:', '')
    const product = await productRepository.findById(id)
    if (!product) {
      return res.status(404).send({ message: 'Produto não encontrado' })
    }
    res.status(200).send({ product })
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar produto pelo ID' })
  }
}
