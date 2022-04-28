import { ValidationComposite } from '../../presentation/helpers/validatiors/validation-composite'
import { RequeredFieldValidation } from '../../presentation/helpers/validatiors/required-field-validation'
import { Validation } from '../../presentation/helpers/validatiors/validation'
import { CompareFieldValidation } from '../../presentation/helpers/validatiors/compare-field-validation'

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequeredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    return new ValidationComposite(validations)
}