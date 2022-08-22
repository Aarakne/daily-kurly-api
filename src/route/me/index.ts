import express from 'express'
import { body } from 'express-validator'
import { validatorError } from '../../lib/middleware.helper'
import { ifNotLoggedIn, verifyToken } from '../../lib/auth.helper'
import { getMyPosts, getLikedPosts, getProducts, createPurchase } from './me'

const router = express.Router()

const validator = [body('products').isArray().isLength({ min: 1 })]

router
  .get('/posts', ifNotLoggedIn, verifyToken, getMyPosts)
  .get('/likedPosts', ifNotLoggedIn, verifyToken, getLikedPosts)
  .get('/products', ifNotLoggedIn, verifyToken, getProducts)
  .post(
    '/purchase',
    validator,
    validatorError,
    ifNotLoggedIn,
    verifyToken,
    createPurchase
  )

export default router
