import { model } from 'mongoose'
import { categorySchema } from './category'

const productCategory1 = model('productCategory1', categorySchema)

export default productCategory1
