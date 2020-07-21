import { saveEvent, saveEventUrl } from 'src/api/saveEvent'
import { EventForm } from 'src/models/eventForm'
import { server, rest } from '../mocks/server'

describe('saveEvent Api calls', () => {
  const correctData: EventForm = {
    firstName: 'Test',
    lastName: 'Testing',
    date: '1990-01-01',
    email: 'test@test.test',
  }

  const inCorrectData: EventForm = {
    firstName: 'Test',
    lastName: 'Testing',
    date: '1111',
    email: 'wrong_email',
  }
  it('should return success when call is successful', async () => {
    const { errors, success } = await saveEvent(correctData)
    expect(success).toBe(true)
    expect(errors).toBe(null)
  })
  it('should return error when call is unsuccessful', async () => {
    server.use(
      rest.post(saveEventUrl, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.set('Content-Type', 'application/json'),
          ctx.body(JSON.stringify('bad request')),
        )
      }),
    )
    const { errors, success } = await saveEvent(inCorrectData)
    expect(success).toBe(false)
    expect(errors).toStrictEqual({
      firstName: {
        message: 'Unknown Server error',
        type: 'backend_validation',
      },
    })
  })

  it('should return error object with server errors', async () => {
    server.use(
      rest.post(saveEventUrl, (req, res, ctx) => {
        return res(
          ctx.status(422),
          ctx.set('Content-Type', 'application/json'),
          ctx.body(
            JSON.stringify({
              errors: [{ firstName: 'Field First Name is required' }],
            }),
          ),
        )
      }),
    )
    const { errors, success } = await saveEvent(inCorrectData)
    expect(success).toBe(false)
    expect(errors).toStrictEqual({
      firstName: {
        message: 'Field First Name is required',
        type: 'backend_validation',
      },
    })
  })
})
