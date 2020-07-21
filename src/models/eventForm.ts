import { FieldError } from 'react-hook-form'

export interface EventForm {
  firstName: string
  lastName: string
  email: string
  date: string
}

export type InputType = 'text' | 'date' | 'email'

export type InputNames = keyof EventForm

interface EventInputs {
  name: InputNames
  type: InputType
  label?: string
}

type EventInputsList = EventInputs[]

export type EventFormErrors = Record<InputNames, FieldError>

export const eventFormRequiredFields: InputNames[] = [
  'date',
  'firstName',
  'lastName',
  'email',
]

export const eventsInputs: EventInputsList = [
  {
    type: 'text',
    name: 'firstName',
    label: 'first name',
  },
  {
    type: 'text',
    name: 'lastName',
    label: 'last name',
  },
  {
    type: 'email',
    name: 'email',
    label: 'email',
  },
  {
    type: 'date',
    name: 'date',
  },
]
