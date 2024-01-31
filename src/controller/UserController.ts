import { type Request, type Response } from 'express'
import { UserService } from '../services/userServices'
import { UserRepository } from '../repository/userRepository'
import bcrypt from 'bcrypt'

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

export const createUserController = async (req: Request, res: Response) => {
  try {
    // Extrai os dados do corpo da requisição
    const { email, password } = req.body

    // Verifica se o e-mail já está registrado
    const existingUser = await userService.findByEmail(email)

    if (existingUser != null) {
      throw new Error(`E-mail ${email} já registrado`)
    }

    const passwordHashed = await bcrypt.hash(password, 8)
    // Cria o usuário
    const result = await userService.createUser({
      ...req.body,
      password: passwordHashed,
    })

    res.status(201).send({
      message: 'Usuário foi criado!',
      user: result,
    })
  } catch (error) {
    res.status(400).send({
      message: 'Houve um erro na criação do usuário}',
    })
  }
}

export const listAllUsersController = async (req: Request, res: Response) => {
  const users = await userRepository.findAll()
  res.status(200).send(users)
}

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.replace('id:', '')
    const deleteUser = await userRepository.deleteUser(id)

    if (!deleteUser) {
      res.status(404).send({ message: `Usuário com ID ${id} não encontrado` })
    } else {
      res.status(204).send()
    }
  } catch (error) {
    console.error('Erro ao excluir usuário:', error)
    res.status(500).send('Erro interno do servidor')
  }
}
