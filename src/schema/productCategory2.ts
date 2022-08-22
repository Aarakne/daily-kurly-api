import { model } from 'mongoose'
import { categorySchema } from './category'

const ProductCategory2 = model('ProductCategory2', categorySchema)

export default ProductCategory2
