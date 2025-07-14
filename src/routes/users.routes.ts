import { emailVerifyTokenValidator, forgotPasswordValidator, refreshTokenValidator } from './../middlewares/users.middlewares'
import { Router } from 'express'
import { emailVerifyController, forgotPasswordController, loginController, logoutController, registerController, resendVerifyEmailController } from '~/controllers/users.controllers'
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
Header: { Authorization: Bearer <token>}
*/
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
/*
Description. Verify email when user client click on the link in email
Path:  /verify-email
Method: POST
Body: { email_verify_token: string}
*/
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyController))
/*
Description. Verify email when user client click on the link in email
Path:  /resend-verify-email
Method: POST
Header: { Authorization: Bearer <token>}
*/
usersRouter.post('/resend-verify-email', accessTokenValidator, emailVerifyTokenValidator, wrapRequestHandler(resendVerifyEmailController))
/*
Description. Submit email to reset password, send email to user
Path:  /forgot-password
Method: POST
Header: { email: string }
*/
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))
export default usersRouter
