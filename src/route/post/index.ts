import express from 'express'
import multer from 'multer'
import { ifNotLoggedIn, verifyToken } from '../../lib/auth.helper'
import { createPost, readPost, updatePost, deletePost } from './post'

const router = express.Router()

router
  .post('', ifNotLoggedIn, verifyToken, multer().array('images'), createPost)
  .get('/:postId', ifNotLoggedIn, verifyToken, readPost)
  .put(
    '/:postId',
    ifNotLoggedIn,
    verifyToken,
    multer().array('images'),
    updatePost
  )
  .delete('/:postId', ifNotLoggedIn, verifyToken, deletePost)

export default router
