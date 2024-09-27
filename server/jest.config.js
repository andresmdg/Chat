// jest.config.js
export default {
  testEnvironment: 'node',
  moduleNameMapper: {
    '#root': '<rootDir>/root.js',
    '#db': '<rootDir>/src/config/db.js',
    '#env': '<rootDir>/src/config/env.js',
    '#utils': '<rootDir>/src/utils/index.js',
    '#app': '<rootDir>/src/config/server.js',
    '#models': '<rootDir>/src/models/index.js',
    '#controllers': '<rootDir>/src/controllers/index.js',
    '#middlewares': '<rootDir>/src/middlewares/index.js',
    '#multer': '<rootDir>/src/config/multer.js'
  },
  transform: {
    '^.+\\.m?js$': 'babel-jest'
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.m?js$', // Asegúrate de que esto soporte .mjs si es necesario
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/index.js',
    '!**/node_modules/**'
  ]
}
