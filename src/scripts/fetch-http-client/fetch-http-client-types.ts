import { Method } from "../http-client/enums/enums";

type RecordFetch<K extends keyof any, T> = {
  [P in K]: T;
};

type ResponseHeaders = RecordFetch<string, string | number | boolean> & {
  "set-cookie": string[];
};

export type RequestHeaders = RecordFetch<string, string | number | boolean>;

export interface RequestConfig {
  url?: string;
  method?: Method;
  headers?: RequestHeaders;
  data?: BodyInit;
}

export interface FetchResponse<T = any> {
  data: T;
  status?: number;
  statusText?: string;
  headers?: ResponseHeaders;
  config?: RequestConfig;
  request?: any;
}
