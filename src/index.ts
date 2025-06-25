import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import dotenv from 'dotenv'
import { defaultErrorHandler } from './middlewares/errors.middleware'
dotenv.config()
const app = express()
const PORT = 3000
app.use(express.json())
databaseService.connect()
app.use('/users', usersRouter)
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`)
})
