const express = require('express');
const router = express.Router();
const basicAuth = require('express-basic-auth');
const chalk = require('chalk');

const validaradminmidleware = require('../middlewares/validacionadminmiddleware');
const funcionnoautorizado = require('../functions/noautorizado.functions');
//const validarlosmetodosdepagomiddleware = require('../middlewares/metodosdepago.middlewares');

const {obtenermetodosdepago, editarmetododepago, agregarmetododepago} =require('../models/pagos.model');
const {eliminarmetododepagoporid, obtenermetododepagoporid} = require('../models/pagos.model');

//*****************************   OBTENER METODO DE PAGO  *******************************************

/**
 * @swagger
 * /metodosDePago:
 *  get:
 *      summary: Obtener los métodos de pago del sistema
 *      tags: [Métodos de pago]
 *      responses:
 *          200:
 *              description: metodos de pago
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/metododepago'
 *          401: 
 *              description: no autorizado
 *
 */

router.get('/', (req, res) => 
{

    res.json(obtenermetodosdepago());
    console.log(chalk.blue("! SE OBTUVIERON TODOS LOS MEDIOS DE PAGO ¡"));


});

//*****************************   AGREGAR METODO DE PAGO  *******************************************

/**

/**
 * @swagger
 * /metodosDePago:
 *  post:
 *      summary: Crea un producto nuevo en el sistema
 *      tags: [Métodos de pago]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/metododepago'
 *      responses:
 *          201:
 *              description: el Producto se ha creado
 *          400: 
 *              description: Entradas inválidas
 *          401:
 *              description: invalidado, no es administrador
 */

router.post('/',basicAuth({ 
    
    authorizer: validaradminmidleware }), (req, res) => 
    
    //authorizer: validaradminmidleware, noautorizado: funcionnoautorizado }), validarlosmetodosdepagomiddleware, (req, res) => 
    
    {
     
    const {id,nombrepago} = req.body;

    const nuevometododepago = 
    {
        id : id,
        nombrepago : nombrepago
    }

    agregarmetododepago(nuevometododepago);
    res.status(201).json('nuevo metodo de pago agregado ¡');

    console.log(chalk.yellowBright("SE HA AGREGADO UN NUEVO METODO DE PAGO :"));
    console.log(nuevometododepago);

});

//*****************************   MODIFICAR METODO DE PAGO  *******************************************

/**
 * @swagger
 * /metodosDePago/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del metodo de pago que desea editarse
 *        required: true
 *        schema:
 *         type: integer
 *      
 * 
 *      summary: edita un metodo de pago ya creado
 *      tags: [Métodos de pago]             
 *      requestBody:
 *          description: El metodo de pago con sus cambios
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     type: object
 *                     properties:
 *                         nombrepago:
 *                             type: string
 *                     example:
 *                         nombrepago: ahorro a la mano
 *      responses:
 *          200:
 *              description: metodo de pagoclear actualizado 
 *          400: 
 *              description: Entradas inválidas
 */

router.put('/:id',basicAuth({ 
    
    authorizer: validaradminmidleware }), (req, res) => {
    
        const {nombrepago} = req.body;
        const {id} = req.params;
        const filter = obtenermetodosdepago().find(u => u.id == req.params.id);

        let validarrespuesta = false;
        
        if(obtenermetodosdepago().some(u => u.id == req.params.id))
        {
            filter.nombrepago = nombrepago; 
            validarrespuesta = true;
            
            console.log(chalk.blue("SE HA MODIFICADO EL METODO DE PAGO POR: "));
            console.log(chalk.yellowBright(nombrepago));
            
            //res.status(201).json(filter); // me imprime en la consola del swagger
        }
            
            //editarmetododepago(nombrepago);

    validarrespuesta ? res.json('Método de pago editado') : res.status(400).json(' 400 NOT FOUND El metodo de pago que intenta modificar no existe');

});

//*****************************   ELIMINAR METODO DE PAGO  *******************************************

/**
 * @swagger
 * /metodosDePago/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del metodo que desea eliminar
 *        required: true
 *        schema:
 *           type: string
 * 
 *      summary: eliminar un metodo de pago (admin)
 *      tags: [Métodos de pago]  
 *         
 *      responses:
 *          200:
 *              description: Producto eliminado 
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/metododepago'
 *          400: 
 *              description: Entradas inválidas
 *          401: 
 *              description: administrador no autorizado
 */

router.delete('/:id',basicAuth({ 
    
    authorizer: validaradminmidleware}), (req, res) => {
   
    const { id } = req.params;

    const buscarmetododepago = obtenermetododepagoporid(Number(id));

    let validarrespuesta = false;

    if(buscarmetododepago)
    {
        eliminarmetododepagoporid(Number(id));

        validarrespuesta = true;

        //res.json(obtenermetododepago());

        console.log(chalk.red("SE HA ELIMINADO UN METODO DE PAGO :"));
        console.log(buscarmetododepago);

    }

    validarrespuesta ? res.json('Método de pago eliminado') : res.status(400).json('El método de pago no existe');

});

/**
 * @swagger
 * tags:
 *  name: 'Métodos de pago'
 *  description: Métodos y formas de pago
 * 
 * components:
 *   schemas:
 *      metododepago: 
 *          type: object
 *          required: 
 *              -id
 *              -nombrepago
 *          properties:
 *              id: 
 *                  type: integer
 *              nombrepago:  
 *                  type: string 
 *          example:
 *              id: 4
 *              nombrepago: paypal
 * 
 *                            
 */


module.exports = router;
