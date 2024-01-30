import User from "../model/userModel";

class UserRepository {
    static UserRepository: any;
    async findByEmail(email: string) {
        return User.findOne({ email });
    }

    async createUser(userData: any) {
        const user = new User(userData);
        await user.save();
        return user;
    }
}

export default new UserRepository;
