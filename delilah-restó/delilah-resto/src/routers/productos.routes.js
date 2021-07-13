const express = require('express');
const basicAuth = require('express-basic-auth');
const router = express.Router();

const { obtenerproducto, agregarproducto, obtenerproductoporid, editarproducto, eliminarproductoporid } = require('../models/productos.models'); // hago una destructuracion para requerir las funciones

const validaradminmiddleware = require('../middlewares/validacionadminmiddleware');
const funcionnoautorizado = require('../functions/noautorizado.functions');
//const validarpedidosmiddleware = require('../middlewares/validarpedidos.middleware');
const chalk = require('chalk');

//const funcionnoautorizado = require("../functions/noautorizado.functions");

//const productovalidado = require('../middlewares/validarproducto.middleware');   // producto que validamos en el middleware verificando que el nombre sea string, el precio number y precio >0


//**************************   OBTENER PRODUCTOS   ********************************************

/**
 * @swagger
 * /productos:
 *  get:
 *      summary: obtiene todos los productos 
 *      tags: ['Productos']
 *      responses:
 *          200:
 *              description: se ha obtenido los Productos exitosamente
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/product'
 *          401: 
 *              description: no autorizado
 */


router.get('/', (req, res) => { //obtenemos los productos

    res.json(obtenerproducto());

    console.log(chalk.blue("! SE OBTUVIERON TODOS LOS PRODUCTOS ¡"));


});

//***************************   AGREGAR PRODUCTOS   ********************************************

/**
 * @swagger
 * /productos:
 *  post:
 *      summary: Crea un producto nuevo en el sistema
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/product'
 *      responses:
 *          201:
 *              description: el Producto se ha creado
 *          400: 
 *              description: Entradas inválidas
 *          401:
 *              description: invalidado, no es administrador
 */

router.post('/', basicAuth({ 
    
    authorizer: validaradminmiddleware //, noautorizado: funcionnoautorizado 

}), (req, res) => {

    const { id, nombre, precio } = req.body;
    //const { product } = req.body;
    
    const nuevoproducto = {

        id : id,
        nombre :nombre,
        precio: precio
        
    }

    console.log(chalk.greenBright("SE HA AGREGADO UN PRODUCTO :"));

    console.log(nuevoproducto);

    agregarproducto(nuevoproducto);

    res.json('Producto agregado');

});

//*****************************    EDITAR PRODUCTO     *********************************************

/**
 * @swagger
 * /productos/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto que desea editarse
 *        required: true
 *        schema:
 *         type: integer
 *      
 * 
 *      summary: edita un producto ya creado
 *      tags: [Productos]              
 *      requestBody:
 *          description: El producto con sus cambios
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     type: object
 *                     properties:
 *                         nombre:
 *                             type: string
 *                         precio:
 *                             type: number
 *      responses:
 *          200:
 *              description: Producto actualizado 
 *          400: 
 *              description: Entradas inválidas
 *          401: 
 *              description: no es administrador
 */

router.put('/:id', basicAuth({ 
    
    authorizer: validaradminmiddleware}), (req, res) => {    // solo un administrador puede agregar un producto


        const {nombre, precio } = req.body;

        const {id} = req.params;
        
        let validarrespuesta = false;
        
        if (id) {
            
            const MOSTRAR = obtenerproductoporid(Number(id));
            validarrespuesta = true;

         editarproducto(id, nombre, precio);
        
         console.log(chalk.blue("SE HA MODIFICADO EL PRODUCTO POR:"));
         console.log(MOSTRAR);

         //res.json(obtenerproducto());
     }

     validarrespuesta ? res.json('Producto actualizado') : res.status(400).json('Id o cambios inválidos');

    //console.log(chalk.red("ERROR AL MODIFICADO UN PRODUCTO"));

});


//*******************************    ELIMINAR PRODUCTO     *****************************************************

/**
 * @swagger
 * /productos/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto que desea eliminar
 *        required: true
 *        schema:
 *           type: integer
 * 
 *      summary: eliminar un producto (admin)
 *      tags: [Productos]  
 *         
 *      responses:
 *          200:
 *              description: Producto eliminado 
 *          400: 
 *              description: Entradas inválidas
 *          401: 
 *              description: administrador no autorizado
 */

router.delete('/:id', basicAuth({ 
    
    authorizer: validaradminmiddleware}), (req, res) => {

    const { id } = req.params;

    const buscarproducto = obtenerproductoporid(Number(id));
    
    let respuestavalidada = false;
    
    if (buscarproducto) {
        
        eliminarproductoporid(Number(id)) // eliminamos el producto
        
        respuestavalidada = true;
        
       // res.json(obtenerproducto());

        console.log(chalk.blue("SE HA ELIMINADO UN PRODUCTO :"));
        console.log(buscarproducto);

     }

    respuestavalidada ? res.json(("el producto ha sido eliminado")) : res.status(400).json('Id del producto inválido');

});

/**
 * @swagger
 * tags:
 *  name: 'Productos'
 *  descripcion: Relacionado con los productos del sistema
 * 
 * components:
 *  schemas:
 *      product:
 *          type: object
 *          required:
 *              -id
 *              -nombre
 *              -precio
 *          properties:
 *              id: 
 *                  type: integer
 *              nombre:
 *                  type: string
 *              precio: 
 *                  type: number
 *          example:
 *              id: 8
 *              nombre: SOPA
 *              precio: 12
 *
 */

module.exports = router;
