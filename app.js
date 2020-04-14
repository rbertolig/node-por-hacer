//Requires
//importamos el objeto argv desde nuestra configuracion yargs.js
const argv = require('./config/yargs').argv;

//importamos la libreria de funciones con la logica de nuestra aplicacion
const porHacer = require('./por-hacer/por-hacer');

//importar colors
const colors = require('colors');

// extraer el primer parametro de la linea de comando CLI
let comando = argv._[0];

//parsing del comando para tomar accion adecuada
switch (comando) {
    case 'crear':
        // llama a funcion 'crear' que devuelve en 'tarea' el objeto nuevo insertado
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado();
        // enviar mensaje en caso que no hayan tareas y salir del switch
        if (listado.length == 0) {
            console.log('No existen tareas registradas');
            return;
        }
        // imprimir encabezado del listado afuera del bucle for
        console.log('=========Por Hacer============'.green);
        // scanear el arreglo usando for of 
        for (const tarea of listado) {
            // generar un 'estado' con texto y colores segun true o false
            if (tarea.completado) var estado = 'Completado'.blue;
            else var estado = 'Pendiente'.red;
            // imprimir en consola cada tarea y su estado
            console.log(tarea.descripcion);
            console.log('Estado:', estado);
            console.log('=============================='.green);
        }
        // imprimir coletilla al final del listado
        console.log('<<<<<<<<Fin del Listado>>>>>>>'.green);
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado, argv.completado);
        break;
    case 'borrar':
        // llama a funcion 'borrar' que elimina una 'tarea' del listado en JSON
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        {
            console.log('Comando no reconocido');

        }
}