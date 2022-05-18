import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { PaginationResponse } from '../model';
import { store } from '../store/configureStore';
import { sleep } from '../util/util';

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => {
  return response.data;
};

axios.interceptors.request.use((request) => {
  console.log(`${request.method}: ${request.url}`);
  if (request.params) console.log(`params:${request.params}`);
  if (request.data) console.log(`data:${JSON.stringify(request.data)}`);

  const token = store.getState().account.user?.token;
  if (token) request.headers.Authorization = `Bearer ${token}`;

  return request;
});
axios.interceptors.response.use(
  async (response) => {
    await sleep();
    const pagination = response.headers['pagination'];
    // console.log(response);
    if (pagination)
      response.data = new PaginationResponse(
        response.data,
        JSON.parse(pagination)
      );
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500:
        toast.error(data.title);
        history.push({
          pathname: '/server-error',
          state: { error: data },
        });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => {
    return axios.post(url, body).then(responseBody);
  },
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: (params: URLSearchParams) => requests.get('products', params),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilters: () => requests.get('products/filters'),
};

const TestErrors = {
  get400Error: () => requests.get('buggy/bad-request'),
  get401Error: () => requests.get('buggy/unauthorized'),
  get404Error: () => requests.get('buggy/not-found'),
  get500Error: () => requests.get('buggy/server-error'),
  getValidationError: () => requests.get('buggy/validation-error'),
};

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const Account = {
  login: (values: any) => requests.post('account/login', values),
  register: (values: any) => requests.post('account/register', values),
  currentUser: () => requests.get('account/currentUser'),
};

const Orders = {
  list: () => requests.get('orders'),
  fetch: (id: number) => requests.get(`orders/${id}`),
  create: (values: any) => requests.post('orders', values),
};

const agent = {
  Catalog,
  Basket,
  TestErrors,
  Account,
  Orders,
};

export default agent;
