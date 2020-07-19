import React from 'react'
import { render } from '@testing-library/react'
import HomePage from '../index'

describe('Home', () => {
  it('is visible to the user', () => {
    const { queryByTestId } = render(<HomePage />)
    expect(queryByTestId('page-home')).toBeVisible()
  })

  it('show link to event schedule form', () => {
    const { queryByTestId } = render(<HomePage />)
    expect(queryByTestId('link-page-schedule')).toBeVisible()
  })
})
