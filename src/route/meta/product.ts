import type { Request, Response } from 'express'
import ProductCategory1 from '../../schema/productCategory1'
import ProductCategory2 from '../../schema/productCategory2'
import ProductCategory3 from '../../schema/productCategory3'
import { response } from '../../lib/utils'

export const getProductCategories = async (_: Request, res: Response) => {
  try {
    const categories = await ProductCategory1.find({})
      .select('tag category2 -_id')
      .populate({
        path: 'category2',
        select: 'tag -_id',
        model: ProductCategory2,
        populate: {
          path: 'category3',
          select: 'tag -_id',
          model: ProductCategory3,
        },
      })

    return response(res, 200, { categories })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
