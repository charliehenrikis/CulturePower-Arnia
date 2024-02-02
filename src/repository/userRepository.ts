import User from '../model/userModel'

export class UserRepository {
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

  async deleteUser(id: string) {
    const deletedUser = await User.findByIdAndDelete(id).exec()
    return deletedUser
  }
}
