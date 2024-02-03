import { Request, Response, NextFunction } from 'express'

export const adminOnline = (
  req: Request & { userRoles?: string[] },
  res: Response,
  next: NextFunction
) => {
  req.userRoles = ['admin', 'user']

  if (req.userRoles.includes('admin')) {
    console.log('Logado como administrador')
    next()
  } else {
    res
      .status(403)
      .json({ message: 'Acesso proibido para não administradores' })
  }
}

export const userOnline = (
  req: Request & { userRoles?: string[] },
  res: Response,
  next: NextFunction
) => {
  if (req.userRoles && req.userRoles.includes('user')) {
    console.log('Logado como usuario')
    next()
  } else {
    res.status(403).json({ message: 'Acesso proibido para não usuários' })
  }
}
