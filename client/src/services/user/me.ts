import * as Yup from 'yup';
import { ENV } from '@/utils/constants';
import {jwtDecode} from 'jwt-decode';
import { decodeTokenSchema, userResponseSchema } from '@/utils/schemas';

type Response = Yup.InferType<typeof userResponseSchema>;

export const getMe = async (accessToken: string): Promise<[Error | null, Response['user'] | null]> => {
  const decodeToken = jwtDecode(accessToken);

  const decoded = await decodeTokenSchema.validate(decodeToken);

  try {
    if (!decoded) throw new Error('Token invalido');

    const {id} = decoded;
    const response = await fetch(ENV.USER.GET_USER(id));
    const data = await response.json();

    const result = await userResponseSchema.validate(data);

    if (!result) throw new Error(response.statusText);

    return [null, result.user];
  } catch (err) {
    if (err instanceof Error) return [err, null];
    return [new Error('Unknown error'), null];
  }
}