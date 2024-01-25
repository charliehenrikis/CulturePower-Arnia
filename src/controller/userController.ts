import { request, response } from 'express'; 
import * as yup from 'yup';  
import User from '../model/userModel'; 
import bcrypt from "bcrypt"

// Defina o esquema de validação do usuário
const userSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email deve ser válido').required('Email é obrigatório'),
    password: yup.string().required('Senha é obrigatória').min(6, 'A senha deve ter pelo menos seis caracteres'),
    photo: yup.string().optional(),
});

// Defina a função assíncrona createUser
const createUser = async (req = request, res = response) => {
    try {
        // Valida os dados do usuário
        await userSchema.validate(req.body, { abortEarly: false });

        // Verifica se o e-mail já existe no banco de dados
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({
                message: 'E-mail já registrado',
            });
        }
         
        // Cria o usuário
        const passwordHashed = await bcrypt.hash(req.body.password, 8);
        
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: passwordHashed,
            photo: req.body.photo,
        });
        await user.save();

        res.status(201).send({
            message: 'Usuário foi criado!',
            user: user,
        });
    } catch (error) {
        res.status(400).send({
            message: 'Houve um erro na criação do usuário',
        });
    }
};

export default createUser;
