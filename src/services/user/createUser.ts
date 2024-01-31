import userRepository from "../../repository/userRepository";
import { hashPassword } from "./hashPassword";

export async function createUser(newUser: {
  email: any;
  password: string | Buffer;
  name: any;
  photo: any;
}) {
  const passwordHashed = await hashPassword(newUser.password);
  return await userRepository.createUser({
    name: newUser.name,
    email: newUser.email,
    password: passwordHashed,
    photo: newUser.photo,
  });
}
