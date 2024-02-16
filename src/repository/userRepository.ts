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

  async findById(id: string) {
    return await User.findById(id).exec()
  }

  async findByIdAndUpdate(id: string, newData: any) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, newData, {
        new: true,
      }).exec()
      return updatedUser
    } catch (error: any) {
      throw new Error(`Erro ao salvar o usuario: ${error.message}`)
    }
  }
}
