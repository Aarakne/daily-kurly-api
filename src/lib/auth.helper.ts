import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWTtoken } from 'routeType'
import User from '../schema/user'
import { response } from './utils'

export const ifLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies

  if (token) {
    console.error('already logged in')
    return response(res, 403)
  }

  next()
}

export const ifNotLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies

  if (!token) {
    console.error('login needed')
    return response(res, 401)
  }

  next()
}

const isValidToken = async (token: string): Promise<boolean> => {
  try {
    const secret = process.env.JWT_SECRET || 'JWT_SECRET'
    const decodedToken = jwt.verify(token, secret) as JWTtoken
    const user = await User.find({ username: decodedToken.username })

    if (user.length !== 1) {
      return false
    }

    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies

  if (!token) {
    console.error('no cookie header')
    return response(res, 401)
  }

  const result = await isValidToken(token)

  if (!result) {
    console.error('invalid token')
    return response(res, 401)
  }

  next()
}

export const getUserName = (req: Request) => {
  const { token } = req.cookies
  const secret = process.env.JWT_SECRET || 'JWT_SECRET'
  const { username } = jwt.verify(token, secret) as JWTtoken

  return username
}
