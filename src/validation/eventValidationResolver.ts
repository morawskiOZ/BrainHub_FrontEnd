import { ResolverResult } from 'react-hook-form/dist/types/form'
import {
  EventFormErrors,
  eventFormRequiredFields,
  EventForm,
} from 'src/models/eventForm'
import { validateDate } from './validators/date'
import { validateEmail } from './validators/email'
import { fieldRequired, emailFormat, dateFormat } from './errorMessages'

export const FE_ERROR_TYPE = 'frontend_validation'
export const BE_ERROR_TYPE = 'backend_validation'

export const eventValidationResolver = (
  values: EventForm,
): Promise<ResolverResult<EventForm>> => {
  let errors: EventFormErrors
  // Empty Field validation
  eventFormRequiredFields.forEach(name => {
    if (!values[name]) {
      errors = {
        ...errors,
        [name]: { type: FE_ERROR_TYPE, message: fieldRequired(name) },
      }
    }
  })

  // Second validation for email
  if (!errors?.email) {
    const isEmailValid: boolean = validateEmail(values.email)

    if (!isEmailValid) {
      errors = {
        ...errors,
        email: {
          type: FE_ERROR_TYPE,
          message: emailFormat,
        },
      }
    }
  }

  // Second validation for date
  if (!errors?.date) {
    const isDateValid: boolean = validateDate(values.date)
    if (!isDateValid) {
      errors = {
        ...errors,
        date: {
          type: FE_ERROR_TYPE,
          message: dateFormat,
        },
      }
    }
  }
  if (errors) {
    return Promise.resolve({ errors, values: {} })
  }
  return Promise.resolve({ values, errors: {} })
}
