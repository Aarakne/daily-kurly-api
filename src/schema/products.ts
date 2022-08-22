import { Schema, model, Types } from 'mongoose'

interface product {
  name: string
  cat1: Types.ObjectId
  cat2: Types.ObjectId
  cat3: Types.ObjectId
  brand: string
  image: string
  packingType: string
  sellingUnit: string
  quantity: string
  allergy: string
  expiration: string
  reviewCount: number
  stockCount: number
  sellingPrice: number
  originalPrice: number
  discountRate: number
  delivery: boolean
  avgSold: number
  gram: number
  gramPrice: number
}

const productSchema = new Schema<product>(
  {
    name: {
      type: String,
      required: true,
    },
    cat1: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory1',
      required: true,
    },
    cat2: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory2',
      required: true,
    },
    cat3: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory3',
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    packingType: {
      type: String,
      required: true,
    },
    sellingUnit: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    allergy: {
      type: String,
      required: true,
    },
    expiration: {
      type: String,
      required: true,
    },
    reviewCount: {
      type: Number,
      required: true,
      default: 0,
    },
    stockCount: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountRate: {
      type: Number,
      required: true,
      default: 0,
    },
    delivery: {
      type: Boolean,
      required: true,
    },
    avgSold: {
      type: Number,
      required: true,
      default: 0,
    },
    gram: {
      type: Number,
      required: true,
    },
    gramPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Product = model('Product', productSchema)

export default Product
