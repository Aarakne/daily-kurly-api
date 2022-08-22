import express from 'express'
import { body } from 'express-validator'
import { validatorError } from '../../lib/middleware.helper'
import { ifNotLoggedIn, verifyToken } from '../../lib/auth.helper'
import { logProductInfo } from './post'

const router = express.Router()

const validator = [
  body('postId').notEmpty().isString().not().isArray(),
  body('productId').notEmpty().isString().not().isArray(),
  body('boughtProduct').notEmpty().isBoolean().not().isString(),
]

router.post(
  '/posts/product-tracing',
  validator,
  validatorError,
  ifNotLoggedIn,
  verifyToken,
  logProductInfo
)

export default router
