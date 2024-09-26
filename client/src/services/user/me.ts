import {InferType} from 'yup';
import { ENV } from '@/utils/constants';
import { userResponseSchema } from '@/utils/schemas';

type Response = InferType<typeof userResponseSchema>;

export const getMe = async (accessToken: string): Promise<[Error | null, Response['data'] | null]> => {


  try {
    const response = await fetch(ENV.PROFILE, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    console.log({data});
    
    const result = await userResponseSchema.validate(data);

    if (!result) throw new Error(response.statusText);

    return [null, result.data];
  } catch (err) {
    if (err instanceof Error) return [err, null];
    return [new Error('Unknown error'), null];
  }
}