import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

export enum HTTP_HEADER_TYPE {
  JSON,
  X_WWW_FORM_URLENCONDED,
  FORM_DATA,
}

export interface IHttpHeaders {
  'Content-Type': string;
  Authorization?: string;
  Accept?: string;
  'Cache-Control'?: string;
  'User-Agent'?: string;
  [headerOption: string]: string | undefined;
}

abstract class BaseApi {
  protected axios: AxiosInstance;
  protected requestErrorAlertPresent: boolean = false;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
    });
  }

  protected async makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    headers?: IHttpHeaders,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axios.request<T>({
        headers,
        method,
        url,
        data,
        ...config,
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);

        this.__handleRequestErrors(error);
      } else {
        console.error(error);
      }

      throw error;
    }
  }

  protected async __handleRequestErrors(error: any): Promise<void> {
    console.error('error: ', error);
  }
}

export class Api extends BaseApi {
  constructor(baseURL: string) {
    super(baseURL);
  }

  private async __setHeaders(
    mode?: HTTP_HEADER_TYPE,
    customOptions?: any
  ): Promise<IHttpHeaders> {
    let customHeaders!: IHttpHeaders;

    if (mode === HTTP_HEADER_TYPE.JSON || !mode) {
      customHeaders = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        ...customOptions,
      };
    } else if (mode === HTTP_HEADER_TYPE.X_WWW_FORM_URLENCONDED) {
      customHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept:
          'application/x-www-form-urlencoded, application/json, application/text, */*',
        ...customOptions,
      };
    } else if (mode === HTTP_HEADER_TYPE.FORM_DATA) {
      customHeaders = {
        'Content-Type': 'multipart/form-data',
        Accept:
          'application/x-www-form-urlencoded, application/json, application/text, */*',
        ...customOptions,
      };
    }

    return customHeaders;
  }

  private __setUrlParams(url: string, data: Record<string, any>): string {
    let conector: string = '?';

    for (const key in data) {
      if (data[key] !== undefined) {
        if (Array.isArray(data[key])) {
          data[key].forEach((element: any) => {
            url += conector + key + '[]=' + element;
            conector = '&';
          });
        } else {
          url += conector + key + '=' + data[key];
          conector = '&';
        }
      }
    }

    return url;
  }

  async get<T>(
    url: string,
    data?: Record<string, any>,
    headerType?: HTTP_HEADER_TYPE,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.makeRequest<T>(
      'GET',
      (url = this.__setUrlParams(url, data!)),
      await this.__setHeaders(headerType),
      undefined,
      config
    );
  }

  async post<T>(
    url: string,
    data?: Record<string, any>,
    headerType?: HTTP_HEADER_TYPE,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.makeRequest<T>(
      'POST',
      url,
      await this.__setHeaders(headerType),
      data,
      config
    );
  }

  async put<T>(
    url: string,
    data?: Record<string, any>,
    headerType?: HTTP_HEADER_TYPE,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.makeRequest<T>(
      'PUT',
      url,
      await this.__setHeaders(headerType),
      data,
      config
    );
  }

  async delete<T>(
    url: string,
    headerType?: HTTP_HEADER_TYPE,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.makeRequest<T>(
      'DELETE',
      url,
      await this.__setHeaders(headerType),
      config
    );
  }

  async patch<T>(
    url: string,
    data?: Record<string, any>,
    headerType?: HTTP_HEADER_TYPE,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.makeRequest<T>(
      'PATCH',
      url,
      await this.__setHeaders(headerType),
      data,
      config
    );
  }
}

export default new Api(process.env.REACT_APP_API_URL || '');
