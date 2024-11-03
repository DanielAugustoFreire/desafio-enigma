

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

    pegarDescolamento(mensagem, chave){
        for(let i = 0; i < mensagem.length; i++){
            let primeiraLetraChave = mensagem[i];
            let primeiraLetraMensagem = chave[i];
    
            let posicaoPrimeiraLetraChave = primeiraLetraChave.charCodeAt(0);
            let posicaoPrimeiraLetraMensagem = primeiraLetraMensagem.charCodeAt(0);
            
            let distancia = posicaoPrimeiraLetraChave - posicaoPrimeiraLetraMensagem;
    
            if(distancia != 0){ // caso seja um caracter que a cifra nao 'cobre' ele passa para a proxima letra da chave
                if(distancia < 0){
                    distancia = 26 + distancia;
                }
                return
            }
        }

        return distancia;
    }

    descriptografar(mensagem, deslocamento) {
        let textoCompletoDescriptografado = [];
    
        for (let i = 0; i < mensagem.length; i++) {
            let letra = mensagem[i];
            let posicaoLetra = letra.charCodeAt(0);
            let ehMaiuscula = this.ehMaiuscula(posicaoLetra);
    
            if (ehMaiuscula === "M") {
                let novaPosicao = posicaoLetra - deslocamento;
                if (novaPosicao < 65) {
                    novaPosicao += 26;
                }
                textoCompletoDescriptografado.push(String.fromCharCode(novaPosicao));
            } else if (ehMaiuscula === "m") {
                let novaPosicao = posicaoLetra - deslocamento;
                if (novaPosicao < 97) {
                    novaPosicao += 26;
                }
                textoCompletoDescriptografado.push(String.fromCharCode(novaPosicao));
            } else {
                textoCompletoDescriptografado.push(letra);
            }
        }
        
        return textoCompletoDescriptografado.join("");
    }
    
    

    ehMaiuscula(letra){
        if(letra >=65 && letra <= 90){
            return "M"
        }else if(letra >=97 && letra <= 122){
            return "m"
        }else{
            return false
        }
    }

}