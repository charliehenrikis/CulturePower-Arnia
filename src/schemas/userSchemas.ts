import * as yup from 'yup';  

// Defina o esquema de validação do usuário
export const userSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email deve ser válido').required('Email é obrigatório'),
    password: yup.string().required('Senha é obrigatória').min(6, 'A senha deve ter pelo menos seis caracteres'),
    photo: yup.string().optional(),
});

