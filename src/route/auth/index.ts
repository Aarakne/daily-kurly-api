import express from 'express'
import { body } from 'express-validator'
import { validatorError } from '../../lib/middleware.helper'
import { ifLoggedIn } from '../../lib/auth.helper'
import { createUser, verifyUser, removeCookie } from './auth'

const router = express.Router()

const validator = [
  body('username').notEmpty().isString().not().isArray(),
  body('password').notEmpty().isString().not().isArray(),
]

router
  .post('/signup', validator, validatorError, ifLoggedIn, createUser)
  .post('/login', validator, validatorError, ifLoggedIn, verifyUser)
  .get('/logout', removeCookie)

export default router
