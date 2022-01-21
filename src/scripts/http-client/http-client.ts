import { RequestHeaders } from "../fetch-http-client/fetch-http-client-types";
import { HTTP_METHODS, Method } from "./enums/enums";
import { HttpClientInstance } from "./types/typedef";
import { HttpClientOptions } from "./types/typedef";
import { MethodOptions } from "./types/typedef";
import { ResponseType } from "./types/typedef";

export class HttpClient {
  private client: HttpClientInstance;
  private options: HttpClientOptions;
  private customHeaders: RequestHeaders = {};

  constructor(
    client: HttpClientInstance,
    baseUrl: string = "",
    options: HttpClientOptions = {}
  ) {
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

  private async invoke<T>(
    url: string,
    method: Method,
    { headers, body }: MethodOptions<T> = {}
  ): Promise<ResponseType> {
    this.setCustomHeaders(headers);

    try {
      let processedData = null;

      if (body) {
        processedData = JSON.stringify(body);
      }

      const request = {
        method,
        url,
        headers: this.customHeaders,
        data: processedData,
      };

      const { data }: ResponseType = await this.client.request(request);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
