import { Router } from 'express'
import auth from './auth/index'
import log from './log/index'
import me from './me/index'
import meta from './meta'
import post from './post/index'
import product from './product/index'
import test from './test/index'

const apiRouter = Router()

apiRouter.use('/auth', auth)
apiRouter.use('/log', log)
apiRouter.use('/me', me)
apiRouter.use('/meta', meta)
apiRouter.use('/post', post)
apiRouter.use('/product', product)
apiRouter.use('/test', test)

export default apiRouter
