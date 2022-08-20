import type { Response } from 'express'
import type { status, statusMsg } from 'libType'

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

const response = (
  res: Response,
  statusCode: status,
  payload?: Record<string, string | object[] | number | undefined>
) => {
  res.status(statusCode).json({ status: statusToMsg[statusCode], ...payload })
}

export default response
