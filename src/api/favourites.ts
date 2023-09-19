import axios from 'axios';

const BASE_URL = 'https://fe-may23-bughunters-mt0o.onrender.com/favourites';

interface FavouriteQueryParams {
  userId: string;
  productId: string;
}

export function getAllByUserId(userId: string) {
  return axios.get(`${BASE_URL}/${userId}`);
}

export function createFavouriteProduct({
  userId,
  productId = '',
}: FavouriteQueryParams) {
  return axios.post(`${BASE_URL}/${userId}/${productId}`);
}

export function deleteFavouriteProduct({
  userId,
  productId = '',
}: FavouriteQueryParams) {
  return axios.delete(`${BASE_URL}/${userId}/${productId}`);
}
