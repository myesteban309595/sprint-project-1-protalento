const express = require('express');
const router = express.Router();
const basicAuth = require('express-basic-auth');

const validaringresomiddleware = require('../middlewares/validaringreso.middleware'); 
const funcionnoautorizado = require("../functions/noautorizado.functions");
const chalk = require('chalk');

//const { router } = require('express');


/**
 * @swagger
 * /iniciarsesion:
 *  get:
 *     summary: simulacion de inicio
 *     tags: [usuarios]
 *     responses:
 *       200:
 *              description: inicio de sesion exitoso
 *       401: 
 *              description: no autorizado
 *   
 */

router.get('/', (req,res) => {

    res.json('ingresado exitosamente'); // mensaje de ingreso exitoso
    console.log(chalk.yellowBright("HAS INGRESADO EXITOSAMENTE"));


});

module.exports = router;


