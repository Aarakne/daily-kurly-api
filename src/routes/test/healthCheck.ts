import { Request, Response, NextFunction } from 'express'

const healthCheck = (_: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success' })
  } catch (err) {
    return next(err)
  }
}

export default healthCheck
