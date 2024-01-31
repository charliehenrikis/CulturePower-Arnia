import { type Request, type Response } from 'express'
import userService from '../services/userServices'
import userRepository from '../repository/userRepository'

class UserController {
  createUser = async (req: Request, res: Response) => {
    try {
      // Extrai os dados do corpo da requisição
      const { email } = req.body

      // Verifica se o e-mail já está registrado
      const existingUser = await userRepository.findByEmail(email)

      if (existingUser != null) {
        throw new Error(`E-mail ${email} já registrado`)
      }

      // Cria o usuário
      const result = await userService.createUser(req.body)

      res.status(201).send({
        message: 'Usuário foi criado!',
        user: result
      })
    } catch (error) {
      res.status(400).send({
        message: 'Houve um erro na criação do usuário}',
      })
    }
  }

  listAllUsers = async (req: Request, res: Response) => {
    const users = await userRepository.findAll()
    res.status(200).send(users)
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id.replace('id:', '');
      const deleteUser = await userRepository.deleteUser(id);

      if (!deleteUser) {
        res.status(404).send({ message: `Usuário com ID ${id} não encontrado` });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).send('Erro interno do servidor');
    }
  }
}

export default UserController
