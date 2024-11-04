# Solução para o Desafio: Ataque contra a ENIGMA

## Introdução

Neste projeto, desenvolvi uma aplicação em JavaScript para recriar um sistema de ataque à máquina ENIGMA, focando na implementação de um sistema seguro de gerenciamento de chaves e usuários, além de permitir a descriptografia de documentos criptografados.

## Estrutura do Projeto

A aplicação é organizada utilizando o padrão MVC (Model-View-Controller) com Entidades e Repositories.

# Como usar?
***De acordo com as instruções: "Certifique-se de que todas as dependências estejam listadas e documentadas." A branch `master` contém todas as dependências já instaladas, portanto, sem o .gitignore para Node. Caso deseje baixar uma branch com o .gitignore (para não fazer o download da node_modules pelo navegador), baixe a branch `Daniel`.***

Para instalar as dependências, digite (caso esteja usando a branch Daniel):
``` 
    npm install
```
Preencha o arquivo `./database/database.js` com os seguintes dados do seu banco de dados MySql:
```
    host:
    database:
    user:
    password: 
```
![image](https://github.com/user-attachments/assets/32f08064-eea1-4148-9c96-232bfa3a130f)

Para rodar o projeto:
``` 
    npm start
```

Acesso à área documentada com swagger: [localhost:5000/docs](localhost:5000/docs)

## Funcionalidades Implementadas

## 1. Persistência de Dados

Utilizei **MySQL** como banco de dados para armazenar as chaves de criptografia e os usuários. As conexões e operações com o banco foram gerenciadas na camada de `repositories`, garantindo que todas as operações de CRUD fossem executadas de forma eficiente.

No repositório, há um script de criação das tabelas, bem como uma imagem do diagrama delas. Para testar com o seu banco MySql conectado, basta preencher os dados do seu banco no arquivo `./database/database.js`

![image](https://github.com/user-attachments/assets/32f08064-eea1-4148-9c96-232bfa3a130f)

## 2. Usuário MESTRE

Ao iniciar a aplicação pela primeira vez, um usuário MESTRE é criado automaticamente, garantindo que o sistema tenha um administrador sempre disponível. Esse usuário tem privilégios totais e não pode ser modificado ou excluído. Apenas o usuario Mestre pode ver a lista de chaves paginadas e realizar o CRUD dos usuarios.
```bash 
Nome: Mestre, Email: mestre@enigma.com, Senha: Xsejmfççtrcty548!40
```

## 3. Autenticação e Autorização

Implementei autenticação baseada em **JWT**. O token é gerado após o login, tem um tempo de expiração de 1 dia e é renovado a cada requisição autenticada. A verificação do token é realizada por meio de um middleware, que protege os endpoints sensíveis.

## 4. Proteção Contra Força Bruta

### Visão Geral
Este módulo implementa um sistema de controle de tentativas de autenticação, prevenindo abusos através do bloqueio temporário de endereços IP após um número excessivo de tentativas de login falhas. O objetivo é proteger a aplicação contra ataques de força bruta e melhorar a segurança geral.

### Funcionalidade
O módulo monitora as tentativas de autenticação e aplica as seguintes regras:

### Contagem de Tentativas:
- A cada tentativa de login, o módulo registra o IP do cliente e incrementa o contador de tentativas em uma variavel global com um array de sessoes e cada sessao corresponde a um ip.

### Bloqueio de IP:
- Se um cliente atingir um número de tentativas múltiplo de 3 (ex.: 3, 6, 9, etc.), o IP será temporariamente banido.
- O tempo de banimento base é de 1 minuto * numero de tentativas falhas.


## 5. Endpoints da API

Desenvolvi os seguintes endpoints utilizando Express:

- **GET /api/current-key**: Retorna a chave de criptografia atual.
- **GET /api/keys?page={n}**: Lista todas as chaves, suportando paginação.
- **GET /api/users**: Lista todos os usuários cadastrados.
- **POST /api/users**: Permite o cadastro de novos usuários.
- **PUT /api/users/:id**: Permite editar o nome de um usuário.
- **DELETE /api/users/:id**: Permite deletar um usuário, exceto o MESTRE.
- **POST /api/decrypt**: Recebe um arquivo criptografado e a primeira palavra descriptografada, tentando descriptografar o arquivo.

### 6. Segurança

Implementei boas práticas de segurança, incluindo o armazenamento seguro das senhas usando hashing com salt. A aplicação também previne ataques de força bruta e injeções.

Problema: Não consegui de forma alguma resolver o problema do cliente pegar o token de um mestre e colar no próprio token.


