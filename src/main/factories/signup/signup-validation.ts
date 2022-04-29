import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite/validation-composite'
import { RequeredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation/required-field-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { CompareFieldValidation } from '../../../presentation/helpers/validators/compare-field-validation/compare-field-validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation/email-validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequeredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
}