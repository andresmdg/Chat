  import { ENV } from "@/utils/constants";
  import { updateResponseValidator } from "@/utils/schemas";
  import { InferType } from "yup";

  type UpdateResponse = InferType<typeof updateResponseValidator>;
  export class Profile {

    static async updatePhoto (file: File, accessToken: string): Promise<[Error | null, UpdateResponse | null]> {
      try {
        const formData = new FormData();
        formData.append('avatar', file);
        console.log({formData: Object.keys(formData)});

        const response = await fetch(ENV.PROFILE, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          },
          body: formData
        })
        const data = await response.json();

        const validateData = await updateResponseValidator.validate(data);

        if (!validateData.success) throw new Error(validateData.message);

        return [null, validateData]
      } catch (error) {
        if (error instanceof Error) return [error, null];
        return [new Error('Unknown Error'), null];
      }
    }
  }