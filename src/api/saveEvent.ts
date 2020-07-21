import { EventForm, EventFormErrors } from 'src/models/eventForm'
import { BE_ERROR_TYPE } from 'src/validation/eventValidationResolver'

export const saveEventUrl = `${process.env.GATSBY_API_URL}/dev/events`

export const saveEvent = async (
  data: EventForm,
): Promise<{ success: boolean; errors: Partial<EventFormErrors> }> => {
  try {
    const response = await fetch(saveEventUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.status === 200) {
      return { success: true, errors: null }
    }

    const json = await response.json()

    if (response.status === 422) {
      if (Array.isArray(json.errors)) {
        const errors = json.errors.reduce((allErrors, currError) => {
          const name = Object.keys(currError)[0]
          return {
            ...allErrors,
            [name]: { message: currError[name], type: BE_ERROR_TYPE },
          }
        }, {})
        return { success: false, errors }
      }
    }
    return {
      success: false,
      errors: {
        firstName: { message: 'Unknown Server error', type: BE_ERROR_TYPE },
      },
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e)
  }
  return { success: false, errors: null }
}
