import express from 'express'
import {
  createController,
  deleteController,
  loginController,
  listAllController,
} from '../controller/UserController'
import validateRoute from '../middleware/validateRoute'
import * as userSchema from '../schemas/userSchemas'
import { authenticateToken } from '../middleware/validateLogin'
import { isAdmin } from '../middleware/verifyPermissions'

const router = express.Router()

// rota de criação de usuario
router.post(
  '/users',
  validateRoute(userSchema.CreatePerson.schema),
  createController
)

// rota de listar todos os usuarios apenas se for admin
router.get('/users', authenticateToken, isAdmin, listAllController)

// rota de delete pelo id se estiver logado
router.delete('/users/:id', authenticateToken, isAdmin, deleteController)

// rota de login => token jwt
router.post(
  '/users/login',
  validateRoute(userSchema.LoginPerson.schema),
  loginController
)

export default router
