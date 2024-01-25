import express from "express";
import * as yup from "yup";
import User from "../model/userModel";

const router = express.Router();

const userSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email deve ser valido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória").min(6, "A senha não cumpre os requisitos de seis caracteres"),
});

router.post("/", async (req, res) => {
  try {
    await userSchema.validate(req.body);
    // Verifica se o e-mail já existe no banco de dados
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      throw new Error("E-mail já registrado");
    }

    const user = new User(req.body);
    await user.save();

    res.status(201).send({
      message: "Usuario foi criado!",
    });
  } catch (error) {
    res.status(400).send({
      message: "Houve um erro na criação do usuario"
    });
  }
});

export default router;
