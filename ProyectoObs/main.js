const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;
const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: '¿Que quiere hacer?',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};
const preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Ingrese ID'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nombre'
    },
];
const preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese ID a buscar',
    }
];
const preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nuevo nombre'
    },
];
async function main() {
    // 1) Inicializar bdd -- DONE
    // 2) Preguntas Menu -- DONE
    // 3) Opciones de Respuesta --  DONE
    // 4) ACCCION!!!!  -- DONE
    // 5) Guardar BDD --
    // of(Cualquier cosa JS)
    // from(Promesas)
    const respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(preguntarOpcionesMenu(), opcionesRespuesta(), ejecutarAcccion(), guardarBaseDeDatos())
        .subscribe((data) => {
        //
        console.log(data);
    }, (error) => {
        //
        console.log(error);
    }, () => {
        main();
        console.log('Complete');
    });
    /*
    try {
        const respuestaInicializarBDD:RespuestaBDD = <RespuestaBDD> await inicialiarBDD();
        const bdd = respuestaInicializarBDD.bdd;
        const respuestaMenu = await inquirer.prompt(preguntaMenu);
        switch (respuestaMenu.opcionMenu) {
            case 'Crear':
                // Preguntar datos del nuevo Usuario
                const usuario = await inquirer.prompt(preguntaUsuario);
                // CREAR USUARIO
                bdd.usuarios.push(usuario); // JS
                const respuestaGuardado = await guardarBDD(bdd);
                main();
                break;
        }
    } catch (e) {
        console.error(e)
    }
    */
}
function inicialiarBDD() {
    return new Promise((resolve, reject) => {
        fs.readFile('bdd.json', 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                fs.writeFile('bdd.json', '{"usuarios":[],"perros":[]}', (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse('{"usuarios":[],"perros":[]}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'BDD leida',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
function guardarBDD(bdd) {
    return new Promise((resolve, reject) => {
        fs.writeFile('bdd.json', JSON.stringify(bdd), (error) => {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
function preguntarOpcionesMenu() {
    return mergeMap((respuestaBDD) => {
        return rxjs
            .from(inquirer.prompt(preguntaMenu))
            .pipe(map((respuesta) => {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
        }));
    });
}
function preguntarIdUsuario(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(mergeMap(// RESP ANT OBS
    (respuesta) => {
        const indiceUsuario = respuestaBDD.bdd
            .usuarios
            .findIndex(// -1
        (usuario) => {
            return usuario.id === respuesta.idUsuario;
        });
        if (indiceUsuario === -1) {
            console.log('preguntando de nuevo');
            return preguntarIdUsuario(respuestaBDD);
        }
        else {
            respuestaBDD.indiceUsuario = indiceUsuario;
            return rxjs
                .from(inquirer.prompt(preguntaEdicionUsuario))
                .pipe(map((nombre) => {
                respuestaBDD.usuario = {
                    id: null,
                    nombre: nombre.nombre
                };
                return respuestaBDD;
            }));
        }
    }));
}
function opcionesRespuesta() {
    return mergeMap((respuestaBDD) => {
        const opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntaUsuario))
                    .pipe(map((usuario) => {
                    respuestaBDD.usuario = usuario;
                    return respuestaBDD;
                }));
            case 'Buscar':
                break;
            case 'Actualizar':
                return preguntarIdUsuario(respuestaBDD);
            case 'Borrar':
                break;
        }
    });
}
function ejecutarAcccion() {
    return map(// Respuesta del anterior OBS
    (respuestaBDD) => {
        const opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                const usuario = respuestaBDD.usuario;
                respuestaBDD.bdd.usuarios.push(usuario);
                return respuestaBDD;
            case 'Actualizar':
                const indice = respuestaBDD.indiceUsuario;
                respuestaBDD.bdd.usuarios[indice].nombre = respuestaBDD.usuario.nombre;
                return respuestaBDD;
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    (respuestaBDD) => {
        // OBS
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
