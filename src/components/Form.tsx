import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import * as React from 'react'
import { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  EventForm,
  EventFormErrors,
  eventsInputs,
  InputNames,
} from 'src/models/eventForm'
import { saveEvent } from '../api/saveEvent'
import { eventValidationResolver } from '../validation/eventValidationResolver'
import { Input } from './Input'

interface Props {
  defaultValues: EventForm
}

const useStyles = makeStyles({
  alert: {
    marginBottom: 10,
  },
  loading: {
    width: '100%',
  },
})

export const Form = ({ defaultValues }: Props): ReactElement => {
  const classes = useStyles()
  const [eventSaved, setEventSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
        <Alert
          classes={{ root: classes.alert }}
          data-testid="form-alert-success"
          onClose={closeAlertHandler}
        >
          Event was successfully saved!
        </Alert>
      )}
      <form data-testid="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" justify="flex-start" spacing={1}>
          {eventsInputs.map(({ name, type, label }) => {
            return (
              <Grid item xs={12} lg={4} key={name}>
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
          <Grid container item xs={12} lg={4} justify="center">
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
              <div data-testid="form-loading" className={classes.loading}>
                <LinearProgress />
              </div>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  )
}
