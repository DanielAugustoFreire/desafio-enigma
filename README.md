
# Desafio: Ataque contra a ENIGMA

## Descrição

Você foi convocado para recriar um sistema de ataque à mítica máquina ENIGMA. Durante a Segunda Guerra Mundial, a ENIGMA foi um marco de invencibilidade, mas, após décadas de inatividade, ela voltou à cena, adotando uma configuração curiosa: a icônica cifra de César. Por razões que escapam ao nosso entendimento (aparentemente uma preferência pessoal da ENIGMA por clássicos), a chave de criptografia agora tem o comprimento da primeira palavra em cada mensagem interceptada. Essa decisão levanta suspeitas, mas cabe a você superá-la.
Sua tarefa é desenvolver uma aplicação robusta para gerenciar essas chaves, além de gerenciar usuários e decifrar documentos criptografados. A linguagem de implementação foi escolhida por ordens superiores, e todos os protocolos indicam que apenas Golang pode suportar o processamento necessário.

## Objetivos Gerais

O sistema deve incluir uma estrutura robusta de autenticação, funcionalidades para gerenciamento de chaves criptográficas, e endpoints para cadastro e manipulação de usuários. Além disso, a aplicação deve processar arquivos criptografados, permitindo descriptografá-los com uma chave específica ou com a última chave registrada no sistema.

## Requisitos Funcionais

### Persistência de Dados
1. A aplicação deve manter um registro de todas as chaves de criptografia utilizadas, armazenando-as em um banco de dados para garantir um histórico completo.

### Usuário MESTRE
2. No primeiro uso da aplicação, d  eve ser criado automaticamente um **usuário MESTRE** com privilégios exclusivos.
   - O usuário MESTRE é essencial para a administração do sistema e **não pode ser editado ou deletado**.

### Autenticação e Autorização
3. Implementar autenticação baseada em **JWT (JSON Web Token)**:
   - O token JWT deve expirar em **1 dia** para manter a segurança do sistema.
   - Apenas usuários autenticados com um JWT válido devem poder acessar as funcionalidades principais.

### Endpoints da API
4. A API deve disponibilizar os seguintes endpoints:

   - **GET /current-key**: Retorna a chave de criptografia atual em uso.
   
   - **GET /keys?page={n}**: Retorna uma lista paginada de todas as chaves de criptografia registradas no sistema, para facilitar o gerenciamento do histórico de chaves.

   - **GET /users**: Lista todos os usuários cadastrados no sistema.

   - **POST /users**: Permite o cadastro de novos usuários no sistema.

   - **PUT /users/{id}**: Permite a edição do nome de um usuário específico, excluindo o usuário MESTRE.

   - **DELETE /users/{id}**: Permite deletar um usuário, exceto o usuário MESTRE.

   - **POST /decrypt**: Este endpoint recebe um arquivo criptografado e uma string com a primeira palavra descriptografada do arquivo:
      - Se a string estiver vazia, o sistema deve tentar descriptografar o arquivo usando a chave atual.
      - A nova chave resultante deve ser registrada no banco de dados e substituir a chave anterior como a chave atual.

### Paginação
5. O histórico de chaves deve ser paginável para otimizar o desempenho e a experiência do usuário em casos de grandes volumes de dados.

## Regras de Negócio

- **Usuário MESTRE**: Não pode ser modificado nem excluído. Deve ter privilégios de acesso completo ao sistema.
  
- **Segurança**:
   - As senhas dos usuários devem ser armazenadas de maneira segura utilizando hashing com salt.
   - A aplicação deve seguir boas práticas de segurança para prevenir vulnerabilidades como ataques de força bruta e tentativas de injeção.

## Requisitos Não Funcionais

- **Linguagem**: Golang.
- **Banco de Dados**: Escolha à sua preferência (PostgreSQL, MySQL, SQLite, etc.).
- **Autenticação**: JWT com expiração configurada para 1 dia.
- **Documentação**: Deve ser fornecida documentação completa da API (preferencialmente com Swagger ou outra ferramenta similar).
- **Código Limpo**: O código deve ser organizado e de fácil leitura, seguindo boas práticas de estruturação e estilo.
- **Testes Unitários (Opcional)**: A aplicação não exige testes unitários obrigatórios. No entanto, a implementação de uma suíte de testes que cobre as funcionalidades principais é recomendada e será considerada um **diferencial na avaliação**, proporcionando pontos extras.
- **Docker (Opcional)**: A utilização do Docker neste projeto é opcional. No entanto, seu uso acrescentará um **diferencial** à avaliação

## Orientações para Testes Unitários (Opcional)

Se optar por implementar testes, concentre-se nas seguintes áreas:
   - **Validação de Autenticação**: Testes que verifiquem o fluxo de autenticação JWT, incluindo criação e expiração de tokens.
   - **Endpoints Principais**: Testes para os endpoints de criação, leitura, atualização e exclusão de usuários, além de verificação de permissões para o usuário MESTRE.
   - **Processamento de Arquivos**: Teste o fluxo de descriptografia, especialmente o uso da chave correta e a substituição da chave atual.

Os testes podem ser executados com o comando:

```bash
go test ./...
```

A aplicação deve incluir uma instrução sobre a configuração do ambiente de teste, especialmente se houver dependências de banco de dados.

## Objetivos do Desafio

Este desafio tem o objetivo de avaliar as habilidades em:

- Desenvolvimento de APIs RESTful seguras e escaláveis.
- Implementação de autenticação e autorização com JWT.
- Manipulação de arquivos e criptografia.
- Persistência de dados e operações de CRUD no banco de dados.
- Utilização de boas práticas de programação e segurança em Golang.
- **Implementação opcional de testes unitários para demonstrar habilidades em cobertura e validação de código.**

## Instruções para Entrega

1. Forneça o código-fonte completo da aplicação em um repositório.
2. Inclua um arquivo README com instruções sobre como executar a aplicação e exemplos de uso dos endpoints.
3. Certifique-se de que todas as dependências estejam listadas e documentadas.
4. **Testes Unitários**: Se optar por implementá-los, forneça instruções detalhadas para a execução e configuração do ambiente de testes.

---

**Boa sorte e bom desenvolvimento!**
