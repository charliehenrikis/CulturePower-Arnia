import mongoose, { Schema } from 'mongoose'

export interface IProduct {
  name: string
  value: number
  amount: number
  description: string
  photo: string
}

const newProduct = new Schema<IProduct>({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  amount: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
  photo: { type: String },
})

export const Product = mongoose.model('Product', newProduct)
