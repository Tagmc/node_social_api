import { NextFunction, Response, Request } from 'express'
import { omit } from 'lodash'
import httpStatus from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ErrorWithStatus) {
    res.status(error.status).json(omit(error, ['status']))
  }
  Object.getOwnPropertyNames(error).forEach((key) => {
    Object.defineProperty(error, key, { enumerable: true })
  })

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: error.message,
    errorInfo: omit(error, ['stack'])
  })
}
