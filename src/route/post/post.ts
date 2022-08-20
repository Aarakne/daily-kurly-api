import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import path from 'path'
import type { JWTtoken } from 'routeType'
import Post from '../../schema/post'
import User from '../../schema/user'
import { s3Upload } from '../../lib/aws.helper'
import { response, makeHash, checkIfObjectId } from '../../lib/utils'
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
      const fileName = `${username}/${hash}.${extension}`

      if (!allowedExtensions.includes(extension)) {
        console.error('잘못된 확장자입니다. 저장하지 않습니다.')
        continue
      }

      imageUrls.push(`s3://${process.env.AWS_S3_BUCKET_NAME!}/${fileName}`)
      promises.push(s3Upload(fileName, file.buffer)) // promise 객체 저장
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

export const readPost = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies
    const secret = process.env.JWT_SECRET || 'JWT_SECRET'
    const { username } = jwt.verify(token, secret) as JWTtoken
    const postId = req.path.slice(1)

    checkIfObjectId(res, postId)

    const post = await Post.findOne({ _id: postId, deleted: false })

    if (!post) {
      console.error('잘못된 게시글을 요청했습니다.')
      return response(res, 404)
    }

    const liked = (
      await User.findOne({ username }).select('likedPosts')
    )?.likedPosts.some((id) => id.toString() === postId)

    // TODO: 필요하면 populate 추가
    return response(res, 200, {
      title: post.title,
      content: post.content.text,
      images: post.content.images,
      tags: post.tags,
      products: post.usedProducts,
      likeCount: post.likeCount,
      liked,
    })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
