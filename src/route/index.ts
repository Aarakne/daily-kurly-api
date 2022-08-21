import { Router } from 'express'
import auth from './auth/index'
import me from './me/index'
import post from './post/index'
import test from './test/index'

const apiRouter = Router()

apiRouter.use('/auth', auth)
apiRouter.use('/me', me)
apiRouter.use('/posts', post)
apiRouter.use('/test', test)

export default apiRouter
