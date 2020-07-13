import React from 'react'
import { render } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('is visible to the user', () => {
    const { queryByTestId } = render(<App />)
    expect(queryByTestId('app')).toBeVisible()
  })
})
