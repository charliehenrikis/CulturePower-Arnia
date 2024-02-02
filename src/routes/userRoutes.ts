import express from 'express'
import {
  createUserController,
  listAllUsersController,
  deleteUserController,
  loginController,
} from '../controller/UserController'
import validateRoute from '../middleware/validateRoute'
import * as userSchema from '../schemas/userSchemas'
import { authMiddleware } from '../middleware/validateLogin'

const router = express.Router()

router.post(
  '/users',
  validateRoute(userSchema.CreatePerson.schema),
  createUserController
)

router.get('/users', listAllUsersController)

router.delete(
  '/users/:id',
  validateRoute(userSchema.CreatePerson.schema),
  authMiddleware,
  deleteUserController
)

router.post(
  '/users/login',
  validateRoute(userSchema.LoginPerson.schema),
  loginController,
  authMiddleware
)

export default router
