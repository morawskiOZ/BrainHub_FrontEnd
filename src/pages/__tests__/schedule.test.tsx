import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import SchedulePage from '../schedule'

describe('SchedulePage', () => {
  it('is visible to the user', async () => {
    const { queryByTestId } = render(<SchedulePage />)
    await waitFor(() => screen.queryByTestId('page-schedule'))
    expect(queryByTestId('page-schedule')).toBeVisible()
  })

  it('show link to event schedule form', async () => {
    const { queryByTestId } = render(<SchedulePage />)
    await waitFor(() => screen.queryByTestId('form'))
    expect(queryByTestId('form')).toBeVisible()
  })
})
