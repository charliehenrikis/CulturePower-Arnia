import express from 'express'
import {
  EditProductByID,
  ListProductByID,
  createProductController,
  listAllProduct,
  listAvailableProduct,
} from '../controller/productController'
import validateRoute from '../middleware/validateRoute'
import * as productSchema from '../schemas/productSchema'
import { authenticateToken } from '../middleware/validateLogin'
import { isAdmin } from '../middleware/verifyPermissions'
import { uploadPhotoMiddleware } from '../middleware/upload'
import { filePhotoProduct } from '../middleware/filePhotoProducts'

const productRouter = express.Router()

// Rota de criação de produto se for admin
productRouter.post(
  '/',
  validateRoute(productSchema.CreateProducts.schema),
  authenticateToken,
  isAdmin,
  createProductController
)

// Rota de adicionar imagem via multer de produtos
productRouter.patch(
  '/uploadImage/:id',
  authenticateToken,
  isAdmin,
  uploadPhotoMiddleware,
  filePhotoProduct
)

// Rota de listar todos os produtos apenas se for admin
productRouter.get('/', authenticateToken, isAdmin, listAllProduct)

// Rota de buscar os produtos existentes ( > 0 ) se for admin
productRouter.get(
  '/avaliable',
  authenticateToken,
  isAdmin,
  listAvailableProduct
)
// Rota de buscar o produto pelo id
productRouter.get('/:id', authenticateToken, isAdmin, ListProductByID)

// Rota de atualizar produto se for admin
productRouter.put(
  '/:id',
  validateRoute(productSchema.CreateProducts.schema),
  authenticateToken,
  isAdmin,
  EditProductByID
)

export default productRouter
