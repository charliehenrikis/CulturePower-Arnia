import User from '../model/userModel'

class UserRepository {
  async findByEmail(email: string) {
    return await User.findOne({ email })
  }

  async createUser(userData: any) {
    const user = new User(userData)
    await user.save()
    return user
  }

  async findAll() {
    return await User.find()
  }
}

export default new UserRepository()
