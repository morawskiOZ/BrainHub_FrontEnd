// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw'
import { saveEventUrl } from 'src/api/saveEvent'

const handlers = [
  rest.post(saveEventUrl, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/json'),
      ctx.body(JSON.stringify({ success: true })),
    )
  }),
]
export { handlers }
