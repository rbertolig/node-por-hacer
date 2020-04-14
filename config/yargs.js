//Requires
const opt1 = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Crea una tarea nueva con la descripcion que se digite'

    },
}
const opt2 = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Crea una tarea nueva con la descripcion que se digite'

    },
    completado: {
        alias: 'c',
        default: true,
        desc: 'Actualiza el estado de una tarea a tarea'
    },
}
const argv = require('yargs')
    .command('crear', 'Crear una tarea por hacer', opt1)
    .command('actualizar', 'Actualiza el estado de una tarea', opt2)
    .command('borrar', 'Borra una tarea de la lista de pendientes', opt1)
    .help()
    .argv;

module.exports = {
    argv
}