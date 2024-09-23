import * as Yup from 'yup';

import {ENV} from '@/utils/constants';
import { loginResponseValidator } from '@/utils/schemas';


interface LoginCredentials {
  password: string;
  email: string
}

type Response = Yup.InferType<typeof loginResponseValidator>

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
    const validResponse = await loginResponseValidator.validate(result);

    if (!validResponse.success) throw new Error(validResponse.message);
    return [null , validResponse];
  } catch (error) {
    if (error instanceof Error) {
      return [new Error(error.message), null];
    }
    return [new Error('An error occurred'), null];
  }
}