import { Router } from 'express'
import auth from './auth/index'
import post from './post/index'
import test from './test/index'

const apiRouter = Router()

apiRouter.use('/auth', auth)
apiRouter.use('/posts', post)
apiRouter.use('/test', test)

export default apiRouter
