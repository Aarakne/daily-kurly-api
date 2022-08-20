import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import path from 'path'
import type { JWTtoken } from 'routeType'
import Post from '../../schema/post'
import { s3Upload } from '../../lib/aws.helper'
import { response, makeHash } from '../../lib/utils'
import { allowedExtensions } from '../../constant/route/post'

// TODO: category 추가

export const createPost = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies
    const secret = process.env.JWT_SECRET || 'JWT_SECRET'
    const { username } = jwt.verify(token, secret) as JWTtoken
    const { title, content, products, tags } = req.body
    const files = req.files as Express.Multer.File[]

    if (!products || products.split(',').length < 1) {
      console.error('구입한 상품 없이 게시글을 올릴 수 없습니다.')
      return response(res, 400)
    }

    const imageUrls = []
    const promises = []

    for (const file of files) {
      const hash = makeHash(file.buffer.toString('base64'))
      const extension = path.extname(file.originalname)
      const fileName = `${hash}.${extension}`

      if (!allowedExtensions.includes(extension)) {
        console.error('잘못된 확장자입니다. 저장하지 않습니다.')
        continue
      }

      imageUrls.push(fileName)
      promises.push(s3Upload(`${username}/${fileName}`, file.buffer))
    }

    await Promise.all(promises)

    await Post.create({
      writer: username,
      title,
      content: {
        images: imageUrls,
        text: content,
      },
      usedProducts: products.split(','),
      tags: tags ? tags.split(',') : [],
    })

    return response(res, 201, { imageCount: imageUrls.length })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
