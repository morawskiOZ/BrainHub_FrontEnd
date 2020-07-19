import { eventsInputs } from 'src/models/eventForm'

export const fieldRequired = (fieldName: string): string => {
  const input = eventsInputs.find(event => event.name === fieldName)
  if (!input) return ''
  const label = input.label || input.name
  return `Field ${label} is required`
}
export const emailFormat = 'Wrong email format'
export const dateFormat = 'Wrong date format'
