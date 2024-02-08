import { Request, Response, NextFunction } from 'express'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) {
    next()
  } else {
    return res.status(403).send({
      error: 'Acesso não autorizado: usuário não é um administrador',
    })
  }
}
