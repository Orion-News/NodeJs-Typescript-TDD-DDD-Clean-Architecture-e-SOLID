import { MissingParamError } from '../../../errors'
import { RequeredFieldValidation } from './required-field-validation'

const makeSut = (): RequeredFieldValidation => {
  return new RequeredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const error = makeSut().validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const error = makeSut().validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})