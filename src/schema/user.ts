import { Schema, model, Types } from 'mongoose'

interface user {
  username: string
  password: string
  likedPosts: Types.ObjectId[]
  posts: Types.ObjectId[]
}

const userSchema = new Schema<user>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: 'text',
    },
    password: {
      type: String,
      required: true,
    },
    likedPosts: {
      type: [Schema.Types.ObjectId],
      ref: 'Post',
      default: [],
    },
    posts: {
      type: [Schema.Types.ObjectId],
      ref: 'Post',
      default: [],
    },
  },
  { timestamps: true }
)

const User = model('User', userSchema)

export default User
