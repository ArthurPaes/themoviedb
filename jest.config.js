module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass|svg|png|jpg|jpeg)$': 'identity-obj-proxy',
  },
  setupFiles: ['./__mocks__/jest-setup.js'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node', 'tsx'],
};
