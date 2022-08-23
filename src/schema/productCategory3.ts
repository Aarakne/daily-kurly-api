import { Schema, model } from 'mongoose'

interface productCategory3 {
  tag: string
}

const productCategory3Schema = new Schema<productCategory3>({
  tag: {
    type: String,
    required: true,
  },
})

const ProductCategory3 = model('ProductCategory3', productCategory3Schema)

export default ProductCategory3
