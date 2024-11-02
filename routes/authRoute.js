import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    // #swagger.tags = ['Autenticacao']
    // #swagger.summary = 'Autenticação de Usuário'
    // #swagger.description = 'Permite que com o email e senha, o usuário autentique-se no sistema.'
    res.send('Hello World!');
});


export default router;