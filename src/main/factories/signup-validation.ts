import { ValidationComposite } from '../../presentation/helpers/validatiors/validation-composite'
import { RequeredFieldValidation } from '../../presentation/helpers/validatiors/required-field-validation'
import { Validation } from '../../presentation/helpers/validatiors/validation'
import { CompareFieldValidation } from '../../presentation/helpers/validatiors/compare-field-validation'
import { EmailValidation } from '../../presentation/helpers/validatiors/email-validation'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequeredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
}