const usuarios = [

    
    {
        nombreusuario: "maryoe95",
        nombre: "marlon yoel esteban valencia",
        email: "marlon95@hotmail.com",
        telefono: "3194329073",
        direccion: "cll 3ra esquina",
        contrasena: "marlon123456",
        esadmin : false  // usuario base, no es admin
    },
    {
        nombreusuario: "admin",
        nombre: "administrador",
        email: "administrador@hotmail.com",
        telefono: "3004508348",
        direccion: "cll 3ra esquina",
        contrasena: "admin123456",
        esadmin : true   // para validar que es un administrador   
    }
];
//***********************   AGREGAR USUARIO   *******************************************

const agregarusuario = (user) => { //agrego un usuario

    usuarios.push(user); 
};

//***********************   OBTENER USUARIO   ********************************************

const obtenerusuarios = () => { 

    return usuarios; 

};

//********************** OBTENER USUARIO POR EMAIL   *************************************


const obtenerusuariosporemail = (email) => { 
    
    return usuarios.find(u => u.nombreusuario === nombreusuario && u.contrasena === contrasena);
};

module.exports = { agregarusuario, obtenerusuarios, obtenerusuariosporemail }; // exportamos 
