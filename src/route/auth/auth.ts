import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { response } from '../../lib/utils'
import User from '../../schema/user'
import { SALT_ROUND, PASSWORD_REGEX, REASON } from '../../constant/route/auth'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    const duplicatedId = (await User.count({ username })) >= 1

    if (duplicatedId) {
      console.error(`username: ${username} is a ${REASON.DUPLICATED_ID}`)
      return response(res, 403, { status: REASON.DUPLICATED_ID })
    } else if (!PASSWORD_REGEX.test(password)) {
      console.error(REASON.INVALID_PASSWORD)
      return response(res, 400, { status: REASON.INVALID_PASSWORD })
    }

    const hash = await bcrypt.hash(password, SALT_ROUND)

    await User.create({
      username,
      password: hash,
    })

    console.info(`user created. username: ${username}`)
    return response(res, 201)
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    const user = await User.find({ username })

    if (user.length > 1) {
      console.error(REASON.MULTIPLE_USERS)
      return response(res, 500)
    } else if (user.length < 1) {
      console.error(REASON.USERNAME_NOT_MATCHED)
      return response(res, 401, { status: REASON.USERNAME_NOT_MATCHED })
    }

    const result = await bcrypt.compare(password, user[0].password)
    if (!result) {
      console.error(REASON.PASSWORD_NOT_MATCHED)
      return response(res, 401, { status: REASON.PASSWORD_NOT_MATCHED })
    }

    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET || 'JWT_SECRET',
      {
        algorithm: 'HS512',
      }
    )

    res.cookie('token', token, {
      httpOnly: true,
      domain: 'localhost', // TODO: 변경해야 함
      sameSite: 'strict',
    })

    return response(res, 200)
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}

export const removeCookie = (_: Request, res: Response) => {
  try {
    res.clearCookie('token')

    return response(res, 200)
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
