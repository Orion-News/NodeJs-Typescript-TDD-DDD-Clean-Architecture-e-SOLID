import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../presentation/helpers/validatiors/validation-composite'
import { RequeredFieldValidation } from '../../presentation/helpers/validatiors/required-field-validation'
import { Validation } from '../../presentation/helpers/validatiors/validation'

jest.mock('../../presentation/helpers/validatiors/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequeredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})