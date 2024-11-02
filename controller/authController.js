

export default class AuthController{


    async fazerLogin(req, res){
        try{
            let { email, senha } = req.body;
            let objUsuarioBanco = await banco.BuscarUsuarioPorEmail(email);
            if(objUsuarioBanco){
                let senha_testar = senha + objUsuarioBanco.salt;
                if(senha_testar = objUsuarioBanco.senha){
                    let authMiddleware = new AuthMiddleware();
                    let token = authMiddleware.gerarToken(objUsuarioBanco.id, objUsuarioBanco.nome, objUsuarioBanco.email, objUsuarioBanco.regra);
                }else{
                    res.status(400).json({mensagem: "Senha Incorreta!"});
                }
            }
            else{
                res.status(400).json({mensagem: "Email não cadastrado!"});
            }
        }catch(ex){
            console.log(ex);
            res.status(500).json({mensagem: "Erro ao fazer login!"});
        }
    }
}