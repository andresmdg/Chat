import * as Yup from 'yup'
import { loginResponseValidator } from "@/utils/schemas";
import { ENV } from "@/utils/constants";

type Response = Yup.InferType<typeof loginResponseValidator>;

export const relogin = async (accessToken: string): Promise<[Error | null, Response | null]> => {
  try {
    const response = await fetch(ENV.AUTH.RELOGIN, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
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