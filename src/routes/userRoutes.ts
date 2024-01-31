import express from 'express'
import UserController from '../controller/UserController'
import validateRoute from '../middleware/validateRoute'
import * as userSchema from '../schemas/userSchemas'

const router = express.Router()
const userController = new UserController()

router.post('/users',validateRoute(userSchema.CreatePerson.schema),
  userController.createUser)

router.get('/users', userController.listAllUsers)

  router.delete('/users/:id' ,validateRoute(userSchema.CreatePerson.schema),
  userController.deleteUser)


export default router
