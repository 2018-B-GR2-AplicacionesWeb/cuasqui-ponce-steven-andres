const fs = require('fs');

const promesa = (nombreArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoLeido);
                    }
                }
            );
        }
    );
};

const promesaEscritura = ( nombreArchivo,
    contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreArchivo,
                contenidoArchivo,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoArchivo);
                    }
                }
            );
        }
    );
};

console.log(promesa);
promesa('099-texto.txt')
    .then(
        (contenido) => {
            console.log('Ok', contenido);
            return promesaEscritura(
                '07-texto.txt',
                contenido + 'Nuevo Contenido');
            // Promesa
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log(contenidoCompleto);
        }
    )
    .catch(
        (error) => {
            console.log('Mal', error);
        }
    );
//Transformacion

const nombreArchivo= '07-text.txt'
const contenido= 'Hola'
const appendFile=(nombreArchivo,contenido)=>{
    return new Promise(
        (resolve,reject)=>{
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenido) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenido);
                    }
                }
            );
        }
    )
}



appendFile(nombreArchivo,contenido)
.then(
fs.writeFile(
    nombreArchivo,
    contenido,
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(contenido)
        }
    }
)
)

.catch(
    console.log('Error')
)
