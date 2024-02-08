import mongoose, { Schema } from 'mongoose'

// verificar products e como tipar interfaces com array

export interface IUser {
  name: string
  email: string
  password: string
  jewelsAmount: number
  products: string[]
  favoriteProducts: string[]
  photo: string
  isAdmin: boolean
}

const newUser = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jewelsAmount: { type: Number, default: 0 },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  favoriteProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  photo: { type: String },
  isAdmin: { type: Boolean, default: false },
})

const User = mongoose.model('User', newUser)

export default User
