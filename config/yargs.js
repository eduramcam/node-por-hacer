const generic_option = {
    descripcion: {
        alias: 'd',
        demand: true,
        describe: 'Descripcion de la tarrea a crear'
    }
}

const actualizar_option = {
    descripcion: {
        alias: 'd',
        describe: 'Actualiza estatus una descripcion',
        demand: true
    },
    completado: {
        alias: 'c',
        default: true,
        describe: 'Marca como completada la tarea'
    }
}

const argv = require('yargs')
    .command('crear', 'Este es un componente que crea lista y termina tareas ', generic_option)
    .command('actualizar', 'Actualiza un elemento a estatus completado o pendiente', actualizar_option)
    .command('borrar', 'Actualiza un elemento a estatus completado o pendiente', generic_option)
    .help()
    .argv;

module.exports = {
    argv
}