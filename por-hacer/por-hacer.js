//requires

//Require paquete File System para trabajar con archivos
const fs = require('fs');

// inicializar arreglo que almacenara elementos ( tareas )
let listadoPorHacer = [];


/***
 * implementar funciones
 ***/


//funcion para leer datos que estan en archivo JSON
const cargarDB = () => {
    //cargar datos de archivo JSON en objeto tipo arreglo
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
    // recordar: intentar leer un JSON vacio da error, al menos debe tener '[]' que es vacio pero correcto.
    //por eso arriba se lee archivo usando 'try' y no el requiere directo 
}

// funcion para grabar arreglo con datos convertido a cadena de texto  en un archivo JSON
const guardarDB = () => {
    //convierte el arreglo en una cadena y la asigna a la variable 'data'
    let data = JSON.stringify(listadoPorHacer);

    //escribe 'data' en archivo JSON
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('Error actualizado JSON', err);
    });
}

//funcion para crear objeto de una tarea e insertarla en un arreglo que haremos persistente
const crear = (descripcion) => {
    // Leer data que existe en archivo JSON antes de anexarle la nueva
    cargarDB();
    // crear un objeto que representa cada tarea
    let porHacer = {
            descripcion: descripcion,
            completado: false
        }
        // hacer un Push para meter el objeto ( nueva tarea ) en el arreglo que 
        // almacenas todas las tareas
    listadoPorHacer.push(porHacer);
    guardarDB();
    // regreso el objeto recien insertado como realimentacion de lo que se hizo
    return porHacer;
}

//funcion getListado para leer datos del JSON y devolverlo en objeto
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

// funcion actualizar para cambiar estado de la tarea desde linea de comando
const actualizar = (descripcion, completado = true) => {

    //cargar dartos desde el JSON
    cargarDB();

    //scanear el arregle 'listadoPorHacer' para encontrar que index tiene una tarea
    //con descripcion igual a la recibida por esta funcion 
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    // si el 'findIndex' retorna -1 es que no encontro coincidencias
    // por eso si es 0 o mayor entonces es un indice valido
    // se procede a asignar al 'estado' de esa tarea lo que se queria actualizar
    if (index >= 0) {
        // uso JSON.parse para convertir a boolean el parametro 'completado' obtenido como texto desde 'argv'
        listadoPorHacer[index].completado = JSON.parse(completado);

        // guardar nuevo arregle de datos en archivo JSON
        guardarDB();
        return true; // para indicar que se hizo todo ok
    } else return false;
}

// funcion borrar para eliminar una tarea desde linea de comando
const borrar = (descripcion) => {
    cargarDB(); //cargar dartos desde el JSON

    //scanear el arreglo 'listadoPorHacer' para encontrar que index tiene una tarea
    //con descripcion igual a la recibida por esta funcion 
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    // si el 'findIndex' retorna -1 es que no encontro coincidencias
    // por eso si es 0 o mayor entonces es un indice valido y
    // se procede a eliminar esa tarea indexada dentro arreglo usando 'arreglo.splice(index,1)'
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB(); // guardar nuevo arreglo de datos en archivo JSON
        return true; // para indicar que se hizo todo ok
    } else return false;
}



// exportamos la funcion crear() para usarla desde el APP principal
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}