import type { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { response } from './utils'

export const validatorError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = validationResult(req)

  if (!err.isEmpty()) {
    console.error('necessary inputs are omitted')
    return response(res, 400)
  }

  next()
}
