import axios from 'axios';

const BASE_URL = 'https://fe-may23-bughunters.onrender.com/favourites';
const USER_ID = 'f3bbb3e2-4bf6-11ee-be56-0242ac120002';

interface FavouriteQueryParams {
  userId?: string;
  productId: string;
}

export function getAllByUserId(userId = USER_ID) {
  return axios.get(`${BASE_URL}/${userId}`);
}

export function createFavouriteProduct({
  userId = USER_ID,
  productId = '',
}: FavouriteQueryParams) {
  return axios.post(`${BASE_URL}/${userId}/${productId}`);
}

export function deleteFavouriteProduct({
  userId = USER_ID,
  productId = '',
}: FavouriteQueryParams) {
  return axios.delete(`${BASE_URL}/${userId}/${productId}`);
}
