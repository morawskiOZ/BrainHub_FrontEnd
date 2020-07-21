import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import * as React from 'react'
import { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  EventForm,
  eventsInputs,
  InputNames,
  EventFormErrors,
} from 'src/models/eventForm'
import Alert from '@material-ui/lab/Alert'
import { saveEvent } from '../api/saveEvent'
import { eventValidationResolver } from '../validation/eventValidationResolver'
import { Input } from './Input'

interface Props {
  defaultValues: EventForm
}

export const Form = ({ defaultValues }: Props): ReactElement => {
  const {
    control,
    handleSubmit,
    errors,

    formState: { isDirty, isSubmitted, isValid, isSubmitting },
    setError,
    reset,
  } = useForm<EventForm>({
    defaultValues,
    resolver: async data => eventValidationResolver(data),
  })
  const [eventSaved, setEventSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const closeAlertHandler = () => {
    setEventSaved(false)
    reset()
  }

  const onSubmitError = (submitErrors: Partial<EventFormErrors>): void => {
    Object.entries(submitErrors).forEach(([name, message]) => {
      setError(name as InputNames, message)
    })
  }

  const onSubmitSuccess = (): void => {
    setEventSaved(true)
  }

  const onSubmit = async (data: EventForm): Promise<void> => {
    setIsLoading(true)
    const { success, errors: err } = await saveEvent(data)

    if (!success && err) {
      onSubmitError(err)
    }
    if (success && !err) {
      onSubmitSuccess()
    }
    setIsLoading(false)
  }

  const shouldShowError = isDirty || isSubmitted
  return (
    <>
      {eventSaved && (
        <Alert data-testid="form-alert-success" onClose={closeAlertHandler}>
          Event was successfully saved!
        </Alert>
      )}
      <form data-testid="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" justify="flex-start" spacing={1}>
          {eventsInputs.map(({ name, type, label }) => {
            return (
              <Grid item xs={12} md={6} lg={3} key={name}>
                <Input
                  control={control}
                  id={name}
                  name={name}
                  testId={`input-${name}`}
                  error={shouldShowError && !!errors[name]}
                  label={label || ''}
                  type={type}
                  helperText={errors[name] && errors[name].message}
                />
              </Grid>
            )
          })}
          <Grid container item xs={12} md={6} lg={3} justify="center">
            {!isLoading ? (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                data-testid="form-submit"
                disabled={isSubmitting || (isSubmitted && !isValid)}
              >
                Submit
              </Button>
            ) : (
              <span data-testid="form-loading">...Loading</span>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  )
}
