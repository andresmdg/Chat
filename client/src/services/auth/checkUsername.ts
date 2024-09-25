import { ENV } from "@/utils/constants"
import { userResponseSchema } from '@/utils/schemas';

export const checkUsername = async (username: string) => {
  try {
    const response = await fetch(ENV.USER.GET_BY_USERNAME(username));
    const data = await response.json();

    const validateUser = await userResponseSchema.validate(data);

    if (validateUser.user) return true;
    return false;
  } catch {
    return false;
  }
}