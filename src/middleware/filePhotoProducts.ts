import { Request, Response } from 'express'
import * as Yup from 'yup'
import { Product } from '../model/productModel'

export const filePhotoProduct = async (req: Request, res: Response) => {
  const productSchema = Yup.object({
    id: Yup.string().required(),
  })

  const { file } = req

  try {
    const { id } = await productSchema.validate(req.params)
    let updatedProduct = await Product.findByIdAndUpdate(id, {
      photo: file?.filename,
    }).exec()

    if (!updatedProduct) {
      return res
        .status(404)
        .send({ message: `Product with id ${id} was not found!` })
    }

    updatedProduct = await Product.findById(id).populate('photo').exec()

    if (!updatedProduct) {
      return res
        .status(404)
        .send({ message: `Product with id ${id} was not found!` })
    }

    updatedProduct.__v += 1
    await updatedProduct.save()
    return res.status(200).send(updatedProduct)
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const { errors } = error
      return res.status(400).send({ validationErrors: errors })
    }
    console.error(error)
    return res.status(500).send({ message: 'Erro interno do servidor' })
  }
}
