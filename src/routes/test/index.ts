import { Router } from 'express'
import healthCheck from './healthCheck'

const router = Router()

router.get('/', healthCheck)

export default router
