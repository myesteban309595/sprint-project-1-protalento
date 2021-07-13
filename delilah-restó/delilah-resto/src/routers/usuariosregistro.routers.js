
const express = require('express'); // llamamos express
const router = express.Router();
const basicAuth = require('express-basic-auth');
const chalk = require('chalk');


const {agregarusuario,obtenerusuarios} = require('../models/usuarios.models'); // llamamos los usuarios
const validaradminmidleware = require('../middlewares/validacionadminmiddleware');
const validarcorreoduplicado = require('../middlewares/validaringreso.middleware')
//const middlewaredevalidaciondeingreso = require('../middlewares/validaciondelogin.middleware');

/**
 * @swagger
 * /usuarios:
 *  post:
 *      summary: Crea un nuevo usuario en el sistema
 *      security: []
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    properties: 
 *                       nombreusuario:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                       telefono:
 *                         type: string
 *                       email:
 *                         type: string
 *                       direccion:
 *                         type: string
 *                       contrasena:
 *                         type: string
 *                    example:
 *                       nombreusuario: sandra08
 *                       nombre: sandra valencia
 *                       telfono: 3004508978
 *                       email: sandra08@hotmail.com
 *                       direccion: cll 3 esquina
 *                       contrasena: sandra123456
 *      responses:
 * 
 *          201:
 *              description: el usuario ha sido creado
 *              content:
 *                  application/json:
 *                     schema:
 *                       type: object
 *                       properties:
 *                          msg:
 *                               type: string
 *             
 *          400: 
 *              description: Entradas inválidas
 */

//*                       $ref: '#/components/schemas/usuario'

router.post('/', (req, res) => {  // para agregar un nuevo usuario mediante un middleware de validacion
    

    const { nombreusuario, nombre, telefono, email, direccion, contrasena } = req.body;

    const nuevousuario = {

        nombreusuario: nombreusuario,
        nombre: nombre,
        telefono: telefono,
        email: email,
        direccion: direccion,
        contrasena: contrasena,
        esadmin : false
    }

    //console.log(nuevousuario);
     console.log(chalk.yellowBright("SE HA CREADO UN NUEVO USUARIO"));

    agregarusuario( nuevousuario ); // agregamos usuarios tomados del array nuevousuario

    res.status(201).json("El Usuario ha sido agregado !STATUS 201¡"); // status 201 created

});

/**
 * @swagger
 * /usuarios:
 *  get:
 *      summary: obtiene todos los usuarios
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: se ha obtenido los Productos exitosamente
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/usuario'
 *          201:
 *              description: usuario creado
 *          401: 
 *              description: no autorizado
 */

      router.get('/',basicAuth({authorizer: validaradminmidleware }), (req,res)=>{ // para obtener los usuarios

        console.log(chalk.yellowBright("SE HAN OBTENIDO TODOS LOS USUARIOS"));
        res.json(obtenerusuarios());

      })
/**
 * @swagger 
 * tags: 
 *  name : 'Usuarios'
 *  description: 'Registro e inicio de sesión'
 * 
 * components: 
 *  schemas:
 *      usuario: 
 *          type: object
 *          required:
 *               -nombreusuario
 *               -nombre
 *               -telefono
 *               -email
 *               -direccion
 *               -contrasena
 *          properties: 
 *              nombreusuario:
 *                  type: string
 *              nombre:
 *                  type: string
 *              telefono:
 *                  type: string
 *              email:
 *                  type: string
 *              direccion:
 *                  type: string
 *              contrasena:
 *                  type: string
 *          example:
 *              nombreusuario: sandra08
 *              nombre: sandra mildred valencia
 *              telefono: 3004508978
 *              email: sandra08@hotmail.com
 *              direccion: cll 3 esquina
 *              contrasena: sandra123456             
 */

module.exports = router; // exportamos

