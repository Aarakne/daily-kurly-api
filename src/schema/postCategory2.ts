import { Schema, model } from 'mongoose'

interface postCategory2 {
  tag: string
}

const postCategory2Schema = new Schema<postCategory2>({
  tag: {
    type: String,
    required: true,
  },
})

const PostCategory2 = model('PostCategory2', postCategory2Schema)

export default PostCategory2
