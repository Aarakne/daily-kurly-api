import type { Request, Response } from 'express'
import ProductCategory1 from '../../schema/productCategory1'
import ProductCategory2 from '../../schema/productCategory2'
import ProductCategory3 from '../../schema/productCategory3'
import { response } from '../../lib/utils'
import { CATEGORY_KEYS } from '../../constant/route/index'

export const getProductCategories = async (req: Request, res: Response) => {
  try {
    const category1s = await ProductCategory1.find({}).select(CATEGORY_KEYS)
    const category2s = await ProductCategory2.find({}).select(CATEGORY_KEYS)
    const category3s = await ProductCategory3.find({}).select(CATEGORY_KEYS)

    return response(res, 200, { category1s, category2s, category3s })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
