import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import React from 'react'
import { EventForm } from 'src/models/eventForm'
import { Form } from './Form'

const defaultValues: EventForm = {
  firstName: '',
  lastName: '',
  date: '',
  email: '',
}

const correctData: EventForm = {
  firstName: 'Test',
  lastName: 'Testowy',
  date: '1990-01-01',
  email: 'test@test.pl',
}

const inCorrectData: EventForm = {
  firstName: 'Test',
  lastName: 'Testowy',
  date: '',
  email: 'wrong_email',
}

const setup = (data?: EventForm) => {
  const values = data || defaultValues
  const utils = render(<Form defaultValues={values} />)
  return { ...utils }
}
describe('Form', () => {
  it('is visible to the user', async () => {
    const { queryByTestId } = setup()
    await waitFor(() => screen.queryByTestId('form'))
    expect(queryByTestId('form')).toBeVisible()
  })

  it('has all inputs', async () => {
    const { queryByTestId } = setup()
    await waitFor(() => screen.queryByTestId('input-firstName'))
    expect(queryByTestId('input-firstName')).toBeVisible()
    expect(queryByTestId('input-lastName')).toBeVisible()
    expect(queryByTestId('input-date')).toBeVisible()
    expect(queryByTestId('input-email')).toBeVisible()
  })

  it('populates inputs with correct values', async () => {
    const { queryByTestId } = setup(correctData)
    await waitFor(() => screen.queryByTestId('input-firstName'))
    expect(queryByTestId('input-firstName')).toHaveValue('Test')
    expect(queryByTestId('input-lastName')).toHaveValue('Testowy')
    expect(queryByTestId('input-email')).toHaveValue('test@test.pl')
  })

  it('has submit button', async () => {
    const { queryByTestId } = setup()
    await waitFor(() => screen.queryByTestId('form-submit'))
    expect(queryByTestId('form-submit')).toBeVisible()
  })

  it('shows submit confirmation alert if the data is correct', async () => {
    setup(correctData)
    // Order is important so that tests follow internal state changes in React and wait for async actions
    await waitFor(() => screen.queryByTestId('form-submit'))
    fireEvent.click(screen.queryByTestId('form-submit'))
    await waitFor(() => screen.queryByTestId('form-loading'))
    await waitForElementToBeRemoved(() => screen.queryByTestId('form-loading'))
    await waitFor(() => screen.queryByTestId('form-alert-success'))
    await waitFor(() => screen.queryByTestId('form-submit'))

    expect(screen.queryByTestId('form-alert-success')).toBeVisible()
  })

  it('disables the button if there is an error after first submit', async () => {
    setup(inCorrectData)
    fireEvent.click(screen.queryByTestId('form-submit'))
    const button = await waitFor(() => screen.queryByTestId('form-submit'))
    expect(button).toBeDisabled()
  })

  it('shows validation errors to user', async () => {
    const { queryByTestId, queryByText } = setup(inCorrectData)
    await waitFor(() => screen.queryByTestId('form-submit'))
    expect(queryByTestId('input-email')).toHaveValue('wrong_email')
    fireEvent.click(screen.queryByTestId('form-submit'))
    await waitFor(() => screen.queryByText('Wrong email format'))
    expect(queryByText('Wrong email format')).toBeVisible()
  })
})
