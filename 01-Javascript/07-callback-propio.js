const fs = require('fs')
let contenidofinal = 'Inicial'
function appendFile(nombreArchivo,contenidoArchivo,callback){
    fs.readFile(nombreArchivo,'utf-8',(error,contenidoLeido)=>{
            if(error){
                const contenido = contenidoArchivo
                fs.writeFile(nombreArchivo, contenido,
                    (err)=>{
                        if(err){
                            callback(err)
                        }else{
                            callback(undefined,contenido)

                        }
                    }
                )
            }else{
                const contenido=contenidoLeido+contenidoArchivo
                fs.writeFile(nombreArchivo, contenido,
                    (err)=>{
                        if(err){
                            callback(err)
                        }else{
                            callback(undefined,contenido)

                        }
                    }
                )
            }

        }
    )
}

appendFile('07-texto.txt','\nAdios',(error,contenidoTexto)=>{
    if(error){
        console.log(error)
    } else{
        console.log(contenidoTexto)
    }
})


//['A','B','C']
//0-A.txt 'A'
//1-B.txt   'B'
//2-C.txt   'C'

const respuesta={
    nombreArchivo:'',
    contenidoArchivo:'',
    error: undefined
}

function ejercicio(arregloStrings,callback){
    const arregloRespuestas = [];
    arregloStrings.forEach(
        (string, indice)=>{
            const nombreArchivo = `${indice}-${string}.txt`;
            const contenidoArchivo = string;

            fs.writeFile(nombreArchivo, contenidoArchivo,
                (err)=>{
                    const respuesta={
                        nombreArchivo:nombreArchivo,
                        contenidoArchivo:contenidoArchivo,
                        error: err
                    }
                    arregloRespuestas.push(respuesta)
                    const terminoElArreglo = arregloStrings.length == arregloRespuestas.length;
                    if(terminoElArreglo){
                        callback(arregloRespuestas);
                    }
            }
            )


        }
    )
}

ejercicio(['A','B','c'],(arregloRespuestas)=>{
    console.log(arregloRespuestas);
});