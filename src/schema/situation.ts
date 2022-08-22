import { model } from 'mongoose'
import { categorySchema } from './category'

const Situation = model('Situation', categorySchema)

export default Situation
