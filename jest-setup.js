// loadershim
global.___loader = {
  enqueue: jest.fn(),
}

// fetch polyfill for node/jest env
require('whatwg-fetch')

// Env variables in tests
process.env.GATSBY_API_URL = 'https://test.pl'
