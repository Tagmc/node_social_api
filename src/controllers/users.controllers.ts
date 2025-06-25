import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'
import usersService from '~/services/users.services'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import { LogoutRequestBody, RegisterRequestBody } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import { usersMessages } from '~/constants/messages'
type ResponseController = (req: Request, res: Response, next: NextFunction) => void
export const loginController: ResponseController = async (req: Request, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login(user_id.toString())
  return res.status(200).json({
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
  return res.status(201).json({
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
  return res.status(200).json({
    result
  })
}
