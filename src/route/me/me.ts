import type { Request, Response } from 'express'
import User from '../../schema/user'
import { response } from '../../lib/utils'
import { getUserName } from '../../lib/post.helper'

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
