const fs = require('fs');

const DB_NAME = 'db/data.json';

let listadoPorHacer = [];


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo guardar', err)
    });

}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        throw new Error(` La tarea ingresada \' ${descripcion} ' ya se encuentra en la lista`);
    }

    listadoPorHacer.push(porHacer);

    guardarDB();
    return { DB_NAME, porHacer };
}
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        console.log('\n\Despues:', listadoPorHacer);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    console.log('Se eliminara el siguiente elemento: ', descripcion);

    if (index >= 0) {
        listadoPorHacer = listadoPorHacer.filter(tarea => tarea.descripcion != descripcion);
        console.log('\n\Despues:', listadoPorHacer);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}