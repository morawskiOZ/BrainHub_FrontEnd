import { Link } from 'gatsby'
import * as React from 'react'

const Home = (): React.ReactElement => {
  return (
    <div data-testid="page-home">
      <Link to="/schedule" data-testid="link-page-schedule">
        Schedule an event!
      </Link>
    </div>
  )
}
export default Home
