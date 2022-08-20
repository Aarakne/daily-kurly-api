import { Schema, model } from 'mongoose'

interface user {
  username: string
  password: string
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
  },
  { timestamps: true }
)

const User = model('User', userSchema)

export default User
