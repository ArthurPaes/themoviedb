import { HTTP_HEADER_TYPE, Api as BaseApi, IHttpHeaders } from './api.base';

jest.mock('axios');

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
});
