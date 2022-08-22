import type { Request, Response } from 'express'
import PostCategory1 from '../../schema/postCategory1'
import PostCategory2 from '../../schema/postCategory2'
import TimeCategory from '../../schema/timeCategory'
import HardshipCategory from '../../schema/hardshipCategory'
import Situation from '../../schema/situation'
import { response } from '../../lib/utils'

export const getPostCategories = async (req: Request, res: Response) => {
  try {
    const category1s = await PostCategory1.find({}).select('_id tag')
    const category2s = await PostCategory2.find({}).select('_id tag')

    return response(res, 200, { category1s, category2s })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}

export const getPostOptionCategories = async (req: Request, res: Response) => {
  try {
    const timeCategories = await TimeCategory.find({}).select('_id time tag')
    const hardshipCategories = await HardshipCategory.find({}).select(
      '_id hard tag'
    )
    const situation = await Situation.find({}).select('_id tag')

    return response(res, 200, { timeCategories, hardshipCategories, situation })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
