

export default class AuthEntitie{

    iniciar_sessao_caso_nao_exista(ip){
        if (!global.sessao) {
            global.sessao = {};
        }
        /*Seta as listas no obj -> sessaoDF */
        if (!global.sessao[ip]) {
            global.sessao[ip] = { NumeroTentativas: 0, validade: new Date(), banido: false };
        }
    }

    salvar_global(ip){
        this.iniciar_sessao_caso_nao_exista(ip);
        
        global.sessao[ip].NumeroTentativas = global.sessao[ip].NumeroTentativas + 1;
        global.sessao
    }

    checarTentativas(ip){
        this.iniciar_sessao_caso_nao_exista(ip);

        if(global.sessao[ip].banido){
            if(global.sessao[ip].validade < new Date()){
                global.sessao[ip].banido = false;
                global.sessao[ip].NumeroTentativas += 1;
            }else{
                return global.sessao[ip];
            }
        }

        return global.sessao[ip]
    }

    banir_ip_minutos(ip, tentativas){

        global.sessao[ip].validade = new Date(new Date().getTime() + tentativas * 60 * 1000);
        global.sessao[ip].banido = true;

        console.log(global.sessao[ip].validade);
    }

    zerarTentativas(ip){
        global.sessao[ip].NumeroTentativas = 0;
        global.sessao[ip].validade = new Date();
    }

}