import { describe, it, expect } from 'vitest';
import { userSchema } from '../schemas/userSchemas';


//prototico de teste (este não necessariamente será usado)
describe('userSchema', () => {
  const validUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'senha123',
  };

  const invalidUserData = {
    name: 'John Doe',
    email: 'john.doeexample.com',
    password: 'senha123',
  };

  it('deve validar um usuário válido', async () => {
    await expect(userSchema.validate(validUserData)).resolves.toEqual(validUserData);
  });

  //este teste esta correto mas algo esta errado , verificar
  it('deve gerar erro sem nome', async () => {
    validUserData.name = '';
  await expect(() => userSchema.validate(invalidUserData))
      .rejects.toThrowError('Email deve ser válido');
  });

  it('deve gerar erro com email inválido', async () => {
    invalidUserData.email = 'john.doeinvalid';
    await expect(userSchema.validate(invalidUserData)).rejects.toThrow('Email deve ser válido');
  });

  it('deve gerar erro sem senha', async () => {
    invalidUserData.password = '';
    await expect(userSchema.validate(invalidUserData)).rejects.toThrow('Senha é obrigatória');
  });

  it('deve gerar erro com senha curta', async () => {
    invalidUserData.password = 'abc12';
    await expect(userSchema.validate(invalidUserData)).rejects.toThrow('A senha deve ter pelo menos seis caracteres');
  });
});
