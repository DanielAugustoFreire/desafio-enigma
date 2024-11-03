import KeyEntitie from "../entities/keyEntitie.js";
import BaseRepository from "./baseRepository.js";


export default class keyRepository extends BaseRepository{

    constructor(db){
        super(db);
    }

    async obterChaveAtual(){
        let sql = "select * from TB_Keys where ativo = 1";

        let result = await this.db.ExecutaComando(sql);

        return this.toMap(result);
    }

    async adicionarChave(chave){
        let sql = "INSERT INTO TB_Keys (chave, data_criacao, ativo, id_usuario) VALUES (?, ?, ?, ?)";
    
        let values = [chave.chave, chave.data_criacao, chave.ativo, chave.id_usuario];

        let result = await this.db.ExecutaComando(sql, values);

        return result.affectedRows > 0;
    }

    async desatualizarChaveAnterior(id, data){
        let sql = "UPDATE TB_Keys SET ativo = 0, data_expiracao = ? WHERE id = ?";

        let values = [data, id];

        let result = await this.db.ExecutaComando(sql, values);

        return result.affectedRows > 0;
    }

    async listarChaves(){
        let sql = "SELECT * FROM TB_Keys ORDER BY data_criacao dESC";

        let result = await this.db.ExecutaComando(sql);

        return this.toMap(result);
    }


    toMap(rows) {
        
        
        if(typeof rows.length == "number") {
            let lista = [];
            for(let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let key = new KeyEntitie();
                key.id = row["id"];
                key.chave = row["chave"];
                key.data_criacao = row["data_criacao"];
                key.data_expiracao = row["data_expiracao"];
                key.ativo = row["ativo"];
                key.id_usuario = row["id_usuario"];
    
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