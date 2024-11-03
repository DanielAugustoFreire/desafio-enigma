import userRepository from "../repository/userRepository.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import AuthEntitie from "../entities/authEntitie.js";
import bcrypt from "bcrypt";

export default class AuthController{


    async autenticarUsuario(req, res){
        let authEntitie = new AuthEntitie()
        const clientIp = req.ip;    
        let Tentativas = authEntitie.checarTentativas(clientIp);
        if(Tentativas.NumeroTentativas >= 3){
            authEntitie.banir_ip_minutos(clientIp);
            res.status(400).json({mensagem: "Muitas tentativas, tente novamente mais tarde!"});
            return;
        }
        try{
            let { email, senha } = req.body;
            let usuario = new userRepository();
            let usuarioRetornadoPeloEmail = await usuario.BuscarUsuarioPorEmail(email);
            if(usuarioRetornadoPeloEmail.length > 0){
                usuarioRetornadoPeloEmail = usuarioRetornadoPeloEmail[0];
                let resultado_comparacao = bcrypt.compareSync(senha, usuarioRetornadoPeloEmail.senha);
                if(resultado_comparacao){
                    let authMiddleware = new AuthMiddleware();
                    let token = authMiddleware.gerarToken(usuarioRetornadoPeloEmail.id, usuarioRetornadoPeloEmail.nome, usuarioRetornadoPeloEmail.email, usuarioRetornadoPeloEmail.is_master);
                    res.cookie("token", token, {
                        httpOnly: true,
                        //secure: true,
                        path: "/",
                        sameSite: "Strict"
                    });
                    authEntitie.zerarTentativas(clientIp)
                    req.usuarioLogado = usuarioRetornadoPeloEmail;
                    res.status(200).json({mensagem: "Login efetuado com sucesso! JWT: " + token});
                }else{
                    authEntitie.salvar_global(clientIp)
                    res.status(400).json({mensagem: "Senha Incorreta!"});
                }
            }
            else{
                authEntitie.salvar_global(clientIp)
                res.status(400).json({mensagem: "Email não cadastrado!"});
            }
        }catch(ex){
            res.status(500).json({mensagem: "Erro ao fazer login!"});
        }
    }
}