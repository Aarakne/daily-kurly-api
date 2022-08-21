import type { Request } from 'express'
import jwt from 'jsonwebtoken'
import type { JWTtoken, imagePromises } from 'routeType'
import path from 'path'
import { makeHash } from './utils'
import { allowedExtensions } from '../constant/route/post'
import { s3Upload } from './aws.helper'

export const getUserName = (req: Request) => {
  const { token } = req.cookies
  const secret = process.env.JWT_SECRET || 'JWT_SECRET'
  const { username } = jwt.verify(token, secret) as JWTtoken

  return username
}

export const getImagePromises = (
  files: Express.Multer.File[],
  username: string
): imagePromises => {
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

  return {
    imageUrls,
    promises,
  }
}
