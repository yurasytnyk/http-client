import { FetchResponse, RequestConfig } from "./fetch-http-client-types";

export class FetchHttpClient {
  async request<T = any, R = FetchResponse<T>, D = any>(config: RequestConfig<T>): Promise<FetchResponse> {
    const res = await fetch(config.url);
    const data = await res.json();

    return {
      data
    };
  }
}
