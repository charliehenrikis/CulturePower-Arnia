import express from 'express'
import {
  createController,
  listAllController,
  deleteController,
  loginController,
} from '../controller/UserController'
import validateRoute from '../middleware/validateRoute'
import * as userSchema from '../schemas/userSchemas'
import { authMiddleware } from '../middleware/validateLogin'

const router = express.Router()

router.post(
  '/users',
  validateRoute(userSchema.CreatePerson.schema),
  createController
)

router.get('/users', authMiddleware, listAllController)

router.delete(
  '/users/:id',
  validateRoute(userSchema.CreatePerson.schema),
  authMiddleware,
  deleteController
)

router.post(
  '/users/login',
  validateRoute(userSchema.LoginPerson.schema),
  loginController,
  authMiddleware
)

router.post(
  '/users/admin',
  validateRoute(userSchema.LoginPerson.schema),
  loginController,
  authMiddleware
)

export default router
