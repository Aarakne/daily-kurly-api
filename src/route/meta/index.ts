import express from 'express'
import { getPostCategories } from './post'
import { getProductCategories } from './product'

const router = express.Router()

router
  .get('/posts/categories', getPostCategories)
  .get('/products/categories', getProductCategories)

export default router
