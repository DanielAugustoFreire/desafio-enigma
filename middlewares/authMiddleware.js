import userRepository from '../repository/userRepository.js';
import jwt from 'jsonwebtoken';

const SEGREDO = 'naoEhAdequadoColocarAqui_SoParaExemplo';

export default class AuthMiddleware{

    gerarToken(id, nome, email, master) {
        return jwt.sign({ id, nome, email, master}, SEGREDO, {expiresIn: "1d"})
    }

    async ValidarToken(token){
        let objUsuario = jwt.verify(token, SEGREDO);
        let repo = new userRepository();
        let id = objUsuario.id;
        let usuario = await repo.obterUsuarioPorId(id);
        if(usuario.length > 0){
            return objUsuario;
        }
    }

    async autenticarUsuario(req,res,next){
        let { token } = req.cookies
        if(token){
            try{
                let objUsuario = jwt.verify(token, SEGREDO);
                let repo = new userRepository();
                let usuario = await repo.obterUsuarioPorId(objUsuario.id);
                if(usuario.length > 0){
                    usuario = usuario[0];
                    let auth = new AuthMiddleware();
                    let newToken = auth.gerarToken(objUsuario.id, objUsuario.nome, objUsuario.email, objUsuario.is_master);
                    res.cookie("token", newToken, {
                        httpOnly: true,
                        sameSite: "Strict",
                        path: "/",
                    });
                    req.usuarioLogado = usuario
                    next();
                }else{
                    res.status(401).json({msg: "Nao Autorizado"});
                }
            }catch(ex){
                res.status(401).json({msg: "Nao Autorizado"});
            }
        }else{
            res.status(401).json({msg: "Nao Autorizado"});
        }
    }

    async autenticarUsuarioMestre(req,res,next){
        let { token } = req.cookies
        if(token){
            try{
                let objUsuario = jwt.verify(token, SEGREDO);
                let repo = new userRepository();
                let usuario = await repo.obterUsuarioPorId(objUsuario.id);
                if(usuario.length > 0 && usuario[0].is_master){
                    usuario = usuario[0];
                    let auth = new AuthMiddleware();
                    let newToken = auth.gerarToken(objUsuario.id, objUsuario.nome, objUsuario.email, objUsuario.is_master);
                    res.cookie("token", newToken, {
                        httpOnly: true,
                        sameSite: "Strict",
                        path: "/",
                    });
                    req.usuarioLogado = usuario
                    next();
                }else{
                    res.status(401).json({msg: "Nao Autorizado"});
                }
            }catch(ex){
                res.status(401).json({msg: "Nao Autorizado"});
            }
        }else{
            res.status(401).json({msg: "Nao Autorizado"});
        }
    }


}