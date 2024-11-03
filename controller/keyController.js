import KeyEntitie from "../entities/keyEntitie.js";
import keyRepository from "../repository/keyRepository.js";


export default class KeyController{

    async obterChaveAtual(req,res){

    }

    async descriptografar(req,res){
        try{
            let { mensagem, chave } = req.body;
            let keyRepo = new keyRepository();
            let keyEnt= new KeyEntitie();
            if(mensagem){
                if(!chave)
                    chave = keyRepo.obterChaveAtual();
                let deslocamento = keyEnt.pegarDescolamento(mensagem, chave);
                let mensagemDescriptografada = keyEnt.descriptografar(mensagem, deslocamento);
                res.status(200).send(mensagemDescriptografada);
            }
        }
        catch(ex){
            res.status(500).send(ex.message);
        }
    }

}