import express from 'express'
import { ifNotLoggedIn, verifyToken } from '../../lib/auth.helper'
import { getPostCategories, getPostOptionCategories } from './post'
import { getProductCategories } from './product'

const router = express.Router()

router
  .get('/posts/categories', getPostCategories)
  .get(
    '/posts/option-categories',
    ifNotLoggedIn,
    verifyToken,
    getPostOptionCategories
  )
  .get('/products/categories', getProductCategories)

export default router
