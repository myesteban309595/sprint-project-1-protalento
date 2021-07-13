const express = require('express');
const router = express();
const basicAuth = require('express-basic-auth');
const chalk = require('chalk');

const validaradminmidleware = require('../middlewares/validacionadminmiddleware'); // PERMISOS DE ADMINISTRADOR

const { obtenerproducto } = require('../models/productos.models');
const { obtenermetodosdepago }  = require('../models/pagos.model');
const {obtenerusuariosporemail, obtenerusuarios } = require('../models/usuarios.models');
const { buscarpedido, actualizarpedido, obtenerPedidos} = require ('../models/pedidos.models2')

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  ADMINISTRADOR  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//                             que los administradores puedan ver todos los pedidos y cambiar el estado de los mismos
/**
 * @swagger
 * /pedidos/todoslospedidos:
 *      get:
 *          summary: Ver todos los pedidos por el admin.
 *          description: Ver todos los pedidos.
 *          tags: [Pedidos]
 *          security:
 *              - basicAuth: []
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */


 router.get('/todoslospedidos', basicAuth({ 
    
    authorizer: validaradminmidleware}) , (req,res) => { 
     
    res.json(obtenerPedidos());    
    console.log(chalk.yellowBright("EL ADMINISTRADOR HA SOLICITADO TODOS LOS PEDIDOS"));

});

//=================================================== FUNCIONES DE USUARIO ==========================================================================================

//                                             OBTENER HISTORICO PEDIDOS POR USUARIO

/**
 * @swagger
 * /pedidos/historial:
 *      get:
 *          summary: Ver el pedido del usuario.
 *          description: Ver el pedido del usuario.
 *          tags: [Pedidos]
 *          security:
 *             - basicAuth: []

 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
 router.get('/historial', (req,res) => {

     const contrasena = req.auth.password; 
     const nombreusuario = req.auth.user; 
     const user = obtenerusuarios(nombreusuario);
    
     if(user) 
     {
         res.status(200).json(buscarpedido(nombreusuario));
         console.log(chalk.yellowBright("EL USUARIO HA PEDIDO SU HISTORIAL DE PEDIDOS"));
         
        }
        
        else {   
            res.status(404).json('usuario o contraseña incorrectos');   
        }
});


//Verifica si el producto existe en el producto, si es así, le suma a la cantidad (cantidad), de lo contrario lo agrega como otro elemento de array en el carrito.
/**
 * @swagger
 * /pedidos/productoPedido/{id}:
 *      post:
 *          summary: Añadir producto a orden.
 *          description: Método para agregar productos al pedido del usuario (carrito).
 *          tags: [Pedidos]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del producto a agregar
 *              required: true
 *              type: integer       
 *          responses:
 *                  201:
 *                      description: Producto agregado exitosamente.
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  404:
 *                      description: No existe el producto.
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.post('/productoPedido/:id', (req, res) => {

    const product = obtenerproducto().find(producto => producto.id === +req.params.id)
    const nombreusuario = req.auth.user;
    const contrasena = req.auth.contrasena;

    if(product == undefined) res.json('El producto no se encuentra en el menú');

    else{ //el usuario ya está registrado, verifico que sea unico y extraigo su id

        const usuarioPedido = obtenerusuarios(nombreusuario, contrasena);
        const pedidofiltrado = obtenerPedidos().find(pedido => pedido.id == usuarioPedido.id && pedido.estado == "Pendiente") //selección del pedido de acuerdo al id usuario
    
        if (pedidofiltrado){

        if(pedidofiltrado.carrito.some(u => u.id == product.id) == true){

            const productExtant = pedidofiltrado.carrito.find(u => u.id == req.params.id);
            productExtant.cantidad++;

            pedidofiltrado.carrito.cantidad = productExtant.cantidad; 
            
            console.log(chalk.blueBright("EL USUARIO HA AGREGADO UN PRODUCTO AL CARRITO"));


        }else {
            
            pedidofiltrado.carrito.push(product);

            res.status(201).json(actualizarpedido(pedidofiltrado));
        }

    } else
         { 
           res.status(404).json('El pedido del usuario ya ha sido cerrado')
          console.log(chalk.yellowBright("EL PEDIDO YA HA SIDO CERRADO"));
         }
       
    }     
});

//Elimina un producto al carrito y/o al pedido.
/**
 * @swagger
 * /pedidos/productoPedido/{id}:
 *      delete:
 *          summary: Elimina el producto del carrito.
 *          description: Método para eliminar productos al pedido del usuario.
 *          tags: [Pedidos]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del producto a agregar
 *              required: true
 *              type: integer       
 *          responses:
 *                  '200':
 *                      description: Producto eliminado de la orden exitosamente.
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  404:
 *                      description: No existe el producto.
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */

router.delete('/productoPedido/:id',(req,res) => {

    const product = obtenerproducto().find(u => u.id == +req.params.id);

    const nombreusuario = req.auth.user;
    const contrasena = req.auth.password;

    const usuarioPedido = obtenerusuariosporemail(nombreusuario, contrasena);
    const pedidofiltrado = obtenerPedidos().find(pedido => pedido.id == usuarioPedido.id && pedido.estado == 'Pendiente');

    if(pedidofiltrado){

    const productExtant = pedidofiltrado.carrito.find(u => u.id == req.params.id);

    if (pedidofiltrado.carrito.some(u => u.id == product.id) == true) {

        if (pedidofiltrado.carrito.find(u => u.id == product.id).cantidad > 1){

            productExtant.cantidad = productExtant.cantidad-1;
            actualizarpedido(pedidofiltrado);
            res.status(200).json(pedidofiltrado); 

        } else if (pedidofiltrado.carrito.find(u => u.id == product.id).cantidad = 1) {

            pedidofiltrado.carrito.splice(pedidofiltrado.carrito.lastIndexOf(productExtant),1);
            actualizarpedido(pedidofiltrado);

            res.json(obtenerPedidos().find(u => u.nombreusuario == req.auth.user && u.estado == 'pendiente'));
        }

    } else {

        res.status(404).json('El producto no está en el pedido.')

    }

} else res.status(404).json('El estado actual de su pedido está cerrado')

});

//Confirma el pedido y este ya no se puede modificar 
/**
 * @swagger
 * /pedidos/confirmarOrden/:
 *      put:
 *          summary: Confirmar orden
 *          description: Confirmar orden para cerrar el pedido.
 *          tags: [Pedidos]
 *          security:
 *              - basicAuth: []        
 *          responses:
 *                  '201':
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  401:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.put('/confirmarOrden',(req,res) => {

    const nombreusuario = req.auth.user;
    const pedidofiltrado = buscarpedido(nombreusuario);
    pedidofiltrado.estado = 'confirmado';
    res.status(201).json (pedidofiltrado);
    
    console.log(chalk.yellowBright("EL USUARIO HA CONFIRMADO EL PEDIDO"));

});

//cambio estado de pedido por el admin
//Permite cambiar la dirección que viene por defecto del usuario.
/**
 * @swagger
 * /pedidos/administrador/{nombre}:
 *      put:
 *          summary: Cambiar el estado de cualquier pedido por el admin
 *          description: Cambio el estado del pedido del usuario diferente al que viene por defecto
 *          tags: [Pedidos]
 *          parameters:
 *            - in: path
 *              name: nombreusuario
 *              description: nombre del usuario
 *              required: true
 *              type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/estadoPedido'
 *                     type: 
 *                          Array            
 *          responses:
 *                  '201':
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  401:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.put('/administrador/:nombre', basicAuth({ 
    
    authorizer: validaradminmidleware}), (req,res) => { 

    const { estado } = req.body;

    if (buscarpedido(req.params.nombreusuario).estado == estado) res.json("Requiere definir un estado del pedido y/o actualizar a uno diferente");
    
    else{

        buscarpedido(req.params.nombreusuario).estado = estado;
        res.status(201).json('Estado del pedido actualizado : '+estado);
    }
});

//poner una dirección al pedido por el usuario
//Permite cambiar la dirección que viene por defecto del usuario.
/**
 * @swagger
 * /pedidos/cambioDireccionPedido/:
 *      put:
 *          summary: Agregar una dirección diferente al pedido
 *          description: Puede agregar una dirección diferente a la que tiene el usuario por defecto
 *          tags: [Pedidos]
 *          security:
 *              - basicAuth: []
 *          requestBody:
 *              require: true
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/direccion' 
 *                      type:
 *                          Array       
 *          responses:
 *                  '201':
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  401:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.put('/cambioDireccionPedido',(req,res) => {

    const { direccionPedido } = req.body;
    const nombreusuario = req.auth.user;

    const pedidofiltrado = buscarpedido(nombreusuario); 

    pedidofiltrado.direccionPedido = direccionPedido;

    res.status(201).json(pedidofiltrado)

    console.log(chalk.yellowBright("EL USUARIO HA AGREGAGO UNA NUEVA DIRECCION DE ENVIO"));

});

//    REVISAR PARA SOLUCIONAR PROBLEMA 


// //usuario puede añadir metodo de pago a su pedido "actualizar el vacio"
// /**
//  * @swagger
//  * /pedidos/metodoPago/{id}:
//  *      put:
//  *          summary: Agregar método de pago al pedido
//  *          description: Agregar metodo de pago a la orden antes de confirmarla.
//  *          tags: [Pedidos]
//  *          security:
//  *              - basicAuth: []
//  *          parameters:
//  *            - in: path
//  *              name: id
//  *              description: id del metodo de pago a agregar
//  *              required: true
//  *              type: integer       
//  *          responses:
//  *                  '201':
//  *                      description: Método de pago agregado exitosamente.
//  *                      content:
//  *                          'aplication/json': {}
//  *                          'aplication/xml': {}
//  *
//  *                  401:
//  *                      description: El método de pago no esta disponible por el momento.
//  *                      content:
//  *                          'aplication/json': {}
//  *                          'aplication/xml': {}
//  */
// router.put('/metodoPago/:id',(req,res) => {

//     const pago = obtenermetodosdepago().find(u => u.id == req.params.id);
//     const filter = buscarpedido(req.auth.user); 

//     if (obtenermetodosdepago().some(u => u.id == req.params.id)){

//         filter.pago = nombrepago.pago;
//         res.json(filter)

//     } else res.json('No existe el método de pago')
// });

// -----Schemas Swagger-----
/**
 * @swagger
 * name: Estado del pedido dado por el admin
 * description: El admin le asigna un estado al pedido del usuario
 * components:
 *  schemas:
 *      estadoPedido:
 *          type:   object
 *          required:
 *              -estado
 *          properties:
 *              estado:
 *                  type: string
 *                  example: Enviado        
 */

/**
 * @swagger
 * name: Cambiar direccion
 * description: Modelo de adicción de dirección para el pedido del usuario
 * components:
 *  schemas:
 *      direccion:
 *          type: object
 *          required:
 *              -direccionPedido
 *          properties:
 *              direccionPedido:
 *                  type: string
 *                  example: calle 2 de noviembre
 *                  description: Agrega una dirección nueva al pedido diferente a la que tiene el usuario por defecto.
 *                   
 *          
 */


module.exports = router;
