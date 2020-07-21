module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
  },
  moduleNameMapper: {
    '^.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js',
    '^src(.*)$': '<rootDir>/src$1',
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  setupFiles: [
    '<rootDir>/loadershim.js',
    '<rootDir>/jest-dotenv.js',
    '<rootDir>/jest-whatwg-fetch.js',
    '<rootDir>/jest-setup.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest-dom.js',
    '<rootDir>/jest-setup-after-env.js',
  ],
}
