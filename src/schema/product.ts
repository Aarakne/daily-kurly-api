import { Schema, model, Types } from 'mongoose'

interface product {
  name: string
  cat1: string
  cat2: string
  cat3: string
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
  deleted: boolean
  relatedProduct: Types.ObjectId
}

const productSchema = new Schema<product>(
  {
    name: {
      type: String,
      required: true,
    },
    cat1: {
      type: String,
      ref: 'ProductCategory1',
      required: true,
    },
    cat2: {
      type: String,
      ref: 'ProductCategory2',
      required: true,
    },
    cat3: {
      type: String,
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
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    relatedProduct: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
)

const Product = model('Product', productSchema)

export default Product
