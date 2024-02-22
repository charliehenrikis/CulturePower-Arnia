# 🚀 Projeto Arnia - Culture Power 🚀


## 🐝 Módulo 02 -  🏆 Gamificação para engajamento e aprendizado!

Este documento descreve a implementação do BackEnd da aplicação de gamificação "Culture Power" para a empresa "Exemplo".

🛠️ Tecnologias:

BCrypt: 🔐 Criptografia de senhas

DotEnv: 📁 Gerenciamento de variáveis de ambiente

Express: 🌐 Framework web

JsonWebToken: 🛂 Autenticação e autorização

Mongoose: 📦 ORM para MongoDB

Multer: 📤 Upload de arquivos (foto)

Yup: 📝 Validação de dados

Eslint: ✨ Formatação de código

Prettier: 🎨 Formatação de código

Ts-Node-Dev: 🛠️ Desenvolvimento com TypeScript

TypeScript: 💻 Linguagem de programação

# 👨‍👩‍👧‍👦 Modelo e Regras de Negócio:

## Modelos:

#Produto:

Nome (string)
Valor (number)
Quantidade (number)
Descrição (string)
Foto (string)

#Usuário:

Nome (string)
Email (string)
Password (string)
Quantidade de Joias (number) 
Produtos (Product[])
Produtos Favoritos (Product[])
Foto (string)

## ✨ Cenários de Uso:

### 1. Cadastro de Usuário:

Informações necessárias: 📝 nome, e-mail, senha, foto

Validações: 🕵️‍♀️
O e-mail não pode estar cadastrado
A senha deve ter no mínimo 8 caracteres 🔐

Criptografia: 🔒 A senha é criptografada antes de ser armazenada no banco de dados.
Armazenamento: 💾 A foto do usuario é armazenada no servidor. O envio de foto é opcional.

### 2. Login de Usuário:

Informações necessárias: 🔑 e-mail e senha

Validações: 🕵️‍♀️
O usuário deve estar cadastrado
A senha informada deve ser válida

Autenticação: 🛂 Se as credenciais forem válidas, um token JWT é gerado e retornado.

### 3. Login de Admin:

Validações: 🕵️‍♀️
O administrador deve estar cadastrado no banco
O campo "isAdmin" deve estar como "True" 👑

Autenticação: 🛂 Se as credenciais forem válidas, o middleware de verificação de admin executará o Next() e continuará com o restante da rota.

### 4. Visualizar Usuário Logado (Rota Privada):

Retorno: 👁️‍🗨️ Os dados do usuário logado.

### 5. Cadastro de Produto (Rota Privada - Admin):

Informações necessárias: 📝 nome, valor, quantidade, descrição e foto

Validações: 🕵️‍♀️
O nome do produto não pode estar duplicado
A quantidade deve ser um número positivo 📈
O valor deve ser um número positivo 💰

Armazenamento: 💾 A foto do produto é armazenada no servidor. O envio de foto é opcional.

### 6. Edição de Produto (Rota Privada - Admin):

Informações necessárias: 📝 nome, valor, quantidade, descrição e foto

Validações: 🕵️‍♀️
O produto deve existir

### 7. Listar Todos os Produtos disponíveis (Rota Privada):

Retorno: 🎁 Lista os produtos com quantidade maior que 0.

### 8. Buscar Produto por ID (Rota Privada):

Informação necessária: 🔍 id do produto

Retorno: 👁️‍🗨️ O produto caso encontrado.

### 9. Enviar Joia para Usuário (Rota Privada - Admin):

Informações necessárias: 💎 quantidade de joias, ID do usuário

Validações: 🕵️‍♀️
O usuário deve existir
A quantidade de joias não pode ser menor que zero
O usuário que está enviando a joia deve ser administrador 👑

Atualização: A quantidade de joias do usuário é incrementada.

### 10. Resgatar Produto (Rota Privada) 

Informações necessárias: ID do produto, ID do usuário

Validações: 🕵️‍♀️

O produto deve existir 🎁

O produto deve ter estoque 

O usuário deve existir

O usuário deve ter joias suficientes para resgatar o produto 💎

Atualização:

A quantidade de joias do usuário é decrementada pelo valor do produto

A quantidade do produto é decrementada
