/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

export enum HTTP_HEADER_TYPE {
  JSON,
  X_WWW_FORM_URLENCONDED,
  FORM_DATA,
}

interface IHttpHeaders {
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

  /**
   * makeRequest
   *
   * Realiza uma requisição para a API e retorna os dados.
   * @param {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'} method - Método HTTP.
   * @param {string} url - Url da requisição.
   * @param {IHttpHeaders} [headers] - Headers HTTP.
   * @param {Record<string, any>} [data] - Dados para enviar a API.
   * @param {AxiosRequestConfig} [config] - AxiosRequestConfig - Configurações axios extras caso necessário.
   * @returns Dados da requisição.
   */
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

  /**
   * __handleRequestErrors
   *
   * Trata os erros da função makeRequest
   *
   * @param { any } error
   */
  protected async __handleRequestErrors(error: any): Promise<void> {
    console.error('error: ', error);
    //TODO: Handle Errors
  }
}

export class Api extends BaseApi {
  constructor(baseURL: string) {
    super(baseURL);
  }

  /**
   * __setHeaders
   *
   * Monta os headers para a requisição HTTP
   *
   * @param { string } mode Modo do Header
   */
  private async __setHeaders(
    mode?: HTTP_HEADER_TYPE,
    customOptions?: any
  ): Promise<IHttpHeaders> {
    let customHeaders!: IHttpHeaders;

    if (mode === HTTP_HEADER_TYPE.JSON || !mode) {
      customHeaders = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${await localStorage.getItem('@UserToken')}`,
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

  /**
   * __setUrlParams
   *
   * Monta a URL com os parâmetros recebidos no body da requisição
   *
   * @param { string } url
   * @param { Record<string, any> } data
   */
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

  /**
   * Realiza uma requisição GET.
   *
   * @param {string} url - Url para realizar a requisição.
   * @param {Record<string, any>} data - Dados para requisição.
   * @param {HTTP_HEADER_TYPE} [headerType] - Tipo do header utilizado na requisição
   * @param {AxiosRequestConfig} [config] - configurações extras para a requisição
   * @returns Uma promise.
   */
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

  /**
   * Realiza uma requisição POST.
   *
   * @param {string} url - Url para realizar a requisição.
   * @param {Record<string, any>} data - Dados para requisição.
   * @param {HTTP_HEADER_TYPE} [headerType] - Tipo do header utilizado na requisição
   * @param {AxiosRequestConfig} [config] - configurações extras para a requisição
   * @returns Uma promise.
   */
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

  /**
   * Realiza uma requisição PUT.
   *
   * @param {string} url - Url para realizar a requisição.
   * @param {Record<string, any>} data - Dados para requisição.
   * @param {HTTP_HEADER_TYPE} [headerType] - Tipo do header utilizado na requisição
   * @param {AxiosRequestConfig} [config] - configurações extras para a requisição
   * @returns Uma promise.
   */
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

  /**
   * Realiza uma requisição DELETE.
   *
   * @param {string} url - Url para realizar a requisição.
   * @param {HTTP_HEADER_TYPE} [headerType] - Tipo do header utilizado na requisição
   * @param {AxiosRequestConfig} [config] - configurações extras para a requisição
   * @returns Uma promise.
   */
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

  /**
   * Realiza uma requisição PATCH.
   *
   * @param {string} url - Url para realizar a requisição.
   * @param {Record<string, any>} data - Dados para requisição.
   * @param {HTTP_HEADER_TYPE} [headerType] - Tipo do header utilizado na requisição
   * @param {AxiosRequestConfig} [config] - configurações extras para a requisição
   * @returns Uma promise.
   */
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

//TODO: Adicionar URL da api
export default new Api('api_url');
