import bcrypt from 'bcrypt';

export async function hashPassword(password: string | Buffer) {
  return await bcrypt.hash(password, 8);
}
