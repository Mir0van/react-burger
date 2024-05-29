import { BURGER_API_URL } from "./constants";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
  return fetch(`${BURGER_API_URL}/ingredients`).then(checkResponse);
};