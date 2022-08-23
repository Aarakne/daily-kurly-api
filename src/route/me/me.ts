import type { Request, Response } from 'express'
import User from '../../schema/user'
import Purchase from '../../schema/purchase'
import Product from '../../schema/product'
import { checkIfObjectId, response } from '../../lib/utils'
import { getUserName } from '../../lib/auth.helper'
import { PRODUCT_KEYS } from '../../constant/route/index'

export const getMyPosts = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)

    const user = await User.findOne({ username })
      .populate({
        path: 'posts',
        select: '_id content likeCount',
        match: { deleted: false },
        options: { sort: { createdAt: -1 } },
      })
      .select('posts')

    if (!user) {
      console.error('존재하지 않는 유저입니다.')
      return response(res, 401)
    }

    return response(res, 200, { posts: user.posts })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}

export const getLikedPosts = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)

    const user = await User.findOne({ username })
      .populate({
        path: 'likedPosts',
        select: '_id content title',
        match: { deleted: false },
        options: { sort: { createdAt: -1 } },
      })
      .select('likedPosts')

    if (!user) {
      console.error('존재하지 않는 유저입니다.')
      return response(res, 401)
    }

    return response(res, 200, { likedPosts: user.likedPosts })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}

// unique 구매 상품
export const getProducts = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)

    const purchases = await Purchase.find({ username })

    const productIds = new Set()
    for (const purchase of purchases) {
      for (const productId of purchase.products) {
        productIds.add(productId.toString())
      }
    }

    const products = await Product.find({
      _id: {
        $in: Array.from(productIds),
      },
    }).select(PRODUCT_KEYS)

    return response(res, 200, { products })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)
    const { products } = req.body

    for (const productId of products) {
      if (!checkIfObjectId(productId)) {
        return response(res, 400, { status: 'invalid ObjectId' })
      }
    }

    await Purchase.create({
      username,
      products,
    })

    return response(res, 201)
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
