import * as Yup from 'yup';
import {ENV} from '@/utils/constants';


interface SignupCredentials {
  name: string;
  password: string;
  username: string
}

const responseValidator = Yup.object({
  success: Yup.boolean().required(),
  message: Yup.string().required()
})

type Response = Yup.InferType<typeof responseValidator>

export const signup = async (credentials: SignupCredentials): Promise<[Error | null, Response | null]> => {
  const { name, password, username } = credentials;

  const user = {
    name,
    password,
    username
  }

  try {
    const response = await fetch(ENV.AUTH.REGISTER, {
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
    return [new Error('An unknown error occurred'), null];
  }
}