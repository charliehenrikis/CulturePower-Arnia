import { Request, Response } from 'express'
import * as Yup from 'yup'
import User from '../model/userModel'

export const filePhotoUsers = async (req: Request, res: Response) => {
  const userSchema = Yup.object({
    id: Yup.string().required(),
  })

  const { file } = req

  try {
    const { id } = await userSchema.validate(req.params)
    let updatedUser = await User.findByIdAndUpdate(id, {
      photo: file?.filename,
    }).exec()

    if (!updatedUser) {
      return res
        .status(404)
        .send({ message: `Product with id ${id} was not found!` })
    }

    updatedUser = await User.findById(id).populate('photo').exec()

    if (!updatedUser) {
      return res
        .status(404)
        .send({ message: `Product with id ${id} was not found!` })
    }

    updatedUser.__v += 1
    await updatedUser.save()
    return res.status(200).send(updatedUser)
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const { errors } = error
      return res.status(400).send({ validationErrors: errors })
    }
    console.error(error)
    return res.status(500).send({ message: 'Erro interno do servidor' })
  }
}
