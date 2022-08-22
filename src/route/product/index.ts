import { Router } from 'express'
import { getProductDetails } from './product'

const router = Router()

router.get('/details/:productId', getProductDetails)

export default router
