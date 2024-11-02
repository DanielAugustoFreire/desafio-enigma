import jwt from 'jsonwebtoken';

const SEGREDO = 'segredo';

export default class AuthMiddleware{

    gerarToken(id, nome, email, master) {
        return jwt.sign({ id, nome, email, master}, SEGREDO, {expiresIn: "1d"})
    }

    async validar(req,res,next){

    }

}