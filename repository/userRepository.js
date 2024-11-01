import BaseRepository from "./baseRepository";


export default class UserRepository extends BaseRepository{

    constructor(db){
        super(db);
    }

    async ListarUsuarios(){
        let sql = "SELECT * FROM TB_Usuarios";

        let result = await this.db.ExecutaComando(sql);

        return this.toMap(result);
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
                usuario.regra = row["usu_regra"];
    
                lista.push(usuario);
            }

            return lista;
        }
        else{
            let usuario = new UserEntitie();
            usuario.id = rows["usu_id"];
            usuario.nome = rows["usu_nome"];
            usuario.email = rows["usu_email"];
            usuario.regra = rows["usu_regra"];

            return usuario;
        }
    }

}