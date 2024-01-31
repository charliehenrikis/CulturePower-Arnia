import mongoose, { Schema } from 'mongoose'
import type IProduct from './productModel'

interface IUser {
  name: string
  email: string
  password: string
  jewelsAmount: number
  products: IProduct[]
  favoriteProducts: IProduct[]
  photo: string
}

const newUser = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Garante e-mails únicos
  password: { type: String, required: true },
  jewelsAmount: { type: Number, default: 0 },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // Referência ao modelo Product
  favoriteProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // Referência ao modelo Product
  photo: { type: String },
})

const User = mongoose.model('User', newUser)

export default User
