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
    const resultProduct = await productService.createProduct({
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
  console.log('buscando todos os produtos')
  const products = await productService.findAll()
  res.status(200).send(products)
}

export const ListProductByID = async (req: Request, res: Response) => {
  try {
    console.log('buscando produto pelo ID ')
    const id = req.params.id.replace('id:', '')
    const product = await productService.findById(id)
    if (!product) {
      return res.status(404).send({ message: 'Produto não encontrado' })
    }
    res.status(200).send({ product })
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar produto pelo ID' })
  }
}

export const EditProductByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.replace('id:', '')
    const body = req.body

    const product = await productService.updateProduct(id, body)

    if (!product) {
      return res.status(404).send({ message: 'Produto não encontrado' })
    }

    res.status(200).send({ message: 'Atualizado com sucesso', product })
  } catch (error: any) {
    res.status(500).send({ error: true, message: error.message })
  }
}

export const listAvailableProduct = async (req: Request, res: Response) => {
  try {
    console.log('buscando produto')
    const { id } = req.params
    const { amount } = req.body

    const availableProducts = await productService.availableProduct(id, amount)
    res.status(200).send({ success: true, availableProducts })
  } catch (error: any) {
    res.status(500).send({ error: true, message: error.message })
  }
}
