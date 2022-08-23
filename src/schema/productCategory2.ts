import { Schema, model, Types } from 'mongoose'

interface productCategory2 {
  tag: string
  category3: Types.ObjectId[]
}

const productCategory2Schema = new Schema<productCategory2>({
  tag: {
    type: String,
    required: true,
  },
  category3: {
    type: [Schema.Types.ObjectId],
    ref: 'ProductCategory3',
    required: true,
  },
})

const ProductCategory2 = model('ProductCategory2', productCategory2Schema)

export default ProductCategory2
