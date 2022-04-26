import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  constructor() {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    
    if (!email) {
      return new Promise(
        res => res(
          badRequest(new MissingParamError('email'))
        )
      )
    }
    if (!password) {
      return new Promise(
        res => res(
          badRequest(new MissingParamError('password'))
        )
      )
    }
  }
}