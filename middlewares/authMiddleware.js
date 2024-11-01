import jwt from 'jsonwebtoken';

const SEGREDO = 'segredo';

export default class AuthMiddleware{

    gerarToken(id, nome, email, regra) {
        return jwt.sign({ id, nome, email, regra}, SEGREDO, {expiresIn: "1d"})
    }

    async validar(req,res,next){
        
    }

}