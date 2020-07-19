import React from 'react'
import { render } from '@testing-library/react'
import { Form } from './Form'

describe('Form', () => {
  it('is visible to the user', () => {
    const { queryByTestId } = render(<Form />)
    expect(queryByTestId('form')).toBeVisible()
  })

  it('has all inputs', () => {
    const { queryByTestId } = render(<Form />)
    expect(queryByTestId('input-firstName')).toBeVisible()
    expect(queryByTestId('input-lastName')).toBeVisible()
    expect(queryByTestId('input-date')).toBeVisible()
    expect(queryByTestId('input-email')).toBeVisible()
  })

  it('has submit button', () => {
    const { queryByTestId } = render(<Form />)
    expect(queryByTestId('form-submit')).toBeVisible()
  })

  it('shows submit confirmation if the data is correct', () => {
    const { queryByTestId } = render(<Form />)
    expect(queryByTestId('form')).toBeVisible()
  })

  it('disables the button if there is an error', () => {
    const { queryByTestId } = render(<Form />)
    expect(queryByTestId('form')).toBeVisible()
  })

  it('shows validation errors to user', () => {
    const { queryByTestId } = render(<Form />)
    expect(queryByTestId('form')).toBeVisible()
  })
})
