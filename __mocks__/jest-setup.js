jest.mock('../src/utils/utilFunctions', () => ({
  ...jest.requireActual('../src/utils/utilFunctions'),
  getFullImageUrl: jest.fn(path => process.env.REACT_APP_IMAGE_URL + path),
}));
