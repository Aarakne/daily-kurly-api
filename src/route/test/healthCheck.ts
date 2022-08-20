import type { Request, Response, NextFunction } from 'express'
import response from '../../lib/response'

const healthCheck = (_: Request, res: Response, next: NextFunction) => {
  try {
    response(res, 200)
  } catch (err) {
    return next(err)
  }
}

export default healthCheck
