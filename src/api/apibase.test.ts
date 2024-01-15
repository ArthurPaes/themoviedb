import api, {
  HTTP_HEADER_TYPE,
  Api as BaseApi,
  IHttpHeaders,
} from './api.base';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    request: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
  })),
}));

describe('Api class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('__setUrlParams function', () => {
    test('generates the correct URL with query parameters', () => {
      const apiInstance = new BaseApi('https://example.com');
      const baseUrl = 'https://example.com/movies';
      const data = {
        genre: 'action',
        year: 2022,
        actors: ['actor1', 'actor2'],
      };

      const result = apiInstance['__setUrlParams'](baseUrl, data);

      expect(result).toBe(
        'https://example.com/movies?genre=action&year=2022&actors[]=actor1&actors[]=actor2'
      );
    });

    test('handles undefined and array parameters correctly', () => {
      const apiInstance = new BaseApi('https://example.com');
      const baseUrl = 'https://example.com/movies';
      const data = {
        param1: undefined,
        param2: ['value1', 'value2'],
      };

      const result = apiInstance['__setUrlParams'](baseUrl, data);

      expect(result).toBe(
        'https://example.com/movies?param2[]=value1&param2[]=value2'
      );
    });
  });

  describe('__setHeaders function', () => {
    test('generates the correct headers for JSON content type', async () => {
      const apiInstance = new BaseApi('https://example.com');
      const mode = HTTP_HEADER_TYPE.JSON;
      const customOptions = { additionalHeader: 'value' };

      const result = await apiInstance['__setHeaders'](mode, customOptions);

      const expectedHeaders: IHttpHeaders = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        additionalHeader: 'value',
      };

      expect(result).toEqual(expectedHeaders);
    });

    test('generates the correct headers for x-www-form-urlencoded content type', async () => {
      const apiInstance = new BaseApi('https://example.com');
      const mode = HTTP_HEADER_TYPE.X_WWW_FORM_URLENCONDED;
      const customOptions = { additionalHeader: 'value' };

      const result = await apiInstance['__setHeaders'](mode, customOptions);

      const expectedHeaders: IHttpHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept:
          'application/x-www-form-urlencoded, application/json, application/text, */*',
        additionalHeader: 'value',
      };

      expect(result).toEqual(expectedHeaders);
    });

    test('generates the correct headers for form-data content type', async () => {
      const apiInstance = new BaseApi('https://example.com');
      const mode = HTTP_HEADER_TYPE.FORM_DATA;
      const customOptions = { additionalHeader: 'value' };

      const result = await apiInstance['__setHeaders'](mode, customOptions);

      const expectedHeaders: IHttpHeaders = {
        'Content-Type': 'multipart/form-data',
        Accept:
          'application/x-www-form-urlencoded, application/json, application/text, */*',
        additionalHeader: 'value',
      };

      expect(result).toEqual(expectedHeaders);
    });

    test('generates the correct headers for default (JSON) content type', async () => {
      const apiInstance = new BaseApi('https://example.com');
      const customOptions = { additionalHeader: 'value' };

      const result = await apiInstance['__setHeaders'](
        undefined,
        customOptions
      );

      const expectedHeaders: IHttpHeaders = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        additionalHeader: 'value',
      };

      expect(result).toEqual(expectedHeaders);
    });
  });

  //   describe('makeRequest function', () => {
  //     const mockedAxios = axios as jest.Mocked<typeof axios>;

  //     afterEach(() => {
  //       jest.clearAllMocks();
  //     });

  //     // Add more test cases for other HTTP methods and scenarios

  //     test('calls __handleRequestErrors on AxiosError', async () => {
  //       const apiInstance = new BaseApi('https://example.com');
  //       const error = {
  //         isAxiosError: true,
  //         response: { data: 'error data' },
  //       } as AxiosError;

  //       jest.spyOn(api, 'get').mockRejectedValueOnce(error);
  //       const handleRequestErrorsSpy = jest.spyOn(apiInstance as any, '__handleRequestErrors');

  //         await apiInstance.get('example')
  //         expect(handleRequestErrorsSpy).toHaveBeenCalledWith('ADAD');
  //     });
  //   });

  //     test('get method makes a successful GET request', async () => {
  //       jest.spyOn(api, 'get').mockRejectedValueOnce(new Error("error"));

  //       const result = await api.get('/example');

  //       expect(api.get).rejects.toThrow('error');
  //     });

  //   test('post method makes a successful POST request', async () => {
  //     const mockResponse = { data: 'mocked data' };
  //     mockedAxios.request.mockResolvedValueOnce(mockResponse);

  //     const result = await Api.post('/example', { key: 'value' });

  //     expect(mockedAxios.request).toHaveBeenCalledWith({
  //       method: 'POST',
  //       url: '/example',
  //       headers: expect.any(Object),
  //       data: { key: 'value' },
  //     });
  //     expect(result).toEqual(mockResponse.data);
  //   });

  //   // Add more test cases for other HTTP methods and scenarios

  //   test('handles error in case of a failed request', async () => {
  //     const errorMessage = 'Request failed';
  //     const error = new Error(errorMessage);
  //     mockedAxios.request.mockRejectedValueOnce(error);

  //     await expect(Api.get('/example')).rejects.toThrow(errorMessage);
  //   });

  // Add more test cases as needed
});
