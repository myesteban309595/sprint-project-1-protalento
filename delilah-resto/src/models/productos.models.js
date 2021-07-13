
const productos = [
    {
        id: 1,
        nombre: 'focaccia',
        precio: 200
    },
    {
        id: 2,
        nombre: 'sandwich focaccia',
        precio: 150
    },
    {
        id: 3,
        nombre: 'Sándwiche veggie',
        precio: 180
    },
    {
        id: 4,
        nombre: 'Ensalada veggie',
        precio: 130
    },
    {
        id: 5,
        nombre: 'hamburguesa clasica',
        precio: 300
    },
    {
        id: 6,
        nombre: 'san queso',
        precio: 420
    },
    {
        id: 7,
        nombre: 'agua',
        precio: 80
    }
];

//********************   OBTENER PRODUCTOS POR ID  *******************************************

const obtenerproductoporid = (id) => {   // para filtrar un producto por el id

    return productos.find(product => product.id == id);   // buscamos un producto por el identificador y retornamos el producto encontrdo
};

//**********************    OBTENER PRODUCTOS    *******************************************

const obtenerproducto = () => {  

    return productos;

};

//***********************   AGREGAR PRODUCTOS   ********************************************

const agregarproducto = (product) => { // para agregar un producto
    
   // const date = new Date();
    
    //product.id = date.getTime();
    
    productos.push(product);
    
}

//************************    EDITAR PRODUCTO     *********************************************

const editarproducto = (id, nombre, precio) => {  // para editar un producto nombre, id y precio
 
    const product = obtenerproductoporid(id); // llamamos al producto

    product.nombre = nombre;
    product.precio = precio;

};

//************************    ELIMINAR PRODUCTO     *********************************************

const eliminarproductoporid = (id) => {    // para eliminar un producto por su id

    const product = obtenerproductoporid(id); //llamamos al producto

    if(product){
        
        productos.splice(productos.indexOf(product),1); // indexof inicia la busqueda desde el indice de la llamada devuelve 0 o -1 si no se encuentra
    }
    
};




module.exports = { obtenerproducto, agregarproducto, obtenerproductoporid, editarproducto, eliminarproductoporid };

