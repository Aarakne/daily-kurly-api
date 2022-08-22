import { Schema, model, Types } from 'mongoose'

interface productTracingLog {
  username: string
  productId: Types.ObjectId
  postId: Types.ObjectId
  boughtProduct: boolean // 구매 상품을 클릭했는지, 관련 상품을 클릭했는지 여부
}

const productTracingLogSchema = new Schema<productTracingLog>(
  {
    username: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    boughtProduct: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)

const ProductTracingLog = model('ProductTracingLog', productTracingLogSchema)

export default ProductTracingLog
