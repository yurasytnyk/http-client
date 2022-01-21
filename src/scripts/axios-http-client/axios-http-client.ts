import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class AxiosHttpClient {
  create(config: AxiosRequestConfig = {}): AxiosInstance {
    return axios.create(config);
  }

  init() {
    return axios;
  }
}