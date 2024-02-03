import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/userServices'
import { UserRepository } from '../repository/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

export const createController = async (req: Request, res: Response) => {
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

export const listAllController = async (req: Request, res: Response) => {
  const users = await userRepository.findAll()
  res.status(200).send(users)
}

export const deleteController = async (req: Request, res: Response) => {
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

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validar dados de entrada
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'E-mail e senha são obrigatórios' })
    }

    // Buscar o usuário no banco de dados pelo e-mail
    const user = await userService.findByEmail(email)

    // Se o usuário não existir, retornar erro
    if (!user) {
      return res.status(400).send({ message: 'Usuário não encontrado' })
    }
    // Se a senha não for compatível, retornar erro
    const verifiPass = await bcrypt.compare(password, user.password)
    if (!verifiPass) {
      return res.status(400).send({ message: 'Email ou Senha inválidos' })
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: 24 * 60 * 60,
    })

    console.log('Login bem-sucedido', token)
    // Retornar o token gerado
    return res.json({ email: user.email, token })

    // })
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return res.status(500).send('Erro interno do servidor')
  }
}
