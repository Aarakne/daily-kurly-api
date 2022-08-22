import { model } from 'mongoose'
import { categorySchema } from './category'

const ProductCategory1 = model('ProductCategory1', categorySchema)

export default ProductCategory1
