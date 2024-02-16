import express from 'express'
import {
  createUserController,
  deleteController,
  loginController,
  listAllController,
  sendJewelsToUser,
  giftToProducts,
  ListUserById,
  EditUserByID,
} from '../controller/userController'
import validateRoute from '../middleware/validateRoute'
import * as userSchema from '../schemas/userSchemas'
import { authenticateToken } from '../middleware/validateLogin'
import { isAdmin } from '../middleware/verifyPermissions'
import { uploadPhotoMiddleware } from '../middleware/upload'
import { filePhotoUsers } from '../middleware/filePhotoUsers'

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
// Rota de adicionar imagem via multer de usuarios
UserRouter.patch(
  '/uploadImage/:id',
  authenticateToken,
  isAdmin,
  uploadPhotoMiddleware,
  filePhotoUsers
)

// Usuario Resgasta o produto com base na quantidade de joias disponiveis
UserRouter.post('/redeemGift', authenticateToken, giftToProducts)

// Rota de listar todos os usuários apenas se for admin
UserRouter.get('/', authenticateToken, isAdmin, listAllController)

// Rota de listar usuarios pelo id
UserRouter.get('/:id', authenticateToken, isAdmin, ListUserById)

// Rota de delete pelo id se estiver logado
UserRouter.delete('/:id', authenticateToken, isAdmin, deleteController)

// Admin envia Joias para o usuario
UserRouter.post('/:id', authenticateToken, isAdmin, sendJewelsToUser)

// Rota de atualizar usuario se for admin
UserRouter.put(
  '/:id',
  validateRoute(userSchema.CreatePerson.schema),
  authenticateToken,
  isAdmin,
  EditUserByID
)

export default UserRouter
