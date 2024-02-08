import express from 'express'
import {
  createUserController,
  deleteController,
  loginController,
  listAllController,
} from '../controller/UserController'
import validateRoute from '../middleware/validateRoute'
import * as userSchema from '../schemas/userSchemas'
import * as productSchema from '../schemas/productSchema'
import { authenticateToken } from '../middleware/validateLogin'
import { isAdmin } from '../middleware/verifyPermissions'
import { createProductController } from '../controller/productController'

export const router = express.Router()

// rota de criação de usuario
router.post(
  '/User',
  validateRoute(userSchema.CreatePerson.schema),
  createUserController
)

// rota de login => token jwt
router.post(
  '/User/login',
  validateRoute(userSchema.LoginPerson.schema),
  loginController
)

// rota de listar todos os usuarios apenas se for admin
router.get('/User', authenticateToken, isAdmin, listAllController)

// rota de delete pelo id se estiver logado
router.delete('/User/:id', authenticateToken, isAdmin, deleteController)

// rota de criação de produto (EM DESENVOLVIMENTO)
router.post(
  '/products',
  validateRoute(productSchema.CreateProducts.schema),
  authenticateToken,
  isAdmin,
  createProductController
)

// rota de atualizar produto se for admin (EM DESENVOLVIMENTO)
router.put(
  '/products/update',
  validateRoute(productSchema.CreateProducts.schema),
  authenticateToken,
  isAdmin
)
