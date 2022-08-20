import { Router } from 'express'
import test from './test/index'

const apiRouter = Router()

apiRouter.use('/test', test)

export default apiRouter
