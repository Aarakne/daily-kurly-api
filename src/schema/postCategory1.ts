import { Schema, model, Types } from 'mongoose'

interface postCategory1 {
  tag: string
  category2: Types.ObjectId[]
}

const postCategory1Schema = new Schema<postCategory1>({
  tag: {
    type: String,
    required: true,
  },
  category2: {
    type: [Schema.Types.ObjectId],
    ref: 'PostCategory2',
    required: true,
  },
})

const PostCategory1 = model('PostCategory1', postCategory1Schema)

export default PostCategory1
