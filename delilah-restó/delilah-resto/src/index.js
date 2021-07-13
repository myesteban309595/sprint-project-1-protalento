
// npm init -y
// npm i express -y
// npm install dotenv
// nodemon install -g
// nodemon src/index.js
// npm install env
// npm install express bauth
// npm install chalk
// npm -i swagger-ui-express swagger-jsdoc --save

require('dotenv').config(); // lo requerimos

const openAPI = require('./utils/swaggeroptions');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpecs = swaggerJsDoc(openAPI);
const swaggerUI = require('swagger-ui-express');

const express = require('express'); // requerimos express
const app = express();
const PORT = process.env.PORT || 3000; //usar el puerto PORT si no encuentra usar el 3000
const basicAuth = require('express-basic-auth'); // requerimos la libreria del express basic.auth
const chalk = require('chalk'); 

app.use(express.json()); // para que pueda funcionar

//const funcionnoautorizado = require("./functions/noautorizado.functions");
const validaciondellogin = require('./middlewares/validaringreso.middleware');
const registroRoute = require('./routers/usuariosregistro.routers');
const ingresoRoute = require('./routers/ingreso.routes');

const productosRoute = require('./routers/productos.routes');
const pedidosRoute = require('./routers/pedidos.routes2');  //** */
const mediodepagoRoute = require('./routers/metodosdepago.routers');  //*** */

app.use('/swaggerAPI', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use('/iniciarsesion',ingresoRoute);  // iniciamos sesion
app.use('/usuarios',registroRoute);      // nos registramos

//********************************************************************************************************************************
app.use(basicAuth({
    
    authorizer : validaciondellogin //, noautorizado: funcionnoautorizado
    
}));   //middleware
//********************************************************************************************************************************

app.use('/productos',productosRoute);
app.use('/pedidos', pedidosRoute);
app.use('/metodosDePago', mediodepagoRoute);

//**********************************************************
//                  LISTEN DE LA APP

app.listen(3000, () => {  
    
    console.log('INICIADO EN EL PUERTO: ' + PORT); //LISTEN
    
});


