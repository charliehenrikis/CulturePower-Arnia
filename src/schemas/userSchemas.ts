import * as Yup from 'yup'
import { TypedRequest } from '../util/typedRequest'

// Defina o esquema de validação do usuário
export const userSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('Email deve ser válido')
    .required('Email é obrigatório'),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos seis caracteres'),
  photo: Yup.string().optional(),
})

export namespace CreatePerson {
  export type BodyType = TypedRequest<typeof userSchema>
  export const schema = Yup.object().shape({ body: userSchema })
}

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Email deve ser válido')
    .required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
})

export namespace LoginPerson {
  export type LoginBodyType = TypedRequest<typeof loginSchema>
  export const schema = Yup.object().shape({ body: loginSchema })
}
