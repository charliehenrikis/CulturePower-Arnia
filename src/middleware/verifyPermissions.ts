import { Request, Response, NextFunction } from 'express'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user?.isAdmin) {
      next()
    } else {
      return res.status(403).send({
        error: 'Acesso não autorizado: usuário não é um administrador',
      })
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: 'Usuario nao foi encontrado em nossas buscas' })
  }
}
