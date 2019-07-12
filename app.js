const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const color = require('colors');


switch (argv._[0]) {

    case 'crear':
        let resp = porHacer.crear(argv.descripcion);
        console.log(`Tarea agregada:`, resp.porHacer, ` en el archivo ${resp.DB_NAME} `);
        break;
    case 'listar':
        let listado = porHacer.getListado();

        if (listado.length != 0) {
            let i = 1;
            let estado;

            console.log('========================================================'.blue);
            console.log(` Listado de ${listado.length} tareas`.blue);
            console.log('========================================================'.blue);

            listado.forEach(tarea => {
                estado = tarea.completado ? 'Completado'.green : 'Pendiente'.red;
                console.log(`Tarea (${i++}): ${tarea.descripcion} \t|\t Estado: ${estado}`);
            });
            console.log('========================================================'.blue);
        } else {
            console.log('========================================================'.blue);
            console.log(` No existen tareas por listar`.blue);
            console.log('========================================================'.blue);
        }


        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);

        break;
    case 'borrar':
        let borrar = porHacer.borrar(argv.descripcion);
        if (borrar)
            console.log(` El elemento se borro exitosamente ${argv.descripcion}`);
        else
            console.log(` No se pudo borrrar el elemento ${argv.descripcion}`);
        break;
    default:
        console.log('El comando no es reconocido')
}