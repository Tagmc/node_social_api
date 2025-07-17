import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'
import usersService from '~/services/users.services'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import {
  ForgotPasswordBody,
  LogoutRequestBody,
  RegisterRequestBody,
  ResetPasswordReqBody,
  TokenPayLoad,
  VerifyEmailReqBody,
  VerifyForgotPasswordReqBody
} from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import { usersMessages } from '~/constants/messages'
import databaseService from '~/services/database.services'
import httpStatus from '~/constants/httpStatus'
import { UserVerifyStatus } from '~/constants/enums'
type ResponseController = (req: Request, res: Response, next: NextFunction) => void
export const loginController: ResponseController = async (req: Request, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login(user_id.toString())
  return res.status(httpStatus.OK).json({
    message: usersMessages.LOGIN_SUCCESS,
    result
  })
}
export const registerController: ResponseController = async (
  req: Request<ParamsDictionary, any, RegisterRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  return res.status(httpStatus.CREATED).json({
    message: usersMessages.REGISTER_SUCCESS,
    result: result
  })
}
export const logoutController: ResponseController = async (
  req: Request<ParamsDictionary, any, LogoutRequestBody>,
  res: Response
) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  return res.status(httpStatus.OK).json({
    result
  })
}
export const emailVerifyController: ResponseController = async (
  req: Request<ParamsDictionary, any, VerifyEmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayLoad
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: usersMessages.USER_NOT_FOUND
    })
  }
  // Đã verify thi se tra  ve status OK  voi message da verify
  if (user.email_verify_token == '') {
    return res.status(httpStatus.OK).json({
      message: usersMessages.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  // Chưa verify
  const result = await usersService.verifyEmail(user_id)
  return res.status(httpStatus.OK).json({
    message: usersMessages.EMAIL_VERIFED_SUCCESS,
    result
  })
}
export const resendVerifyEmailController: ResponseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: usersMessages.USER_NOT_FOUND
    })
  }
  if (user.verify === UserVerifyStatus.Verified) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: usersMessages.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  const result = await usersService.resendVerifyEmail(user_id)
  return res.status(httpStatus.ACCEPTED).json({
    result
  })
}
export const forgotPasswordController: ResponseController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordBody>,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user as User 
  const result = await usersService.forgotPassword((_id as ObjectId).toString())
  return res.status(httpStatus.OK).json({
    result
  })
}
export const verifyForgotPasswordController: ResponseController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  return res.status(httpStatus.OK).json({
    message: usersMessages.VERIFY_FORGOT_PASSWORD_SUCCESS
  })
}
export const resetPasswordController: ResponseController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_forgot_password_token as TokenPayLoad
  const {password} = req.body
  const result = await usersService.resetPassword(user_id, password)
  return res.status(httpStatus.OK).json({
    result
  })
}