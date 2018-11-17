import { Map } from 'immutable'

// The validate utility checks the provided values against the provided validation.
// The utility receives two arguments in the following format:
//
// formValidation = Immutable.fromJS({
//   email: {
//     validators: [
//       {
//         validator: isRequired,
//         message: 'This field is required'
//       },
//       {
//         validator: isValidEmail,
//         message: 'Please provide a valid email'
//       }
//     ]
//   }
// })
//
// fields = Map({
//   email: 'test@example.com'
// })

export const validate = (formValidation = Map(), fields = Map()) => {

  // Loop through validated fields
  return formValidation.reduce((errors, fieldValidation, key) => {

    // Get the currently set value
    const fieldValue = fields.get(key)

    // Helper that runs validation function and returns error message
    const getFieldError = (v, f) => {
      const validator = f.get('validator')
      const message = f.get('message')

      return !validator(fieldValue) ? message : v
    }

    // Get the first error where not valid (false if valid)
    const fieldError = fieldValidation.get('validators').reduceRight(getFieldError, '')

    // If there is an error append to errors
    if (fieldError) return errors.set(key, fieldError)

    // If no error, don't add the field to errors
    return errors
  }, Map())
}
