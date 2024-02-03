import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const JWT_SECRET = process.env.JWT_SECRET as string

// Verificar se o token da requisição foi fornecido
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).send({ error: 'Token não fornecido' })
  }

  // Verificar se o token da requisição é válido
  jwt.verify(token, JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' })
    }
    next()
  })
}
