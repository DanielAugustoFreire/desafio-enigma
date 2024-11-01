import BaseEntitie from "./baseEntitie.js";

export default class UserEntitie extends BaseEntitie{
    #id;
    #nome;
    #email;
    #regra;

    get id(){ return this.#id; }
    set id(value){ this.#id = value; }

    get nome(){ return this.#nome; }
    set nome(value){ this.#nome = value; }

    get email(){ return this.#email; }
    set email(value){ this.#email = value; }

    get regra(){ return this.#regra; }
    set regra(value){ this.#regra = value; }

    constructor(id, nome, email, regra){
        super();
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#regra = regra;
    }
}