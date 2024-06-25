import {
  INGREDIENTS_URL,
  ORDER_URL,
  PASSWORD_RESET_URL,
  PASSWORD_SAVE_URL,
  REGISTER_URL,
  LOGIN_URL,
  LOGOUT_URL,
  TOKEN_URL,
  USER_URL
} from './constants';

const header = {
  'Content-Type': 'application/json;charset=utf-8',
  accept: 'application/json'
};

// --------------------
// хелперы

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getTokens = (data) => {
  if (!data.success) {
    return Promise.reject(data);
  }
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('accessToken', data.accessToken);
  return data;
}

const deleteTokens = (data) => {
  if (!data.success) {
    return Promise.reject(data);
  }
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  return data;
}

// ------------------------------------
// работа с апи

export const refreshToken = () => {
  return fetch(TOKEN_URL, {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(checkResponse)
   // Важно для обновления токена в мидлваре, чтобы запись
   // была тут, а не в fetchWithRefresh
  .then(getTokens);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getIngredients = () => fetch(INGREDIENTS_URL).then(checkResponse);

export const postOrder = (ingredientIds) => {
  return fetch(ORDER_URL, {
    body: JSON.stringify({
      ingredients: ingredientIds
    }),
    method: 'POST',
    headers: {
      ...header,
      authorization: localStorage.getItem('accessToken')
    }
  })
    .then(checkResponse);
};

export const login = (form) => {
  return fetch(LOGIN_URL, {
    body: JSON.stringify(form),
    method: 'POST',
    headers: header,
  })
    .then(checkResponse)
    .then(getTokens);
}

export const register = (form) => {
  return fetch(REGISTER_URL, {
    body: JSON.stringify(form),
    method: 'POST',
    headers: header,
  })
    .then(checkResponse)
    .then(getTokens);
}

export const logout = () => {
  return fetch(LOGOUT_URL, {
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
    method: 'POST',
    headers: header
  })
    .then(checkResponse)
    .then(deleteTokens)
}

export const forgotPassword = (form) => {
  return fetch(PASSWORD_RESET_URL, {
    body: JSON.stringify(form),
    method: 'POST',
    headers: header,
  })
    .then(checkResponse)
    .then((data) => {
      if (!data.success) {
        return Promise.reject(data);
      }
      localStorage.setItem('resetPassword', true);
      return data;
    });
};

export const resetPassword = (form) => {
  return fetch(PASSWORD_SAVE_URL, {
    body: JSON.stringify(form),
    method: 'POST',
    headers: header,
  })
    .then(checkResponse)
    .then((data) => {
      if (!data.success) {
        return Promise.reject(data);
      }
      localStorage.removeItem('resetPassword');
      return data;
    });
}

export const getUser = () => {
  const options = {
    method: 'GET',
    headers: {
      ...header,
      authorization: localStorage.getItem('accessToken')
    }
  };

  return fetchWithRefresh(USER_URL, options);
};

export const updateUserData = (form) => {
  const options = {
    body: JSON.stringify(form),
    method: 'PATCH',
    headers: {
      ...header,
      authorization: localStorage.getItem('accessToken')
    }
  };

  return fetchWithRefresh(USER_URL, options);
};