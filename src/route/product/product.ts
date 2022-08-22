import type { Request, Response } from 'express'
import Product from '../../schema/product'
import { response, checkIfObjectId } from '../../lib/utils'
import { PRODUCT_KEYS } from '../../constant/route/index'

export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId

    checkIfObjectId(res, productId)

    const product = await Product.findById(productId).select('-deleted')
    if (!product) {
      console.error('잘못된 상품을 요청했습니다.')
      return response(res, 404)
    }

    const relatedProducts = await Product.find({
      cat3: product.cat3,
    }).select(PRODUCT_KEYS)

    return response(res, 200, {
      product,
      relatedProducts,
    })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
