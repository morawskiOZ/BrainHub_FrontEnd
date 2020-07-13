import * as React from 'react'
import { ReactElement } from 'react'
import { ContactInput } from './Input/Input'

export const App = (): ReactElement => {
  return (
    <div data-testid="app">
      <ContactInput onSearch={() => console.log('test')} />
    </div>
  )
}
