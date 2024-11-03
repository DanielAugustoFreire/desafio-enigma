

export default class KeyEntitie{

    #id;
    #chave;
    #data_criacao;
    #data_expiracao;
    #ativo;
    #id_usuario;

    get id(){ return this.#id; }
    set id(value){ this.#id = value; }

    get chave(){ return this.#chave; }
    set chave(value){ this.#chave = value; }

    get data_criacao(){ return this.#data_criacao; }
    set data_criacao(value){ this.#data_criacao = value; }

    get data_expiracao(){ return this.#data_expiracao; }
    set data_expiracao(value){ this.#data_expiracao = value; }

    get ativo(){ return this.#ativo; }
    set ativo(value){ this.#ativo = value; }

    get id_usuario(){ return this.#id_usuario; }
    set id_usuario(value){ this.#id_usuario = value; }

    constructor(id, chave, data_criacao, data_expiracao, ativo, id_usuario){
        this.#id = id;
        this.#chave = chave;
        this.#data_criacao = data_criacao;
        this.#data_expiracao = data_expiracao;
        this.#ativo = ativo;
        this.#id_usuario = id_usuario;
    }

    pegarDistancia(mensagem, chave){
        let primeiraLetraChave = "A"
        let primeiraLetraMensagem = "a"

        let posicaoPrimeiraLetraChave = primeiraLetraChave.charCodeAt(0);
        let posicaoPrimeiraLetraMensagem = primeiraLetraMensagem.charCodeAt(0);

        console.log(posicaoPrimeiraLetraChave);
        console.log(posicaoPrimeiraLetraMensagem);
        
        distancia = posicaoPrimeiraLetraMensagem - posicaoPrimeiraLetraChave;
    }

    descriptografar(mensagem, deslocamento){
        let textoCompletoDescriptografado = "";

        for(let i = 0; i < mensagem.length; i++){

        }  
    }

}