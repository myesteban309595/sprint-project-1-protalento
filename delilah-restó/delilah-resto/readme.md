# Acamica Sprint Project 1 My primera API  :D

Este proyecto corresponde al primer sprint project de ACAMICA PROTALENTO, que corresponde a un restaurante llamado DELILAH-RESTÓ 
el cual venderá al público una serie de comidas.

## Instalación

para este proyecto hemos empleado las siguientes tecnologias :

### Tecnologías usadas

* Javascript
* NodeJS
* Express                                                                                                                                                               
* nodemon

### Programas base

* Visual Studio Code
* Postman

### Documentacion

* Swagger

### Instalación

Los archivos correspondientes al proyecto pueden ser descargados directamente desde el repositorio de GITLAB O GITHUB mediante las siguientes direcciones de enlace [documentation](https://gitlab.com/protalentomarlon/dwbe-tale-01/-/tree/master/delilah-resto) 

* Ejecutamos directamente en la terminal el siguiente comando  
```bash
npm install
```

### Ejecución de la API

* En la terminal de vscode entramos al folder si lo requiere con el comando

```bash
cd delilah-resto
```
* Para correr la API lo hacemos mediante el siguiente comando en la terminal

```bash
nodemon src/index.js
```
* Ingresar a la documentación de Swagger encontrada en la siguiente url: [documentation](http://localhost:3000/swaggerAPI/#/)

### Consideraciones de funcionamiento

La API cuenta con dos usuarios predeterminados por defecto, donde uno de ellos es un administrador y otro es un usuario base el cual nos permitirá probar seguramente el funcionamiento de la API cumpliendo con los requerimientos y las credenciales de acceso asignado a cada usuario.

* *usuario estandar*

```bash
user:      maryoe95
password : marlon123456
```
* *usuario administrador*

```bash
user:      admin
password : admin123456
```

### Credenciales de acceso de cada tipo de usuario (administrador y usuario estandar)

### ADMINISTRADOR

El administrador tiene acceso a toda la API en general, principalmente a las funciones que requieran una credencial para realizar cierta
accion como: eliminar, modificar, crear o visualizar informacion relevante del restaurante: 

*PRODUCTOS*

* visualizar todos los productos
* crear nuevos productos
* editar productos existentes
* eliminar productos

*METODOS DE PAGO*

* visualizar los metodos de pago
* editar los metodos de pago
* crear nuevos metodos de pago
* eliminar metodos de pago

*USUARIOS*

* obtener todos los usuarios registrados en el sistema

*PEDIDOS*

* obtener todos los pedidos
* modificar el estado del pedido

### USUARIOS REGISTRADOS

El usuario tiene acceso a todas las funciones de la API que se relacionen con los pedidos que va a realizar.

*REGISTRO E INICIO*

* los usuarios pueden registrar y luego ingresar con sus datos

*PRODUCTOS*

* visualizar todos los productos

*METODOS DE PAGO*

* visualizar los metodos de pago

*PEDIDOS*

* obtener el historial de sus pedidos
* crear un pedido
* borrar un producto del pedido si este aun no ha sido cerrado
* cambiar la direccion de envio
* cerrar el pedido

## Descripciónes Generales de la API

* Cuando el usuario se registra se le asignara un pedido en cero.
* Si el usuario ya estaba registrado siempre se le asignará un pedido base el cual despues se puede eliminar.
* Mediante middlewares se realizaron validaciones de acceso como de administrador. 
* Para mejor visualizacion de cada comando se puede abrir en dos ventanas swagger y vscode (terminal), donde se visualizarán las acciones  realizadas.
* La API cumple con algunos de los story points extras propuestos por acámica.


## AUTOR

```bash
NOMBRE: Marlon Yoel Esteban Valencia
CORREO: maryoe_95@hotmail.com
```
