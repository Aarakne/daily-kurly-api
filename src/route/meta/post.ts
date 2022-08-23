import type { Request, Response } from 'express'
import PostCategory1 from '../../schema/postCategory1'
import PostCategory2 from '../../schema/postCategory2'
import { response } from '../../lib/utils'

export const getPostCategories = async (_: Request, res: Response) => {
  try {
    const categories = await PostCategory1.find({})
      .select('tag category2 -_id')
      .populate({
        path: 'category2',
        select: 'tag -_id',
        model: PostCategory2,
      })

    return response(res, 200, { categories })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
