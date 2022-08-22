import { model } from 'mongoose'
import { categorySchema } from './category'

const ProductCategory3 = model('ProductCategory3', categorySchema)

export default ProductCategory3
