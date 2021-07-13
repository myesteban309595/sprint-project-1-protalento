const basicAuth = require('express-basic-auth');
const { obtenerusuarios } = require('../models/usuarios.models');

const validaciondellogin = (user, password) => {

    const usuarioencontrado = obtenerusuarios().find(u=> u.nombreusuario === user && u.contrasena === password ); 

   // const usuarioencontrado = obtenerusuarios().find(arraydeusuarios => basicAuth.safeCompare(arraydeusuarios.email,user) && basicAuth.safeCompare(arraydeusuarios.contrasena, password));

    return usuarioencontrado? true : false; // si existe un usuario o no envia true o false
}

module.exports = validaciondellogin;
