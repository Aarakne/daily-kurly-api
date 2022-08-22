import express from 'express'
import { ifNotLoggedIn, verifyToken } from '../../lib/auth.helper'
import { getMyPosts, getLikedPosts, getProducts } from './me'

const router = express.Router()

router
  .get('/posts', ifNotLoggedIn, verifyToken, getMyPosts)
  .get('/likedPosts', ifNotLoggedIn, verifyToken, getLikedPosts)
  .get('/products', ifNotLoggedIn, verifyToken, getProducts)

export default router
