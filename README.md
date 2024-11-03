# Solução para o Desafio: Ataque contra a ENIGMA

## Introdução

Neste projeto, desenvolvi uma aplicação em JavaScript para recriar um sistema de ataque à máquina ENIGMA, focando na implementação de um sistema seguro de gerenciamento de chaves e usuários, além de permitir a descriptografia de documentos criptografados.

## Estrutura do Projeto

A aplicação é organizada utilizando o padrão MVC (Model-View-Controller) com Entidades e Repositories.

# Como usar?

Para instalar as dependencias digite:
``` 
    npm install
```
Para rodar o projeto:
``` 
    npm start
```

Acesso à area documentada com swagger:localhost:5000/docs

## Funcionalidades Implementadas

### 1. Persistência de Dados

Utilizei **MySQL** como banco de dados para armazenar as chaves de criptografia e os usuários. As conexões e operações com o banco foram gerenciadas na camada de `repositories`, garantindo que todas as operações de CRUD fossem executadas de forma eficiente.

### 2. Usuário MESTRE

Ao iniciar a aplicação pela primeira vez, um usuário MESTRE é criado automaticamente, garantindo que o sistema tenha um administrador sempre disponível. Esse usuário tem privilégios totais e não pode ser modificado ou excluído.       
```bash 
Nome: Mestre, Email: mestre@enigma.com, Senha: 12345
```

### 3. Autenticação e Autorização

Implementei autenticação baseada em **JWT**. O token é gerado após o login, tem um tempo de expiração de 1 dia e é renovado a cada requisição autenticada. A verificação do token é realizada através de um middleware, que protege os endpoints sensíveis.

### 4. Proteção Contra Força Bruta

Para prevenir ataques de força bruta, implementei um sistema que baniu o IP do usuário por 10 minutos após 3 tentativas de login falhadas. Isso é gerenciado por meio de um middleware de limitação de taxa.

### 5. Endpoints da API

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

## Testes Unitários

Embora não sejam obrigatórios, implementei testes unitários utilizando **Jest** para as funcionalidades principais, focando em:

- **Validação de Autenticação**: Testes para garantir a criação e expiração de tokens JWT.
- **Endpoints**: Testes para garantir que os endpoints funcionem corretamente e respeitem as regras de acesso.
- **Processamento de Arquivos**: Testes para garantir a correta descriptografia usando a chave correta.

Os testes podem ser executados com o comando:

```bash
npm test

