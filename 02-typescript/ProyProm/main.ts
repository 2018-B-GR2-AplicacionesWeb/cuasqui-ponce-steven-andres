declare var require:any;
declare var Promise:any;
const fs = require('fs');
const rxjs = require('rxjs');
const inquirer = require('inquirer');
const menu = [
    {
        type: 'list',
        name: 'menu',
        message: 'Que desea hacer ?',
        choices: [
            'Ingresar Cliente',
            'Consultar Clientes',
            'Modificar Cliente',
            'Borrar Cliente',
            new inquirer.Separator(),
            'Salir  - > x'
        ]
    }
]
function main(){
    //
    // console.log("Acciones para cliente"
    // +"\n1.- Ingresar Cliente"
    // +"\n2.- Mostrar Clientes"
    // +"\n3.- Actualizar Clientes"
    // +"\n4.- Eliminar Clientes")
    const opc = inquirer.prompt(menu);

    switch (opc.menu){
        case 'Ingresar Cliente':{
            var clienteO:{
                cedula:string
                nombre:string
                apellido:string

            }={
                cedula:"1725054017",
                nombre: "Ale",
                apellido: "Yanez"
            };
            ingresarCliente(clienteO)
        }
        case 'Consultar Clientes':{
            consultarClientes()
        }
        case 'Modificar Cliente':{

        }
        case 'Borrar Cliente':{

        }
        default:{
            console.log("Usted ha salido")
        }
    }


}
main();
function consultarClientes():Promise<string>{

    return new Promise(
        (resolve) => {
            // console.log("1")
            fs.readFile('clientes.json', "utf-8",
                (error, contenidoArchivo) => {
                    //console.log("2")
                    if (error) {
                        var advertencia = "Error en la consulta del cliente"
                        resolve(
                            advertencia
                        );
                    } else {

                        var texto=JSON.parse(contenidoArchivo)

                        resolve(
                            texto
                        );
                    }
                }
            );
        }
    );

}

function buscarNombreCliente() {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('clientes.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject("Error al buscar por nombre de Cliente");
                    } else {
                        var cliente = JSON.parse(contenido);

                        cliente
                            .find(
                                (nombre) => {
                                    return cliente.nombre === nombre;
                                }
                            );

                        resolve(cliente);
                    }
                });
        }
    );
}

function modificarCliente(clienteMod){
    return new Promise(
        (resolve, reject) => {
            fs.readFile('clientes.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject("Cliente no se pudo modificar");
                    } else {
                        const baseClientes = JSON.parse(contenido);


                        baseClientes.push(clienteMod);


                        fs.writeFile(
                            'clientes.json',
                            JSON.stringify(baseClientes),
                            (error) => {
                                if (error) {
                                    reject("Error al modificar Cliente");
                                } else {
                                    resolve("Cliente modificado exitosamente");
                                }
                            }
                        );
                    }
                });
        }
    );

}

function ingresarCliente(clienteAñad) {

    //console.log("1")
    return new Promise(

        (resolve, reject) => {
            //console.log("2")
            fs.readFile('clientes.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject("Error en el ingreso del cliente");
                    } else {
                        const basedeClientes = JSON.parse(contenido);

                        clienteAñad.cedula="1725054017"
                        clienteAñad.nombre="Ale"
                        clienteAñad.apellido="Yanez"

                        basedeClientes.push(clienteAñad);
                        fs.writeFile(
                            'clientes.json',
                            JSON.stringify(basedeClientes),
                            (err) => {
                                if (err) {
                                    reject("Error al añadir el cliente a  la base");
                                } else {
                                    resolve("Se ha añadido un cliente");
                                }
                            }
                        );
                    }
                });
        }
    );
}

