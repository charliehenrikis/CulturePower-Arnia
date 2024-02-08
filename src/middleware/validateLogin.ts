import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/userServices'
import { UserRepository } from '../repository/userRepository'
import { IUser } from '../model/userModel'

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

const JWT_SECRET = process.env.JWT_SECRET as string

declare module 'express' {
  interface Request {
    user?: IUser
  }
}

// Verificar se o token da requisição foi fornecido
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).send({ error: 'Token não fornecido' })
  }

  // Verificar se o token da requisição é válido
  jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' })
    }

    try {
      // pegar o id de dentro do decoded
      const userId = decoded.id
      const user = await userService.findById(userId as string)

      if (!user) {
        throw new Error('Usuário não encontrado')
      }
      // se achar o usuario guardar na requisicao (req.user = user)
      req.user = user
      console.log(user)

      next()
    } catch (error) {
      // se nao achar o usuario retorna erro
      return res.status(500).send({ error: 'Erro ao buscar o usuário' })
    }
  })
}
