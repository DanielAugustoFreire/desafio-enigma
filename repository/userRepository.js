import BaseRepository from "./baseRepository.js";
import UserEntitie from "../entities/userEntitie.js";

export default class  extends BaseRepository{

    constructor(db){
        super(db);
    }

    async ListarUsuarios(){
        let sql = "SELECT usu_id, usu_nome, usu_email FROM TB_Usuarios";

        let result = await this.db.ExecutaComando(sql);

        return this.toMap(result);
    }

    async BuscarUsuarioPorEmail(email){
        let sql = "select * from TB_Usuarios where usu_email = ?"

        let value = [email];

        let result = await this.db.ExecutaComando(sql, value);

        return this.toMap(result);
    }

    async cadastrarUsuario(usuario){
        let sql = "insert into TB_Usuarios (usu_nome, usu_email, usu_senha, is_master) values (?, ?, ?, ?)";

        let values = [usuario.nome, usuario.email, usuario.senha, usuario.is_master];

        let result = await this.db.ExecutaComando(sql, values);

        return result;
    }

    async obterUsuarioPorId(id){
        let sql = "select * from TB_Usuarios where usu_id = ?";

        let values = [id];

        let result = await this.db.ExecutaComando(sql, values);

        return this.toMap(result);
    }

    async atualizarNomeUsuario(usuario){
        let sql = "update TB_Usuarios set usu_nome = ? where usu_id = ?";

        let values = [usuario.nome, usuario.id];

        let result = await this.db.ExecutaComando(sql, values);

        return result;
    }


    async deletarUsuarioPeloId(id){
        let sql = "delete from TB_Usuarios where usu_id = ?";

        let values = [id];

        let result = await this.db.ExecutaComando(sql, values);

        return result;
    }

    toMap(rows) {
        
        
        if(typeof rows.length == "number") {
            let lista = [];
            for(let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let usuario = new UserEntitie();
                usuario.id = row["usu_id"];
                usuario.nome = row["usu_nome"];
                usuario.email = row["usu_email"];
                usuario.senha = row["usu_senha"];
                usuario.is_master = row["is_master"];
    
                lista.push(usuario);
            }

            return lista;
        }
        else{
            let usuario = new UserEntitie();
            usuario.id = rows["usu_id"];
            usuario.nome = rows["usu_nome"];
            usuario.email = rows["usu_email"];
            usuario.senha = rows["usu_senha"];
            usuario.is_master = rows["is_master"];

            return usuario;
        }
    }

}