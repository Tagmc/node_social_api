import { Request } from 'express'
import User from './models/schemas/User.schema'
import { TokenPayLoad } from './models/requests/User.requests'
declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayLoad
    decoded_refresh_token?: TokenPayLoad
  }
}
