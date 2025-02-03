import express from 'express';
import AuthController from '../controller/authController.js';

const router = express.Router();

const ctrl = new AuthController();

router.post('/', (req, res) => {
    // #swagger.tags = ['Autenticacao']
    // #swagger.summary = 'Autenticação de Usuário'
    // #swagger.description = 'Permite que com o email e senha, o usuário autentique-se no sistema.'
    /*  #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    email: { type: "string" },
                    senha: { type: "string" }
                },
                required: ["email", "senha"]
            },
            example: {
                email: "danielaugustosant@hotmail.com",
                senha: "12345"
            }
        }
    }
} */
    ctrl.autenticarUsuario(req, res);
});

router.get('/', (req, res) => {
    // #swagger.tags = ['Autenticacao']
    // #swagger.summary = 'Validacao de Autenticacao'
    // #swagger.description = 'Middleware requisita ao back se esta tudo conforme'
    ctrl.ValidarTokenAtivo(req, res);
});


export default router; 