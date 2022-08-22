import type { Response } from 'express'
import { Types } from 'mongoose'
import type { status, statusMsg } from 'libType'
import crypto from 'crypto'

const statusToMsg: Record<status, statusMsg> = {
  200: 'success',
  201: 'created',
  400: 'bad request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not found',
  409: 'data redundancy',
  500: 'server error',
}

export const response = (res: Response, statusCode: status, payload?: any) => {
  res.status(statusCode).json({ status: statusToMsg[statusCode], ...payload })
}

export const makeHash = (data: string, algorithm: string = 'sha512') => {
  return crypto.createHash(algorithm).update(data).digest('hex')
}

export const checkIfObjectId = (objectId: string) => {
  if (!Types.ObjectId.isValid(objectId)) {
    return false
  }

  return true
}
