import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Lista todos os usuários cadastrados no sistema.'
    res.send('Hello World!');
});

router.post('/', (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Permite o cadastro de novos usuários no sistema.' 
    res.send('Hello World!');
});

router.put('/', (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Permite a edição do nome de um usuário específico, excluindo o usuário MESTRE.' 
    res.send('Hello World!');
});

router.delete('/', (req, res) => {  
    // #swagger.tags = ['User']
    // #swagger.description = 'Permite deletar um usuário, exceto o usuário MESTRE.' 
    res.send('Hello World!');
});

export default router;