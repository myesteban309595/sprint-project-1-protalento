const metodosdepago = [
    {
        id: 1,
        nombrepago:  'efectivo',
       
    },
    {
        id: 2,
        nombrepago:   'NEQUI',
       
    },
    {
        id: 3,
        nombrepago:   'ALCOBRO'
        
    }

];

//********************   OBTENER METODO DE PAGO  *******************************************

const obtenermetodosdepago = () => 
{

    return metodosdepago;

};

//********************   OBTENER METODO DE PAGO POR ID *******************************************


const agregarmetododepago = (metododepago) => 
{
    // const date = new Date();
    // metododepago.id = date.getTime();
    
    metodosdepago.push(metododepago);
    
}

//********************   AGREGAR METODO DE PAGO  *******************************************
const obtenermetododepagoporid = (id) => 
{

    return metodosdepago.find(metododepago => metododepago.id === id);

};

//********************   EDITAR METODO DE PAGO  *******************************************

const editarmetododepago = (id, nombrepago) => 
{

    const metododepago = obtenermetododepagoporid(id);
    
    if(metododepago)
    {
        metododepago.nombrepago = nombrepago; 
    }

};
//********************   ELIMINAR METODO DE PAGO  *******************************************

const eliminarmetododepagoporid = (id) => {
    
    const metododepago = obtenermetododepagoporid(id);
    
    if(metododepago)
    {
        
        metodosdepago.splice(metodosdepago.indexOf(metododepago),1); // eliminar un elemento despues del id
        
    }
};




module.exports = {obtenermetododepagoporid, obtenermetodosdepago, agregarmetododepago, eliminarmetododepagoporid ,editarmetododepago};
