import { model } from 'mongoose'
import { categorySchema } from './category'

const PostCategory1 = model('PostCategory1', categorySchema)

export default PostCategory1
