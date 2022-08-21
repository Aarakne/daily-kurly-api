import type { Request, Response } from 'express'
import { Types } from 'mongoose'
import Post from '../../schema/post'
import User from '../../schema/user'
import { response, checkIfObjectId } from '../../lib/utils'
import { getImagePromises, getUserName } from '../../lib/post.helper'
import { INFINITE_SCROLL_POST_COUNT } from '../../constant/route/post'

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

    const post = await Post.create({
      writer: username,
      title,
      content: {
        images: imageUrls,
        text: content,
      },
      usedProducts: products.split(','),
      tags: tags ? tags.split(',') : [],
    })

    const user = await User.findOne({ username })
    user?.posts.push(post._id)
    await user?.save()

    return response(res, 201, { imageCount: imageUrls.length })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}

export const readPost = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)
    const postId = req.params.postId

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
    const postId = req.params.postId

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
    const postId = req.params.postId

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

export const readPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.params.page)

    if (isNaN(page)) {
      console.error('잘못된 page입니다.')
      return response(res, 400)
    }

    const posts = await Post.find({ deleted: false })
      .sort('-createdAt')
      .select('writer content likeCount title')
      .skip((page - 1) * INFINITE_SCROLL_POST_COUNT)
      .limit(INFINITE_SCROLL_POST_COUNT)

    const hasNext = posts.length !== 0

    return response(res, 200, { posts, hasNext })
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}

export const likePost = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)
    const postId = req.params.postId

    checkIfObjectId(res, postId)

    const post = await Post.findOne({ _id: postId, deleted: false })
    const user = (await User.findOne({ username }))!

    if (!post) {
      console.error('잘못된 게시글을 요청했습니다.')
      return response(res, 404)
    }

    const index = user.likedPosts
      .map((id) => id.toString())
      .indexOf(postId) as number
    if (index === -1) {
      // 좋아요
      post.likeCount++
      user.likedPosts.push(new Types.ObjectId(postId))
    } else {
      // 좋아요 취소
      post.likeCount--
      user.likedPosts.splice(index, 1)
    }

    await post.save()
    await user.save()

    return response(res, 200)
  } catch (err) {
    console.error(err)
    return response(res, 500)
  }
}
