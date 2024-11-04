import express from 'express';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import keyRoute from './routes/keyRoute.js';

import UserRepository from './repository/userRepository.js';

const app = express();

import { createRequire } from "module";
import UserEntitie from './entities/userEntitie.js';
const require = createRequire(import.meta.url);
const outputJson = require("./swagger_output.json");

/*
    Esse import do outputJson burla o es6 do node, e faz um require. 

    Existe outra forma de fazer isso sem burlar o es6, a seguinte:

    import outputJson from './swagger_output.json' with { type: "json" };

    porem ele gera uma mensagem que essa propriedade eh experimental, e que pode ser removida em futuras versoes.

    https://nodejs.org/docs/v22.11.0/api/esm.html#json-modules

*/  

app.use(cookieParser());
app.use(express.json());



app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/", keyRoute);





async function InicializarDefaultUser(){
    try{        
        let userRepository = new UserRepository();
        let userDefault = new UserEntitie("", "Mestre", "mestre@enigma.com", "Xsejmfççtrcty548!40", "", true);
        userDefault = userDefault.setarSalt()
        userDefault = await userDefault.setarHash()
        await userRepository.cadastrarUsuario(userDefault);
    }catch(ex){
        if(ex.code == "ER_DUP_ENTRY"){
            console.log("Usuario Mestre ja cadastrado")
        }else{
            console.log(ex.message)
        }
    }
}

InicializarDefaultUser()

app.listen(5000, async () => {
    console.log("Servidor rodando na porta 5000")
});

