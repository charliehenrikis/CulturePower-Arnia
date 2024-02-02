import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

// Verificar se o token da requisição foi fornecido
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestToken = req.headers.authorization?.split(' ')[1]
  if (!requestToken) {
    return res.status(401).send({ message: 'Token não fornecido' })
  } else {
    console.log(requestToken)
  }

  console.log('Chave secreta:', process.env.JWT_SECRET)

  // Verificar se o token da requisição é válido
  jwt.verify(requestToken, process.env.JWT_SECRET as string, (err) => {
    if (err) {
      return res.status(401).send({ error: 'Token invalido' })
    }
    next()
  })
}
