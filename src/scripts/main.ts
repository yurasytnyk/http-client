import axios from 'axios';

import { HttpClient } from './http-client/http-client';
import { FetchHttpClient } from './fetch-http-client/fetch-http-client';

const fetchClient = new FetchHttpClient();
const httpClient = new HttpClient(axios);

interface User {
  name: string;
  job: string;
  id: number;
  createdAt: string;
}

httpClient
  .setCustomHeaders({ 'Content-Type': 'application/json' })
  .get('https://jsonplaceholder.cypress.io/todos/1')
  .then((res) => console.log(res));
