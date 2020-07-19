import * as React from 'react'
import { EventForm } from 'src/models/eventForm'
import { Form } from '../components/Form'

const SchedulePage = (): React.ReactElement => {
  const defaultValues: EventForm = {
    firstName: '',
    lastName: '',
    date: '',
    email: '',
  }

  return (
    <div data-testid="page-schedule">
      <Form defaultValues={defaultValues} />
    </div>
  )
}
export default SchedulePage
