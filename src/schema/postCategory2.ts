import { model } from 'mongoose'
import { categorySchema } from './category'

const PostCategory2 = model('PostCategory2', categorySchema)

export default PostCategory2
