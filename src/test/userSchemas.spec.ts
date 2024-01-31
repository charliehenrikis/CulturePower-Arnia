import { describe, it, expect } from 'vitest'
import { userSchema } from '../schemas/userSchemas'

describe('userSchema', () => {
  const validUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'senha123',
  }

  const invalidUserData = {
    name: '',
    email: 'john.doe@example.com',
    password: 'senha123',
  }

  it('deve validar um usuário válido', async () => {
    await expect(userSchema.validate(validUserData)).resolves.toEqual(
      validUserData
    )
  })

  it('deve gerar erro sem nome', async () => {
    await expect(
      async () => await userSchema.validate(invalidUserData)
    ).rejects.toThrowError('')
  })

  it('deve gerar erro com email inválido', async () => {
    invalidUserData.email = 'john.doeinvalid'
    await expect(userSchema.validate(invalidUserData)).rejects.toThrow(
      'Email deve ser válido'
    )
  })

  it('deve gerar erro sem senha', async () => {
    invalidUserData.password = ''
    await expect(userSchema.validate(invalidUserData)).rejects.toThrow(
      'Senha é obrigatória'
    )
  })

  it('deve gerar erro com senha curta', async () => {
    invalidUserData.password = 'abc12'
    await expect(userSchema.validate(invalidUserData)).rejects.toThrow(
      'A senha deve ter pelo menos seis caracteres'
    )
  })
})
