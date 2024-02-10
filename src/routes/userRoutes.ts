import express from 'express'
import {
  createUserController,
  deleteController,
  loginController,
  listAllController,
  sendJewelsToUser,
} from '../controller/UserController'
import validateRoute from '../middleware/validateRoute'
import * as userSchema from '../schemas/userSchemas'
import { authenticateToken } from '../middleware/validateLogin'
import { isAdmin } from '../middleware/verifyPermissions'

const UserRouter = express.Router()

// Rota de criação de usuário
UserRouter.post(
  '/',
  validateRoute(userSchema.CreatePerson.schema),
  createUserController
)

// Rota de login => token jwt
UserRouter.post(
  '/login',
  validateRoute(userSchema.LoginPerson.schema),
  loginController
)

// Rota de listar todos os usuários apenas se for admin
UserRouter.get('/', authenticateToken, isAdmin, listAllController)

// Rota de delete pelo id se estiver logado
UserRouter.delete('/:id', authenticateToken, isAdmin, deleteController)

// Admin envia Joias para o usuario
UserRouter.post('/:id', authenticateToken, isAdmin, sendJewelsToUser)

// Usuario Resgasta o produto com base na quantidade de joias disponiveis
UserRouter.post('/redeemGift')

export default UserRouter
