import { model } from 'mongoose'
import { categorySchema } from './category'

const productCategory2 = model('productCategory2', categorySchema)

export default productCategory2
