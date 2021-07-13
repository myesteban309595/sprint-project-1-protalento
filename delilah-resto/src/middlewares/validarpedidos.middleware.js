
const { obtenerproductoporid } = require('../models/productos.models');
const { obtenermetododepagoporid } = require('../models/pagos.model');//pendiente enlace

const validarpedido = (req, res, next) => {

    const { pedido } = req.body;
    let respuesta = false;

    let message = "informacion invalida ingrese un JSON valido";

    if (pedido) {

        const { metododepago, productos, direccion } = pedido;

        if (typeof metododepago === 'number' && Array.isArray(productos) && typeof direccion === 'string') 
        {

            if(productos.length > 0 && direccion.trim() && Number.isInteger(metododepago) && metododepago>0 && validacionmetodosdepagoenexistencia(metododepago))
            {
                respuesta = true;

                for (let i = 0; i < productos.length; i++) 
                {

                    const { id, cantidad } = productos[i];
    
                    if (typeof id === 'number' && typeof cantidad === 'number') 
                    {
    
                        if (id <= 0 || cantidad <= 0 || !Number.isInteger(id) || !Number.isInteger(cantidad) || !validarexistenciadeproductos(id)) 
                        {
                            respuesta = false;
                            break;
                        }

                    } else
                    {
                        respuesta = false;
                        break;
                    }
    
                }
            }

        }
    }

    respuesta ? next() : res.json(message);
};

const validarexistenciadeproductos = (productoid) =>
{
    
    return obtenerproductoporid(productoid) ? true : false;

}

const validacionmetodosdepagoenexistencia = (metododepagoid) =>
{

    return obtenermetododepagoporid(metododepagoid) ? true : false;

}

module.exports = validarpedido;
