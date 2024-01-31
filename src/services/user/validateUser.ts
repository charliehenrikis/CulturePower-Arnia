import { userSchema } from "../../schemas/userSchemas";


export async function validateUser(newUser: {
  email: any;
  password: string | Buffer;
  name: any;
  photo: any;
}) {
  await userSchema.validate(newUser, { abortEarly: false });
}
