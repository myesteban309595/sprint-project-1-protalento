const noautorizado = (req) => {

    return req.auth? "Creedenciales no autorizadas":"Credenciales no proporcionadas";

};

module.exports = noautorizado;
