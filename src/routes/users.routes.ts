import { emailVerifyTokenValidator, refreshTokenValidator } from './../middlewares/users.middlewares'
import { Router } from 'express'
import { emailVerifyController, loginController, logoutController, registerController } from '~/controllers/users.controllers'
import { accessTokenValidator, loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

/*
Description. Login a user
Path:  /login
Method: POST
Body: { email: string, password: string }
*/
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
/*
Description. Register a new user
Path:  /register
Method: POST
Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
*/
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
/*
Description. Logout a user
Path:  /logout
Method: POST
Body: { refresh_token: string}
*/
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
/*
Description. Verify email when user client click on the link in email
Path:  /verify-email
Method: POST
Body: { email_verify_token: string}
*/
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyController))

export default usersRouter
