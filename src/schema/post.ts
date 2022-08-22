import { Schema, model, Types } from 'mongoose'

interface post {
  writer: string
  title: string
  content: {
    images: string[] // S3 image url
    text: string
  }
  likeCount: number
  usedProducts: Types.ObjectId[]
  category1: string
  category2: string
  tags: string[]
  hitCount: number
  deleted: boolean
}

const postSchema = new Schema<post>(
  {
    writer: {
      type: String,
      required: true,
      index: 'text',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: Object,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
      required: true,
    },
    usedProducts: {
      type: [Schema.Types.ObjectId],
      ref: 'Product',
      required: true,
      minlength: 1,
    },
    category1: {
      type: String,
      required: true,
    },
    category2: {
      type: String,
      required: true,
    },
    tags: {
      type: [],
    },
    hitCount: {
      type: Number,
      default: 0,
      required: true,
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
