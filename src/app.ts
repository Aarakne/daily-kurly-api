import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import createError, { HttpError } from 'http-errors'
import apiRouter from './routes/index'
import { CORS_ALLOWED } from './constants/index'

const init = () => {
  const app = express()

  app.use(cors({ origin: CORS_ALLOWED, credentials: true }))
  app.use(helmet({ contentSecurityPolicy: false }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(
    mongoSanitize({
      replaceWith: '_',
    })
  )

  app.use('/', apiRouter)

  app.use(
    (err: Error | HttpError, _: Request, res: Response, __: NextFunction) => {
      if (createError.isHttpError(err)) {
        if (err.statusCode >= 500) {
          console.error(err)
        } else {
          res.statusCode = err.statusCode
          res.json({ error: err.message })
        }
      } else {
        res.statusCode = 500
        res.json({ error: err.message })
      }
    }
  )

  return app
}

export default init
