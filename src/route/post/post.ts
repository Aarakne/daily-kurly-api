import type { Request, Response } from 'express'
import { Types } from 'mongoose'
import Post from '../../schema/post'
import User from '../../schema/user'
import { response, checkIfObjectId } from '../../lib/utils'
import { getUserName } from '../../lib/auth.helper'
import { getImagePromises } from '../../lib/post.helper'
import { INFINITE_SCROLL_POST_COUNT } from '../../constant/route/post'
import { PRODUCT_KEYS } from '../../constant/route'

export const createPost = async (req: Request, res: Response) => {
  try {
    const username = getUserName(req)
    const { title, text, products, tags, category1, category2 } = req.body
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
        text: text ?? '',
      },
      usedProducts: products.split(','),
      tags: tags ? tags.split(',') : [],
      category1: category1 ?? '',
      category2: category2 ?? '',
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

    if (!checkIfObjectId(postId)) {
      return response(res, 404, { status: 'invalid ObjectId' })
    }

    const post = await Post.findOne({ _id: postId, deleted: false }).populate({
      path: 'usedProducts',
      select: `${PRODUCT_KEYS} relatedProduct`,
      populate: {
        path: 'relatedProduct',
        select: PRODUCT_KEYS,
      },
    })

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
      category1: post.category1,
      category2: post.category2,
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

    if (!checkIfObjectId(postId)) {
      return response(res, 404, { status: 'invalid ObjectId' })
    }

    const post = await Post.findOne({
      _id: postId,
      deleted: false,
      writer: username,
    })

    if (!post) {
      console.error('잘못된 게시글을 요청했습니다.')
      return response(res, 404)
    }

    const { title, text, products, tags, category1, category2 } = req.body
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
      text,
    }
    post.usedProducts = products.split(',')
    post.tags = tags ? tags.split(',') : []
    post.category1 = category1 ?? ''
    post.category2 = category2 ?? ''

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

    if (!checkIfObjectId(postId)) {
      return response(res, 404, { status: 'invalid ObjectId' })
    }

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
    const page = parseInt(req.query.page as string)
    const cat2 = req.query.cat2 as string[] | undefined

    if (isNaN(page)) {
      console.error('잘못된 page 요청입니다.')
      return response(res, 404)
    }

    const category2Option = cat2
      ? {
          category2: {
            $in: cat2,
          },
        }
      : {} // 필터링 조건이 없다면

    const posts = await Post.find({
      deleted: false,
      ...category2Option,
    })
      .sort('-createdAt')
      .select('writer content likeCount title')
      .skip((page - 1) * INFINITE_SCROLL_POST_COUNT)
      .limit(INFINITE_SCROLL_POST_COUNT)

    const hasNext = !(posts.length < INFINITE_SCROLL_POST_COUNT)

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

    if (!checkIfObjectId(postId)) {
      return response(res, 404, { status: 'invalid ObjectId' })
    }

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
