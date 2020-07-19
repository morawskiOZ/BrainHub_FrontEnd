import { ResolverResult } from 'react-hook-form/dist/types/form'
import {
  EventFormErrors,
  eventFormRequiredFields,
  EventForm,
} from 'src/models/eventForm'
import { validateDate } from './validators/date'
import { validateEmail } from './validators/email'
import { fieldRequired, emailFormat, dateFormat } from './errorMessages'

export const eventValidationResolver = (
  values: EventForm,
): Promise<ResolverResult<EventForm>> => {
  let errors: EventFormErrors
  const type = 'frontend_validation'

  // Empty Field validation
  eventFormRequiredFields.forEach(name => {
    if (!values[name]) {
      errors = { ...errors, [name]: { message: fieldRequired(name) } }
    }
  })

  // Second validation for email
  const isEmailValidate: boolean = validateEmail(values.email)
  if (!errors.email && !isEmailValidate) {
    errors = {
      ...errors,
      email: {
        type,
        message: emailFormat,
      },
    }
  }

  // Second validation for date
  const isDateValidate: boolean = validateDate(values.date)
  if (!errors.date && !isDateValidate) {
    errors = {
      ...errors,
      date: {
        type,
        message: dateFormat,
      },
    }
  }

  if (errors) {
    return Promise.resolve({ errors, values: {} })
  }
  return Promise.resolve({ values: {}, errors })
}
