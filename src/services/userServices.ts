
import { userSchema } from '../schemas/userSchemas';
import userRepository from '../repository/userRepository';
import bcrypt from 'bcrypt';

class UserServices {
  async createUser(newUser: { email: any; password: string | Buffer; name: any; photo: any; }) {
    try {
      await userSchema.validate(newUser, { abortEarly: false });

      const passwordHashed = await bcrypt.hash(newUser.password, 10);
  
      const createdUser = await userRepository.createUser({
        name: newUser.name,
        email: newUser.email,
        password: passwordHashed,
        photo: newUser.photo,
      });
  
      return { createdUser };
  
    } catch (error) {
      throw new Error(`Error na criação do usuario`);
    }
  };
}


export default new UserServices;
