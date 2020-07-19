import { eventFormRequiredFields } from 'src/models/eventForm'
import { fieldRequired } from './errorMessages'
import { FE_ERROR_TYPE } from './eventValidationResolver'

export const allFieldsRequiredEmptyErrors = eventFormRequiredFields.reduce(
  (allErrors, inputName) => {
    return {
      ...allErrors,
      [inputName]: { type: FE_ERROR_TYPE, message: fieldRequired(inputName) },
    }
  },
  {},
)
