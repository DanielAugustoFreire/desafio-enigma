import bcrypt from "bcrypt";
import BaseEntitie from "./baseEntitie.js";

export default class UserEntitie extends BaseEntitie{
    #id;
    #nome;
    #email;
    #senha;
    #salt;
    #is_master;

    get id(){ return this.#id; }
    set id(value){ this.#id = value; }

    get nome(){ return this.#nome; }
    set nome(value){ this.#nome = value; }

    get email(){ return this.#email; }
    set email(value){ this.#email = value; }

    get salt(){ return this.#salt; }
    set salt(value){ this.#salt = value; }

    get is_master(){ return this.#is_master; }
    set is_master(value){ this.#is_master = value; }

    get senha(){ return this.#senha; }
    set senha(value){ this.#senha = value; }

    constructor(id, nome, email, senha, salt, is_master){
        super();
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#salt = salt;
        this.#is_master = is_master;
    }

    setarSalt(){
        this.#salt = bcrypt.genSaltSync(10);
    
        return this;
    }

    async setarHash(){
        this.#senha = await bcrypt.hash(this.#senha, this.#salt);
  
        return this;
    
    }

}