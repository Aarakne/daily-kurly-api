import { Schema, model, ObjectId } from 'mongoose'

interface post {
  writer: string
  content: {
    images: string[] // S3 image url
    text: string
  }
  likeCount: number
  usedProducts: ObjectId[]
  title: string
  tags: string[]
  deleted: boolean
}

const postSchema = new Schema<post>(
  {
    writer: {
      type: String,
      required: true,
      index: 'text',
    },
    content: {
      type: Object,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    usedProducts: {
      type: [],
      required: true,
      minlength: 1,
    },
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Post = model('Post', postSchema)

export default Post
