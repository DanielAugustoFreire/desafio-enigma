import Database from '../database/database.js';
import UserEntitie from '../entities/userEntitie.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import UserRepository from '../repository/userRepository.js';

export default class UserController{

    async listarUsuarios(req, res){
        try{
            let userRepository = new UserRepository();
            let users = await userRepository.ListarUsuarios();       
            if(users){
                res.status(200).json(users);
            }else{
                throw new Error("Nenhum usuário encontrado");
            }
        }catch(ex){
            console.log(ex);
            res.status(500).json(ex);
        }
    }

    async criarUsuario(req, res){
        try{
            let { nome, email, senha } = req.body;
            if(!nome || !email || !senha){
                res.status(400).json("Nome, email e senha são obrigatórios");
            }else{
                let userRepository = new UserRepository();
                let user = new UserEntitie("", nome, email, senha, "", false);
                user = user.setarSalt();
                user = await user.setarHash();
                let result = await userRepository.cadastrarUsuario(user);
                if(result){
                    res.status(201).json("Usuario Cadastrado com Sucesso!");
                }else{
                    throw new Error("Erro ao cadastrar usuário");
                }
            }
        }catch(ex){
            console.log(ex);
            res.status(500).json(ex);
        }
    }

    async atualizarNomeUsuario(req, res){  //put -> obj completo atualiza
        try{
            let { id } = req.params;
            let { nome } = req.body;
            if(nome){
                let userRepository = new UserRepository();
                let usuarioBanco = await userRepository.obterUsuarioPorId(id);
                if(usuarioBanco[0].is_master){
                    res.status(400).json("Usuário Mestre não pode ser alterado");
                }
                let user = new UserEntitie(id, nome, "", "", "", false);
                let result = await userRepository.atualizarNomeUsuario(user);
                if(result){
                    res.status(200).json("Nome do usuário atualizado com sucesso");
                }else{
                    throw new Error("Erro ao atualizar nome do usuário");
                }
            }else{
                res.status(400).json("Nome é obrigatório");
            }
        }catch(ex){
            console.log(ex);
            res.status(500).json(ex.message);
        }
    }
    

    async deletarUsuario(req, res){
        try{
            let { id } = req.params;
            let userRepository = new UserRepository();
            let usuarioBanco = await userRepository.obterUsuarioPorId(id);
            if(usuarioBanco.length > 0){
                if(usuarioBanco[0].is_master){
                res.status(400).json("Usuário master não pode ser deletado");
                }else{
                    let result = await userRepository.deletarUsuarioPeloId(id);
                    if(result){
                        res.status(200).json("Usuario deletado com sucesso");
                    }else{
                        throw new Error("Erro ao atualizar nome do usuário");
                    }
                }
            }else{
                res.status(400).json("Usuário não encontrado");
            }
        }catch(ex){
            console.log(ex);
            res.status(500).json(ex.message);
        }
    }



}