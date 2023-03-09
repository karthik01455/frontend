export const AUTH_BACKEND_URL = 'http://localhost:8009';
export const LOGIN = {
  url: `${AUTH_BACKEND_URL}/users/login`,
  method: 'POST',
};
export const CREATE_USER = {
  url: `${AUTH_BACKEND_URL}/users/createUser`,
  method: 'POST',
};
