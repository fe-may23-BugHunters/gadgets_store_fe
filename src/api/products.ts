import axios from 'axios';
import { Categories, SortBy } from '../types/product';

const BASE_URL = 'https://fe-may23-bughunters-mt0o.onrender.com/products';

export function getProductsByCategory(
  limit = 10,
  offset = 0,
  category = Categories.PHONES,
  sortBy = SortBy.NAME,
) {
  return axios.get(
    `${BASE_URL}?limit=${limit}&offset=${offset}&sortBy=${sortBy}&category=${category}`,
  );
}

export function getProductById(productId: string) {
  return axios.get(`${BASE_URL}/${productId}`);
}

export function getProductByOptions({
  color = '',
  capacity = '',
  namespaceId = '',
}: {
  color: string;
  capacity: string;
  namespaceId: string;
}) {
  return axios.get(
    `${BASE_URL}/variants?color=${color}&capacity=${capacity}&namespaceId=${namespaceId}`,
  );
}

export function getRecommendedProducts() {
  return axios.get(`${BASE_URL}/recommended`);
}

export function getNewBrandProducts() {
  return axios.get(`${BASE_URL}/new`);
}

export function getDiscountProducts() {
  return axios.get(`${BASE_URL}/discount`);
}
