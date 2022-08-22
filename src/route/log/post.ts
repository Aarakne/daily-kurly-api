import type { Request, Response } from 'express'
import Post from '../../schema/post'
import Product from '../../schema/product'
import ProductTracingLog from '../../schema/productTracingLog'
import { getUserName } from '../../lib/auth.helper'
import { checkIfObjectId, response } from '../../lib/utils'

export const logProductInfo = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)
    const { postId, productId, boughtProduct } = req.body

    if (!checkIfObjectId(postId)) {
      return response(res, 400, { status: 'invalid ObjectId' })
    }
    if (!checkIfObjectId(productId)) {
      return response(res, 400, { status: 'invalid ObjectId' })
    }

    const post = await Post.findById(postId)
    const product = await Product.findById(productId)

    if (!post || !product) {
      console.error('post나 product에 대해 잘못된 ObjectId를 입력했습니다.')
      return response(res, 400)
    }

    await ProductTracingLog.create({
      username,
      postId,
      productId,
      boughtProduct,
    })

    return response(res, 201)
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
