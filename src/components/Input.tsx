import { makeStyles } from '@material-ui/core/styles'
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField'
import * as React from 'react'
import { memo, ReactElement } from 'react'
import { Control, Controller } from 'react-hook-form'
import { InputType, EventForm } from 'src/models/eventForm'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})

interface Props extends BaseTextFieldProps {
  id: string
  control: Control<EventForm>
  name: keyof EventForm
  error: boolean
  testId: string
  label?: string
  type?: InputType
}

export const Input = memo(
  ({
    id,
    control,
    name,
    label,
    type = 'text',
    value,
    testId,
    ...rest
  }: Props): ReactElement => {
    const classes = useStyles()
    return (
      <Controller
        {...rest}
        as={
          <TextField
            id={id}
            label={label || ''}
            variant="outlined"
            type={type}
            classes={{ root: classes.root }}
            inputProps={{ 'data-testid': testId }}
          />
        }
        control={control}
        name={name}
      />
    )
  },
)
