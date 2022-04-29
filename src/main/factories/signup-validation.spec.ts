import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../presentation/helpers/validatiors/validation-composite/validation-composite'
import { RequeredFieldValidation } from '../../presentation/helpers/validatiors/required-field-validation/required-field-validation'
import { Validation } from '../../presentation/helpers/validatiors/validation'
import { CompareFieldValidation } from '../../presentation/helpers/validatiors/compare-field-validation/compare-field-validation'
import { EmailValidation } from '../../presentation/helpers/validatiors/email-validation/email-validation'
import { EmailValidator } from '../../presentation/protocols/email-validator'

jest.mock('../../presentation/helpers/validatiors/validation-composite/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequeredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})