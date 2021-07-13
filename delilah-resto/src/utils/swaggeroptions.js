const openAPI = {
    
    definition : {
        openapi : "3.0.0",
        info : {
            tittle : "Restaurante Delilah restó API",
            version : "1.0.1",
            description : "mi primera API delilah restó PROTALENTO COHORTE 3",
            contact : {
                name : "marlon yoel esteban valencia",
                email : "maryoe_95@hotmail.com"
            }
        },
        servers : [
            {
                url : "http://localhost:3000",
                description : "Servidor local de prueba"
            }
        ],
        components: {
            securitySchemes: {
                basicAuth: {
                    type: "http",
                    scheme: "basic"
                }
            }
        },
        security: [
            {
                basicAuth: []
            }
        ]
        
    },
    apis: ["./src/routers/*.js"]

}

module.exports = openAPI;
