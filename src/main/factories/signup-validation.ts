import { ValidationComposite } from '../../presentation/helpers/validatiors/validation-composite'
import { RequeredFieldValidation } from '../../presentation/helpers/validatiors/required-field-validation'
import { Validation } from '../../presentation/helpers/validatiors/validation'

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequeredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}