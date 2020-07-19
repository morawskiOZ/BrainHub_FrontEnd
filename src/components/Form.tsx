import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import * as React from 'react'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { EventForm, eventsInputs } from 'src/models/eventForm'
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
    formState: { isDirty, isSubmitted, touched },
  } = useForm<EventForm>({
    defaultValues,
    resolver: async data => eventValidationResolver(data),
  })
  // eslint-disable-next-line no-console
  const onSubmit = data => console.log(data)

  const shouldShowError = (isDirty || isSubmitted || touched) && errors

  return (
    <form data-testid="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" justify="flex-start" spacing={1}>
        {eventsInputs.map(({ name, type, label }) => {
          return (
            <Grid item xs={12} md={6} lg={3} key={name}>
              <Input
                control={control}
                id={name}
                name={name}
                data-testid={`input-${name}`}
                error={shouldShowError && !!errors[name]}
                label={label || ''}
                type={type}
                helperText={errors[name] && errors[name].message}
              />
            </Grid>
          )
        })}
        <Grid container item xs={12} md={6} lg={3} justify="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            data-testid="form-submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
