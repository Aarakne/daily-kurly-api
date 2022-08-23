import { Schema, model, Types } from 'mongoose'

interface productCategory1 {
  tag: string
  category2: Types.ObjectId[]
}

const productCategory1Schema = new Schema<productCategory1>({
  tag: {
    type: String,
    required: true,
  },
  category2: {
    type: [Schema.Types.ObjectId],
    ref: 'ProductCategory2',
    required: true,
  },
})

const ProductCategory1 = model('ProductCategory1', productCategory1Schema)

export default ProductCategory1
