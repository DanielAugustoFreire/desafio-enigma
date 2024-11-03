import KeyEntitie from "../entities/keyEntitie.js";
import BaseRepository from "./baseRepository.js";


export default class keyRepository extends BaseRepository{

    constructor(db){
        super(db);
    }

    async obterChaveAtual(){
        let sql = "select * from TB_Keys where ativo = 1";

        let result = await this.db.query(sql);

        return this.toMap(result);
    }



    toMap(rows) {
        
        
        if(typeof rows.length == "number") {
            let lista = [];
            for(let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let key = new KeyEntitie();
                key.id = row["usu_id"];
                key.chave = row["usu_nome"];
                key.data_criacao = row["usu_email"];
                key.data_expiracao = row["usu_senha"];
                key.ativo = row["is_master"];
                key.id_usuario = row["is_master"];
    
                lista.push(key);
            }

            return lista;
        }
        else{
            let key = new KeyEntitie();
            key.id = rows["id"];
            key.chave = rows["chave"];
            key.data_criacao = rows["data_criacao"];
            key.data_expiracao = rows["data_expiracao"];
            key.ativo = rows["ativo"];
            key.id_usuario = rows["id_usuario"];

            

            return usuario;
        }
    }

}