import { Schema, model } from 'mongoose'

interface hardshipCateogory {
  hard: number
  tag: string
}

const hardshipCateogorySchema = new Schema<hardshipCateogory>(
  {
    hard: {
      type: Number,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const HardshipCategory = model('HardshipCategory', hardshipCateogorySchema)

export default HardshipCategory
