import { Schema, model, ObjectId } from 'mongoose'

interface user {
  username: string
  password: string
  likedPosts: ObjectId[]
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
      type: [],
      default: [],
    },
  },
  { timestamps: true }
)

const User = model('User', userSchema)

export default User
