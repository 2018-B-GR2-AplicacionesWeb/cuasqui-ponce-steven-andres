const fs = require('fs');
const rxjs = require('rxjs');
const inquirer = require('inquirer');
function main() {
}
consultarClientes();
function consultarClientes() {
    return new Promise((resolve) => {
        fs.readFile('clientes.json', "handleJSONFile", (error, contenidoArchivo) => {
            if (error) {
                var advertencia = "Error en la consulta del cliente";
                resolve(advertencia);
            }
            else {
                var texto = JSON.parse(contenidoArchivo);
                resolve(texto);
            }
        });
    });
}
function buscarNombreCliente() {
    return new Promise((resolve, reject) => {
        fs.readFile('clientes.json', 'utf-8', (err, contenido) => {
            if (err) {
                reject("Error al buscar por nombre de Cliente");
            }
            else {
                var cliente = JSON.parse(contenido);
                cliente
                    .find((nombre) => {
                    return cliente.nombre === nombre;
                });
                resolve(cliente);
            }
        });
    });
}
function modificarCliente(clienteMod) {
    return new Promise((resolve, reject) => {
        fs.readFile('clientes.json', 'utf-8', (err, contenido) => {
            if (err) {
                reject("Cliente no se pudo modificar");
            }
            else {
                const baseClientes = JSON.parse(contenido);
                baseClientes.push(clienteMod);
                fs.writeFile('clientes.json', JSON.stringify(baseClientes), (error) => {
                    if (error) {
                        reject("Error al modificar Cliente");
                    }
                    else {
                        resolve("Cliente modificado exitosamente");
                    }
                });
            }
        });
    });
}
function ingresarCliente(clienteAñad) {
    return new Promise((resolve, reject) => {
        fs.readFile('clientes.json', 'utf-8', (err, contenido) => {
            if (err) {
                reject("Error en el ingreso del cliente");
            }
            else {
                const basedeClientes = JSON.parse(contenido);
                basedeClientes.push(clienteAñad);
                fs.writeFile('clientes.json', JSON.stringify(basedeClientes), (err) => {
                    if (err) {
                        reject("Error al añadir el cliente a  la base");
                    }
                    else {
                        resolve("Se ha añadido un cliente");
                    }
                });
            }
        });
    });
}
