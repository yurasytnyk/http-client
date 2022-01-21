import { HttpClient } from "./http-client/http-client";
import { AxiosHttpClient } from "./axios-http-client/axios-http-client";
import { FetchHttpClient } from "./fetch-http-client/fetch-http-client";

const fetchClient = new FetchHttpClient();
const axiosClient = new AxiosHttpClient();
const httpClient = new HttpClient(axiosClient);

interface User {
  body: string;
  id: number;
  title: string;
  userId: string;
}

httpClient
  .setCustomHeaders({ "Content-Type": "application/json" })
  .get<User>("https://jsonplaceholder.typicode.com/posts")
  .then((res) => console.log(res));
