/* eslint-disable @typescript-eslint/no-explicit-any */
import { eventValidationResolver } from './eventValidationResolver'
import { allFieldsRequiredEmptyErrors } from './testHelpers'

describe('eventValidationResolver function', () => {
  it('should return errors for empty values', async () => {
    const result = await eventValidationResolver({
      firstName: '',
      lastName: '',
      date: '',
      email: '',
    })
    expect(result).toStrictEqual({
      errors: { ...allFieldsRequiredEmptyErrors },
      values: {},
    })
  })
  it('should return values for correct values', async () => {
    const data = {
      firstName: 'Piotr',
      lastName: 'X',
      date: '2020-11-11',
      email: 'piotr@wp.pl',
    }
    const result = await eventValidationResolver(data)
    expect(result).toStrictEqual({
      errors: {},
      values: data,
    })
  })
  it('should return required fields errors if no data passed', async () => {
    const result = await eventValidationResolver({} as any)
    expect(result).toStrictEqual({
      errors: { ...allFieldsRequiredEmptyErrors },
      values: {},
    })
  })
  it('should return error for just the incorrect data', async () => {
    const data = {
      firstName: 'Piotr',
      lastName: 'X',
      date: '2020-11-11',
      email: 'piotrwp.pl',
    }
    const result = await eventValidationResolver(data)
    expect(result).toStrictEqual({
      errors: {
        email: {
          message: 'Wrong email format',
          type: 'frontend_validation',
        },
      },
      values: {},
    })
  })
})
