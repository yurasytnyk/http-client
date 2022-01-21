import { Method } from "../http-client/enums/enums";

type RecordFetch<K extends keyof any, T> = {
  [P in K]: T;
};

type ResponseHeaders = RecordFetch<string, string | number | boolean> & {
  "set-cookie": string[];
};

export type RequestHeaders = RecordFetch<string, string | number | boolean>;

export interface RequestConfig<D = any> {
  url?: string;
  method?: Method;
  baseURL?: string;
  headers?: RequestHeaders;
  params?: any;
  data?: D;
}

export interface FetchResponse<T = any, D = any> {
  data: T;
  status?: number;
  statusText?: string;
  headers?: ResponseHeaders;
  config?: RequestConfig<D>;
  request?: any;
}
