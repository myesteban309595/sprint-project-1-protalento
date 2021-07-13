const { obtenerusuarios } = require('../models/usuarios.models'); // llamamos del folder usuarios

const validaremail = (email) => {

    const buscarusuario = obtenerusuarios().find(arrayUser => arrayUser.email === email);  // buscamos del array de usuarios el email

    return buscarusuario ? false : true; // devolvemos de la busqueda un false o un true

};

//***********************COMPROBAMOS EL TIPO DE LA VARIABLE DE ENTRADA*************************************************

const validarentradas = (entradas) => {

    console.log(typeof entradas) // validamos e imprimimos el tipo de la variable 

    for (const property in entradas) {

        if (typeof entradas[property] !== 'string') 
        {
            return false; // si no es de tipo string devolvemos un false
        }
    }

    return true; // si es string devolvemos un true
}

//****************************************************************************************************************


const validaringreso = (req, res, next) => {   // middleware para validar el ingreso

   // const { user } = req.body;

    let entradasvalidadas = false;

    if (user) {

        const { nombreusuario, nombre, telefono,email, dreccion, contrasena } = user;
        
        if (validarentradas([nombreusuario, nombre, telefono, email, dreccion, contrasena])) {


            if (nombreusuario.trim() && nombre.trim() && telefono.trim() && email.trim() && dreccion.trim() && contrasena.trim()) {  //trim para eliminar espacios de lado y lado del string
                
                entradasvalidadas = true;
                
                // VALIDAMOS QUE EL CORREO NO ESTE EN USO
                
                validaremail(email) ? next() : res.status(400).json("! STATUS 400 bad request¡ Dirección de correo en uso");
            }

        }

    }

    if(!entradasvalidadas){

        res.status(400).json('¡¡INVALIDO!! status 404 error not found');  // status 404 error not found
    }

};

 module.exports = validaringreso;
