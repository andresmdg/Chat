import * as Yup from 'yup';

import {ENV} from '@/utils/constants';


interface LoginCredentials {
  password: string;
  email: string
}

const responseValidator = Yup.object({
  success: Yup.boolean().required(),
  token: Yup.string().required(),
  message: Yup.string().required()
});

type Response = Yup.InferType<typeof responseValidator>

export const login = async (credentials: LoginCredentials): Promise<[Error | null, Response | null]> => {
  const { password, email } = credentials;
  const user = {
    password,
    email
  }

  try {
    const response = await fetch(ENV.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const result = await response.json();
    const validResponse = await responseValidator.validate(result);

    if (!validResponse.success) throw new Error(validResponse.message);
    return [null , validResponse];
  } catch (error) {
    if (error instanceof Error) {
      return [new Error(error.message), null];
    }
    return [new Error('An error occurred'), null];
  }
}