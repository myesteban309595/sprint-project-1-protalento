const pedidos = [
    {
        nombreusuario: "maryoe95",
        estado: "pendiente",
        direccion: "cll 3 esquina bastidas",
        telefono: 3004589636,
        nombrepago: "NEQUI",
        costopedido: 95,
        carrito: [
            {
                id: 1,
                nombreusuario: "focaccia",
                cantidad: 3
            }
        ]
    },
    {
        nombreusuario: "sandra08",
        estado: "Enviado",
        direccion: "morales bolivar cll 2 ",
        telefono: 3145268878,
        nombrepago: "efectivo",
        costopedido: 220,
        carrito: [
            {
                id: 5,
                nombreusuario: "hamburguesa clasica",
                cantidad: 1
            }
        ]
    }
];

//=================================================== FUNCIONES DE USUARIO ==========================================================================================


const obtenerPedidos = () => {

    return pedidos;

}

const pedidonuevousuario = (nombreusuario, direccion, telefono)  => {

    return pedidos.push({

        nombreusuario: nombreusuario,
        direccion: direccion,
        telefono: telefono,
        nombrepago: "Efectivo",
        estado: "Pendiente",
        costopedido: 0,
        carrito: []

    })
}

const buscarpedido = (nombreusuario) => {

    let pedido = {};

    pedido = obtenerPedidos().find(u => u.nombreusuario === nombreusuario)
    return pedido

}

const actualizarpedido = (filter) => {

    const precios = filter.carrito.map(u => u.precio * u.cantidad);

    let totalpedido = 0;

    for (let i of precios) totalpedido+=i;
    filter.costopedido = totalpedido
    return filter
}

module.exports = { actualizarpedido, buscarpedido, obtenerPedidos,  pedidonuevousuario};
