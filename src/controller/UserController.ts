import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/userServices'
import { UserRepository } from '../repository/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

export const createUserController = async (req: Request, res: Response) => {
  try {
    // Extrai os dados do corpo da requisição
    const { email, password } = req.body

    // Verifica se o e-mail já está registrado
    const existingUser = await userService.findByEmail(email)

    if (existingUser?.email === email) {
      res.status(400).send({ message: `E-mail ${email} já registrado` })
    }

    const passwordHashed = await bcrypt.hash(password, 8)
    // Cria o usuário === adicionar isAdmin como false, products vazio e joias vazias
    const result = await userService.createUser({
      email,
      password: passwordHashed,
      name: req.body.name,
      photo: req.body.photo,
      isAdmin: false,
    })

    res.status(201).send({
      message: 'Usuário foi criado!',
      user: result,
    })
  } catch (error) {
    res.status(400).send({
      message: 'Houve um erro na criação do usuário',
    })
  }
}

export const listAllController = async (req: Request, res: Response) => {
  const users = await userRepository.findAll()
  res.status(200).send(users)
}

export const ListUserById = async (req: Request, res: Response) => {
  try {
    console.log('buscando usuario pelo ID ')
    const id = req.params.id.replace('id:', '')
    const user = await userService.findById(id)
    if (!user) {
      return res.status(404).send({ message: 'Usuario não encontrado' })
    }
    res.status(200).send({ user })
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar Usuario pelo ID' })
  }
}

export const EditUserByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.replace('id:', '')
    const body = req.body

    const user = await userService.updateUser(id, body)

    // user.__v += 1

    if (!user) {
      return res.status(404).send({ message: 'Usuario não encontrado' })
    }

    res.status(200).send({ message: 'Atualizado com sucesso', user })
  } catch (error: any) {
    res.status(500).send({ error: true, message: error.message })
  }
}

export const deleteController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.replace('id:', '')
    const deleteUser = await userRepository.deleteUser(id)
    console.log(deleteUser)

    if (deleteUser?.id === id) {
      res.status(200).send({ message: `Usuário com ID ${id} foi apagado` })
    } else {
      res.status(404).send({ message: `Usuário com ID ${id} não encontrado` })
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
    // usar id para buscar de isAdmin === implementar no validatelogin decoded
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: 24 * 60 * 60,
    })

    console.log('Login bem-sucedido', token, user.isAdmin)

    // Retornar o token gerado
    return res.json({
      message: 'Login bem-sucedido',
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    })

    // })
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return res.status(500).send('Erro interno do servidor')
  }
}

export async function sendJewelsToUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { jewelsAmount } = req.body

    if (!id) {
      throw new Error('É obrigatório passar o ID para efetuar a transferência')
    }

    const result = await userService.sendJewelsToUser(id, jewelsAmount)

    res.status(200).send({ success: true, result })
  } catch (error: any) {
    res.status(500).send({ error: true, message: error.message })
  }
}

export const giftToProducts = async (req: Request, res: Response) => {
  try {
    const { productId, userId } = req.body

    if (!userId || !productId) {
      throw new Error('Não foi possível resgatar o produto')
    }

    const result = await userService.redeemProduct(userId, productId)
    if (result) {
      res.status(200).json({ message: 'Você resgatou o produto!', result })
    } else {
      res
        .status(500)
        .json({ error: true, message: 'Erro ao resgatar o produto' })
    }
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message })
  }
}
