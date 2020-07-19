import * as React from 'react'
import { Link } from 'gatsby'

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
