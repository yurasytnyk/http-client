import { RequestHeaders } from '../fetch-http-client/fetch-http-client-types';
import { authInterceptor } from '../utils/auth-interceptor/auth-interceptor';
import { DataParser } from '../utils/data-parser/data-parser';
import { getAxiosInstance } from '../utils/type-checkers/type-checkers';
import { HTTP_METHODS, Method } from './enums/enums';
import { HttpClientInstance } from './types/typedef';
import { HttpClientOptions } from './types/typedef';
import { MethodOptions } from './types/typedef';
import { ResponseType } from './types/typedef';

export class HttpClient {
  private client: HttpClientInstance;
  private options: HttpClientOptions;
  private customHeaders: RequestHeaders = {};

  constructor(client: HttpClientInstance, options: HttpClientOptions = {}) {
    this.options = options;
    this.customHeaders = options.customHeaders;
    this.client = client;
  }

  public get<T>(
    url: string,
    options?: MethodOptions<T>
  ): Promise<ResponseType> {
    return this.invoke<T>(url, HTTP_METHODS.GET, options);
  }

  public post<T>(
    url: string,
    options?: MethodOptions<T>
  ): Promise<ResponseType> {
    return this.invoke<T>(url, HTTP_METHODS.POST, options);
  }

  public put<T>(
    url: string,
    options?: MethodOptions<T>
  ): Promise<ResponseType> {
    return this.invoke<T>(url, HTTP_METHODS.PUT, options);
  }

  public delete<T>(
    url: string,
    options?: MethodOptions<T>
  ): Promise<ResponseType> {
    return this.invoke<T>(url, HTTP_METHODS.DELETE, options);
  }

  public setCustomHeaders(headers: RequestHeaders) {
    this.customHeaders = headers;

    return this;
  }

  public async settleRequests<T>(promises: Promise<T>[]) {
    const results = await Promise.allSettled(promises);
    const fulfilled = results.filter(
      (result): result is PromiseFulfilledResult<Awaited<T>> => {
        return result.status === 'fulfilled';
      }
    );

    if (!fulfilled.length) {
      const error = results.find((result): result is PromiseRejectedResult => {
        return result.status === 'rejected';
      });

      throw new Error(error.reason.message);
    }

    return fulfilled.map((data) => data.value);
  }

  private async invoke<T>(
    url: string,
    method: Method,
    options: MethodOptions<T> = {}
  ): Promise<ResponseType> {
    const { headers, body } = options;

    this.setCustomHeaders(headers);

    try {
      const processedData = DataParser.parseData(body);

      if (getAxiosInstance(this.client)) {
        authInterceptor(this.client);
      }

      const request = {
        method,
        url,
        headers: this.customHeaders,
        data: processedData
      };

      const { data }: ResponseType = await this.client.request(request);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
