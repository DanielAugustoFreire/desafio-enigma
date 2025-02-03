import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "ENIGMA",
        description: "Operacao Enigma",
    },
    host: "localhost:5000",
    schemes: ['http'],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
}

const outputJson = "./swagger_output.json";
const routes = ["./server.js"];

swaggerAutogen({openapi: "3.0.0"})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js')
})