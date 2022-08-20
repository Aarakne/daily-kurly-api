import express from 'express'
import multer from 'multer'
import { ifNotLoggedIn, verifyToken } from '../../lib/auth.helper'
import { createPost, readPost } from './post'

const router = express.Router()

router
  .post('', ifNotLoggedIn, verifyToken, multer().array('images'), createPost)
  .get('/:postId', ifNotLoggedIn, verifyToken, readPost)

export default router
