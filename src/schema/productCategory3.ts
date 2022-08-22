import { model } from 'mongoose'
import { categorySchema } from './category'

const productCategory3 = model('productCategory3', categorySchema)

export default productCategory3
