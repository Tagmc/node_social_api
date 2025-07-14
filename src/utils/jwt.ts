import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from 'dotenv'
import { TokenPayLoad } from '~/models/requests/User.requests'
config()
//cai thu vien xong van bao loi la do chua cai type cua no
// voi nhung ham nhieu tham so thi uu tien dung object de truyen tham so
export const signToken = ({
  payload,
  privateKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        throw reject(err)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({
  token,
  privateKey
}: {
  token: string
  privateKey: string
}) => {
  return new Promise<TokenPayLoad>((resolve, reject) => {
    jwt.verify(token, privateKey, (error, token_decoded) => {
      if (error) {
        throw reject(error)
      }
      resolve(token_decoded as TokenPayLoad)
    })
  })
}
