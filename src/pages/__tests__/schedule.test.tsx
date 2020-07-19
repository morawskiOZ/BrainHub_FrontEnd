import React from 'react'
import { render } from '@testing-library/react'
import SchedulePage from '../schedule'

describe('SchedulePage', () => {
  it('is visible to the user', () => {
    const { queryByTestId } = render(<SchedulePage />)
    expect(queryByTestId('page-schedule')).toBeVisible()
  })

  it('show link to event schedule form', () => {
    const { queryByTestId } = render(<SchedulePage />)
    expect(queryByTestId('form')).toBeVisible()
  })
})
