import express from 'express'
import { ifNotLoggedIn, verifyToken } from '../../lib/auth.helper'
import { getMyPosts } from './me'

const router = express.Router()

router.get('/posts', ifNotLoggedIn, verifyToken, getMyPosts)

export default router
