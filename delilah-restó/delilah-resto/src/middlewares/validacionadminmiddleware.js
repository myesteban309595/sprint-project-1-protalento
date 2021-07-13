const basicAuth = require('express-basic-auth');
const { obtenerusuarios } = require('../models/usuarios.models');

const validaradministrador = (user,password) => {

    const administrador = obtenerusuarios().find(u=> u.nombreusuario === user && u.contrasena === password && u.esadmin === true); 

    //const administrator = obtenerusuarios().find(arrayUser => basicAuth.safeCompare(arrayUser.email, user) && arrayUser.isAdmin)

    return administrador? true : false;  // es un administrador ? 
};

module.exports = validaradministrador;
