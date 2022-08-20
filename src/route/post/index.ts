import express from 'express'
import multer from 'multer'
import { ifNotLoggedIn, verifyToken } from '../../lib/auth.helper'
import { createPost } from './post'

const router = express.Router()

router.post(
  '',
  ifNotLoggedIn,
  verifyToken,
  multer().array('images'),
  createPost
)

export default router
