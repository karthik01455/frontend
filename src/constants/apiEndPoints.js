export const AUTH_BACKEND_URL = 'http://localhost:8009';
export const CONTENT_TYPE_BACKEND_URL = 'http://localhost:8001';
export const LOGIN = {
  url: `${AUTH_BACKEND_URL}/users/login`,
  method: 'POST',
};
export const CREATE_USER = {
  url: `${AUTH_BACKEND_URL}/users/createUser`,
  method: 'POST',
};
export const GET_ALL_CONTENT_TYPE = {
  url: `${CONTENT_TYPE_BACKEND_URL}/contentTypes/all`,
  method: 'GET',
};
export const GET_CONTENT_TYPE_BY_ID = (id) => ({
  url: `${CONTENT_TYPE_BACKEND_URL}/contentTypes/${id}`,
  method: 'GET',
});
export const UPDATE_CONTENT_TYPE_BY_ID = (id) => ({
  url: `${CONTENT_TYPE_BACKEND_URL}/contentTypes/${id}`,
  method: 'PUT',
});
export const CREATE_CONTENT_TYPE = {
  url: `${CONTENT_TYPE_BACKEND_URL}/contentTypes`,
  method: 'POST',
};
