import { Schema, model, Types } from 'mongoose'

interface purchase {
  username: string
  products: Types.ObjectId[]
}

const purchaseSchema = new Schema<purchase>(
  {
    username: {
      type: String,
      required: true,
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
)

const Purchase = model('Purchase', purchaseSchema)

export default Purchase
