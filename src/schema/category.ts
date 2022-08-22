import { Schema } from 'mongoose'

export interface category {
  tag: string
}

export const categorySchema = new Schema<category>(
  {
    tag: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
