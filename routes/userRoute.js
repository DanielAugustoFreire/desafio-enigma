import express from 'express';
import UserController from '../controller/userController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
const auth = new AuthMiddleware();
const ctrl = new UserController();

router.get('/', auth.autenticarUsuario, (req, res) => {
    // #swagger.tags = ['User - CRUD']
    // #swagger.summary = 'Leitura dos Usuários'
    // #swagger.description = 'Lista todos os usuários cadastrados no sistema.'
    ctrl.listarUsuarios(req, res);
});

router.post('/', auth.autenticarUsuario, (req, res) => {
    // #swagger.tags = ['User - CRUD']
    // #swagger.summary = 'Cadatro de Usuário'
    // #swagger.description = 'Permite o cadastro de novos usuários no sistema.' 
    /*  #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    nome: { type: "string" },
                    email: { type: "string" },
                    senha: { type: "string" },
                },
                required: ["nome","email", "senha"]
            },
            example: {
                nome: "",
                email: "",
                senha: ""
            }
        }
    }
}*/
    ctrl.criarUsuario(req, res);
});

router.put('/:id', auth.autenticarUsuario, (req, res) => {
    // #swagger.tags = ['User - CRUD']
    // #swagger.summary = 'Atualização de Usuário'
    // #swagger.description = 'Permite a edição do nome de um usuário específico, excluindo o usuário MESTRE.' 
    /*  #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    nome: { type: "string" },
                },
                required: ["nome"]
            },
            example: {
                nome: "",

            }
        }
    }
}*/
    ctrl.atualizarNomeUsuario(req, res);
});

router.delete('/:id', auth.autenticarUsuario, (req, res) => {  
    // #swagger.tags = ['User - CRUD']
    // #swagger.summary = 'Deleçao de Usuário'
    // #swagger.description = 'Permite deletar um usuário, exceto o usuário MESTRE.' 
    ctrl.deletarUsuario(req,res);
});

export default router;