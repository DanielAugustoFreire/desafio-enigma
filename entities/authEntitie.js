

export default class AuthEntitie{

    salvar_global(ip){


        if (!global.sessao) {
            global.sessao = {};
        }
        /*Seta as listas no obj -> sessaoDF */
        if (!global.sessao[ip]) {
            global.sessao[ip] = { NumeroTentativas: 0, validade: new Date() };
        }
        
        global.sessao[ip].NumeroTentativas = global.sessao[ip].NumeroTentativas + 1;
        console.log(global.sessao[ip].NumeroTentativas);
    }

    checarTentativas(ip){
        if (!global.sessao) {
            global.sessao = {};
        }
        /*Seta as listas no obj -> sessaoDF */
        if (!global.sessao[ip]) {
            global.sessao[ip] = { NumeroTentativas: 0, validade: null };
        }

        if(global.sessao[ip].validade == null && global.sessao[ip].NumeroTentativas >= 3){
            global.sessao[ip].NumeroTentativas = 0;
        }

        return global.sessao[ip]
    }

    banir_ip_minutos(ip){

        global.sessao[ip].validade = new Date(new Date().getTime() + 10 * 1000);
        console.log(global.sessao[ip].validade);
    }

    zerarTentativas(ip){
        global.sessao[ip].NumeroTentativas = 0;
        global.sessao[ip].validade = new Date();
    }

}