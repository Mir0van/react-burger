import { TBurgerIngredient, TUserData, TTokens, TFetchOptions, TUserResponse, TResetPassword, TOrder, TFeedOrder } from './types';
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

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getTokens = <T extends TTokens>(data: T): Promise<T> => {
  if (!data.success) {
    return Promise.reject(data);
  }
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('accessToken', data.accessToken);
  return Promise.resolve(data);
};

const deleteTokens = <T extends Pick<TTokens, 'success'>>(data: T): Promise<T> => {
  if (!data.success) {
    return Promise.reject(data);
  }
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  return Promise.resolve(data);
};

// ------------------------------------
// работа с апи

export const refreshToken = (): Promise<TTokens> => {
  return fetch(TOKEN_URL, {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(checkResponse<TTokens>)
    // Важно для обновления токена в мидлваре, чтобы запись
    // была тут, а не в fetchWithRefresh
    .then(getTokens);
};



export const fetchWithRefresh = async <T>(url: string, options: TFetchOptions): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as Error).message === "jwt expired") {
      const refreshData = await refreshToken(); // обновляем токен
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); // повторяем запрос
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getIngredients = (): Promise<{data: TBurgerIngredient[]}> => 
  fetch(INGREDIENTS_URL).then(checkResponse<{data: TBurgerIngredient[]}>);

export const postOrder = (ingredientIds: string[]): Promise<TOrder> => {
  return fetch(ORDER_URL, {
    body: JSON.stringify({
      ingredients: ingredientIds
    }),
    method: 'POST',

    headers: {
      ...header,
      authorization: localStorage.getItem('accessToken') || ''
    }
  })
    .then(checkResponse<TOrder>);
};

export const login = (form: Omit<TUserData, 'name'>): Promise<TUserResponse> => {
  return fetch(LOGIN_URL, {
    body: JSON.stringify(form),
    method: 'POST',
    headers: header,
  })
    .then(checkResponse<TUserResponse>)
    .then(getTokens);
}

export const register = (form: TUserData): Promise<TUserResponse> => {
  return fetch(REGISTER_URL, {
    body: JSON.stringify(form),
    method: 'POST',
    headers: header,
  })
    .then(checkResponse<TUserResponse>)
    .then(getTokens);
}

export const logout = (): Promise<Pick<TTokens, 'success'>> => {
  return fetch(LOGOUT_URL, {
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
    method: 'POST',
    headers: header
  })
    .then(checkResponse<Pick<TTokens, 'success'>>)
    .then(deleteTokens)
}

export const forgotPassword = (form: Pick<TUserData, 'email'>): Promise<Pick<TTokens, 'success'>> => {
  return fetch(PASSWORD_RESET_URL, {
    body: JSON.stringify(form),
    method: 'POST',
    headers: header,
  })
    .then(checkResponse<Pick<TTokens, 'success'>>)
    .then((data) => {
      if (!data.success) {
        return Promise.reject(data);
      }
      localStorage.setItem('resetPassword', 'true');
      return data;
    });
};

export const resetPassword = (form: TResetPassword): Promise<Pick<TTokens, 'success'>> => {
  return fetch(PASSWORD_SAVE_URL, {
    body: JSON.stringify(form),
    method: 'POST',
    headers: header,
  })
    .then(checkResponse<Pick<TTokens, 'success'>>)
    .then((data) => {
      if (!data.success) {
        return Promise.reject(data);
      }
      localStorage.removeItem('resetPassword');
      return data;
    });
}

export const getUser = (): Promise<Omit<TUserResponse, 'accessToken' | 'refreshToken'>> => {
  const options = {
    method: 'GET',
    headers: {
      ...header,
      authorization: localStorage.getItem('accessToken') || ''
    }
  };

  return fetchWithRefresh<TUserResponse>(USER_URL, options);
};

export const updateUserData = (form: TUserData): Promise<TUserResponse> => {
  const options = {
    body: JSON.stringify(form),
    method: 'PATCH',
    headers: {
      ...header,
      authorization: localStorage.getItem('accessToken') || ''
    }
  };

  return fetchWithRefresh<TUserResponse>(USER_URL, options);
};

export const getOrderByNumber = (number: number): Promise<{success: boolean, orders: TFeedOrder[]}> => 
  fetch(`${ORDER_URL}/${number}`)
    .then(checkResponse<{success: boolean, orders: TFeedOrder[]}>)