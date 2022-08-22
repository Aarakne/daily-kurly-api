import type { Request, Response } from 'express'
import User from '../../schema/user'
import Purchase from '../../schema/purchase'
import Product from '../../schema/product'
import { response } from '../../lib/utils'
import { getUserName } from '../../lib/post.helper'
import { PRODUCT_KEYS } from '../../constant/route/index'

export const getMyPosts = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)

    const user = await User.findOne({ username })
      .populate({
        path: 'posts',
        select: '_id content',
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
        select: '_id content',
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
