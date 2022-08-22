import { Schema, model } from 'mongoose'

interface timeCateogory {
  time: number
  tag: string
}

const timeCateogorySchema = new Schema<timeCateogory>(
  {
    time: {
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

const TimeCategory = model('TimeCategory', timeCateogorySchema)

export default TimeCategory
