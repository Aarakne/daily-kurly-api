import type { Request, Response } from 'express'
import Post from '../../schema/post'
import User from '../../schema/user'
import { response, checkIfObjectId } from '../../lib/utils'
import { getImagePromises, getUserName } from '../../lib/post.helper'

// TODO: category 추가, populate 추가

export const createPost = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)
    const { title, content, products, tags } = req.body
    const files = req.files as Express.Multer.File[]

    if (!products || products.split(',').length < 1) {
      console.error('구입한 상품 없이 게시글을 올릴 수 없습니다.')
      return response(res, 400)
    }

    const { imageUrls, promises } = getImagePromises(files, username)

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
    const username = getUserName(req)
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

export const updatePost = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)
    const postId = req.path.slice(1)

    checkIfObjectId(res, postId)

    const post = await Post.findOne({
      _id: postId,
      deleted: false,
      writer: username,
    })

    if (!post) {
      console.error('잘못된 게시글을 요청했습니다.')
      return response(res, 404)
    }

    const { title, content, products, tags } = req.body
    const files = req.files as Express.Multer.File[]

    if (!products || products.split(',').length < 1) {
      console.error('구입한 상품 없이 게시글을 올릴 수 없습니다.')
      return response(res, 400)
    }

    const { imageUrls, promises } = getImagePromises(files, username)

    await Promise.all(promises)

    post.title = title
    post.content = {
      images: imageUrls,
      text: content,
    }
    post.usedProducts = products.split(',')
    post.tags = tags ? tags.split(',') : []

    await post.save()

    return response(res, 200, { imageCount: imageUrls.length })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)
    const postId = req.path.slice(1)

    checkIfObjectId(res, postId)

    const post = await Post.findOne({
      _id: postId,
      deleted: false,
      writer: username,
    })

    if (!post) {
      console.error('잘못된 게시글을 요청했습니다.')
      return response(res, 404)
    }

    post.deleted = true

    await post.save()

    return response(res, 200)
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
