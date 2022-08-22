import type { Request, Response } from 'express'
import PostCategory1 from '../../schema/postCategory1'
import PostCategory2 from '../../schema/postCategory2'
import { response } from '../../lib/utils'
import { CATEGORY_KEYS } from '../../constant/route/index'

export const getPostCategories = async (_: Request, res: Response) => {
  try {
    const category1s = await PostCategory1.find({}).select(CATEGORY_KEYS)
    const category2s = await PostCategory2.find({}).select(CATEGORY_KEYS)

    return response(res, 200, { category1s, category2s })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
