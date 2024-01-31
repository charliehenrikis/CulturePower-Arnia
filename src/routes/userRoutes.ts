import express from 'express'
import {
  createUserController,
  listAllUsersController,
  deleteUserController,
} from '../controller/UserController'
import validateRoute from '../middleware/validateRoute'
import * as userSchema from '../schemas/userSchemas'

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
  deleteUserController
)

//router.post('/login', validateRoute(userSchema.Login.schema), userController.loginUser);

export default router
