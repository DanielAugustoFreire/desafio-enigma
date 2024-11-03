import KeyEntitie from "../entities/keyEntitie.js";
import keyRepository from "../repository/keyRepository.js";
import Database from "../database/database.js";

export default class KeyController{

    async obterChaveAtual(req,res){
        try{
            let keyRepo = new keyRepository();
            let chave = await keyRepo.obterChaveAtual();
            if(chave){
                res.status(200).json(chave[0].chave);
            }else{
                throw new Error("Nenhuma chave encontrada");
            }
        }catch(ex){
            console.log(ex);
            res.status(500).send(ex.message);
        }
    }

    async descriptografar(req,res){
        let banco = new Database();
        let usuario = req.usuarioLogado;
        await banco.AbreTransacao()
        try{
            let { mensagem, chave } = req.body;
            let keyRepo = new keyRepository(banco);
            let keyEnt= new KeyEntitie();
            let chaveAnterior = await keyRepo.obterChaveAtual();   
            if(mensagem){
                if(!chave){
                    chave = chaveAnterior;
                }else{
                    let keyEntitie = new KeyEntitie("", chave, "", "", 1, usuario.id);
                    keyEntitie.data_criacao =  keyEntitie.gerarData()
                    let foiAdd
                    let dataDesatualizacao
                    let foiDesatualizado
                    if(chaveAnterior.length == 0){      
                        foiDesatualizado = true; 
                        foiAdd = await keyRepo.adicionarChave(keyEntitie)
                    }else if(chaveAnterior[0].chave == chave){
                        foiDesatualizado = true;
                        foiAdd = true;
                    }else{
                        foiAdd = await keyRepo.adicionarChave(keyEntitie)
                        dataDesatualizacao = keyEntitie.gerarData()
                        foiDesatualizado = await keyRepo.desatualizarChaveAnterior(chaveAnterior[0].id, dataDesatualizacao);
                    }
                    if(!foiAdd){
                        throw new Error("Erro ao adicionar a chave")
                    }
                    if(!foiDesatualizado){
                        throw new Error("Erro ao desatualizar a chave anterior")
                    }
                }
                let deslocamento = keyEnt.pegarDescolamento(mensagem, chave);
                let mensagemDescriptografada = keyEnt.descriptografar(mensagem, deslocamento);
                await banco.Commit()
                res.status(200).send(mensagemDescriptografada);
            }else{
                res.status(400).send("Mensagem não informada");
            }
        }
        catch(ex){
            await banco.Rollback()
            res.status(500).send(ex.message);
        }
    }

    async listarKeysPaginadas(req,res){
        try{
            const page = req.query.page || 1;
            const limit = 3;

            let keyRepo = new keyRepository();
            let keys = await keyRepo.listarChaves();
            if(keys){
                let tamanhoKeys = keys.length;
                let totalPages = Math.ceil(tamanhoKeys / limit); // ceil serve pra arredondar para cima
                if(page > totalPages){
                    throw new Error("Página não encontrada LIMITE EH 10");
                }
                let offset = limit * (page - 1)
                keys = keys.slice(offset, offset + limit);
                keys = keys.map(key => {
                    return {
                        id: key.id,
                        chave: key.chave,
                        data_criacao: key.data_criacao,
                        data_expiracao: key.data_expiracao,
                        ativo: key.ativo,
                        id_usuario: key.id_usuario
                    }
                });
                res.status(200).json({ totalPages, page, keys});   
            }
            else{
                throw new Error("Nenhuma chave encontrada");
            }
        }catch(ex){
            console.log(ex);
            res.status(500).send(ex.message);
        }
    }

}