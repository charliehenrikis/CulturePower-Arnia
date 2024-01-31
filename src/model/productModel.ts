import mongoose, { Schema } from 'mongoose'

interface IProduct {
  Name: string
  Value: number
  Amount: number
  Description: string
  Photo: string
}

const newProduct = new Schema<IProduct>({
  Name: { type: String, required: true },
  Value: { type: Number, required: true },
  Amount: { type: Number, required: true, default: 0 },
  Description: { type: String, required: true },
  Photo: { type: String },
})

mongoose.model('Product', newProduct)

export default IProduct
