import express from 'express'
import KeyController from '../controller/keyController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
const auth = new AuthMiddleware();
const ctrl = new KeyController();


router.post("/decrypt", (req, res) => {
    // #swagger.tags = ['Key']
    // #swagger.summary = 'Descriptografar'
    // #swagger.description = 'Este endpoint recebe um arquivo criptografado e uma string com a primeira palavra descriptografada do arquivo: -Se a string estiver vazia, o sistema deve tentar descriptografar o arquivo usando a chave atual. -A nova chave resultante deve ser registrada no banco de dados e substituir a chave anterior como a chave atual.'
    /*  #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    mensagem: { type: "string" },
                    chave: { type: "string" }
                },
                required: ["mensagem"]
            },
            example: {
                mensagem: "",
                chave: "",
            }
        }
    }
    }*/
    ctrl.descriptografar(req, res);
}); 

router.get("/current-key", (req, res) => {
    // #swagger.tags = ['Key']
    // #swagger.summary = 'Obter chave atual'
    // #swagger.description = 'Retorna a chave atual do sistema.'
    ctrl.obterChaveAtual(req, res);
});




export default router;