export type TBurgerIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TDragIngredient = TBurgerIngredient & {
  key: string
}

export type TUserData = {
  email: string;
  name: string;
  password: string;
}

export type TTokens = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TUserResponse = TTokens & {
  user: Omit<TUserData, 'password'>;
};

export type TResetPassword = Pick<TUserData, 'password'> & {
  token: string;
}

export type TFetchOptions = {
  headers: {
    authorization?: string;
    accept: string;
    'Content-Type': string;
  };
};
