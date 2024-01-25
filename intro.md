
**MODELOS**

Admin 
- Name: string
- Email: string
- Password: string

Product
- Name: string
- Value: number
- Amount: number
- Description: string
- Photo: string

User
- Name: string
- Email: string
- Password: string
- jewelsAmount: number
- Products: Product[]
- FavoriteProducts: Product[]
- Photo: string


**CENÁRIOS DE USO**

1. **Cadastro de Usuário**
   - Informações necessárias: nome, e-mail, senha, foto
   - Não permitir o cadastro se um usuário com o mesmo e-mail já existir
   - Criptografar a senha antes de armazenar no banco de dados

2. **Login de Usuário**
   - Informações necessárias: e-mail e senha
   - Não gerar um token se não existir um usuário com o e-mail fornecido
   - Não gerar um token se a senha enviada não for compatível com a do banco de dados
   - Gerar um token e retornar se as credenciais estiverem corretas

3. **Login de Admin**
   - Informações necessárias: e-mail e senha
   - Não gerar um token se não existir um admin com o e-mail fornecido
   - Não gerar um token se a senha enviada não for compatível com a do banco de dados
   - Gerar um token e retornar se as credenciais estiverem corretas

4. **Visualizar Usuário Logado (ROTA PRIVADA)**
   - Retornar os dados do usuário logado

5. **Cadastro de Produto (ROTA PRIVADA - ADMIN)**
   - Informações necessárias: nome, valor, quantidade, descrição e foto
   - Não permitir o envio se o usuário que está executando a ação não for um administrador

6. **Edição de Produto (ROTA PRIVADA - ADMIN)**
   - Informações necessárias: nome, valor, quantidade, descrição e foto
   - Não permitir o envio se o usuário que está executando a ação não for um administrador

7. **Listar Todos os Produtos (ROTA PRIVADA)**
   - Deve listar os produtos com quantidade maior que 0

8. **Buscar Produto por ID (ROTA PRIVADA)**
   - Deve ser informado: id
   - Deve retornar o produto caso encontrado

11. **Enviar Joia para Usuário (ROTA PRIVADA - ADMIN)**
    - Informações necessárias: quantidade de joia, ID do usuário
    - Não permitir o envio se o usuário não existirem
    - Não permitir o envio se o usuário que está executando a ação não for um administrador

12. **Resgatar Produto (ROTA PRIVADA)**
    - Informações necessárias: ID do produto, ID do usuário
    - Não permitir o resgate se o produto ou o usuário não existirem
    - Não permitir o resgate se o usuário não tiver joias suficientes
    - Decrementar o valor do produto pela quantidade de joias
    - Decrementar a quantidade do produto