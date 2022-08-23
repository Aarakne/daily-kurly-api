import express from 'express'
import multer from 'multer'
import { ifNotLoggedIn, verifyToken } from '../../lib/auth.helper'
import {
  createPost,
  readPosts,
  readPost,
  updatePost,
  deletePost,
  likePost,
} from './post'

const router = express.Router()

router
  .post('', ifNotLoggedIn, verifyToken, multer().array('images'), createPost)
  .get('/list', ifNotLoggedIn, verifyToken, readPosts)
  .get('/:postId', ifNotLoggedIn, verifyToken, readPost)
  .put(
    '/:postId',
    ifNotLoggedIn,
    verifyToken,
    multer().array('images'),
    updatePost
  )
  .delete('/:postId', ifNotLoggedIn, verifyToken, deletePost)
  .patch('/like/:postId', ifNotLoggedIn, verifyToken, likePost)

export default router
