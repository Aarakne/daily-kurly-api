import express from 'express'
import { ifNotLoggedIn, verifyToken } from '../../lib/auth.helper'
import { getMyPosts, getLikedPosts } from './me'

const router = express.Router()

router
  .get('/posts', ifNotLoggedIn, verifyToken, getMyPosts)
  .get('/likedPosts', ifNotLoggedIn, verifyToken, getLikedPosts)

export default router
