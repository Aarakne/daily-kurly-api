import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import createError from 'http-errors'
import type { HttpError } from 'http-errors'
import apiRouter from './route/index'
import { CORS_ALLOWED } from './constant/index'

const init = () => {
  const app = express()

  app.use(cors({ origin: CORS_ALLOWED, credentials: true }))
  app.use(helmet({ contentSecurityPolicy: false }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
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

/**
 * 1. 카테고리 전부 각각 반환하는 라우터를 만든다. + swagger를 수정한다. //
 * 2. product 상세 api를 만들고 relatedProduct도 같이 전달한다. //
 * 3. 구입 내역 product api를 만든다. //
 * 4. post 스키마를 변경하고 데이터를 넣어본다.
 * 5. post CRUD를 다시 확인한다.
 * 로그(postId, productId, username)
 */
