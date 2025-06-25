import httpStatus from '~/constants/httpStatus'
import { usersMessages } from '~/constants/messages'

type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
  // 422: [field:string] {
  //  msg: string, location: string, value: any
  // }
> //{[key: string]: string}
export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  constructor({ message = usersMessages.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: httpStatus.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
