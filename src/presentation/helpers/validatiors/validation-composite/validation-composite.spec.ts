import { MissingParamError } from '../../../errors'
import { ValidationComposite } from './validation-composite'
import { Validation } from '../validation';

const makeSut = (): ValidationComposite => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }
  return new ValidationComposite([new ValidationStub])
}

describe('Validation Composite', () => {
  test('Should return an if any validation fails', () => {
    const error = makeSut().validate({ field: 'any_value'})
    expect(error).toEqual(new MissingParamError('field'))
  })
//   test('Should not return if validation succeeds', () => {
//     const error = makeSut().validate({ field: 'any_name' })
//     expect(error).toBeFalsy()
//   })
})