function sumarDosNumeros(numeroUno, numeroDos){
    var numeroUnoEsNumber=typeof  numeroUno=="number";
    var numeroDosEsNumber=typeof  numeroDos=="number";
    if(numeroDosEsNumber && numeroDosEsNumber){
        return numeroUno + numeroDos;
    }else{
        return 0;
    }

}
//Envio otros parametros
console.log(sumarDosNumeros('a',null));
//no envio parametros
console.log(sumarDosNumeros());
//envio parametros extra
console.log(sumarDosNumeros(1,2,3,4,5,6));
//envio los parametros correctos
console.log(sumarDosNumeros(2,3));

function saludar(){
    console.log('Hola a todos');
}
console.log(saludar());

function sumarNumeros(...parametros){
        console.log(parametros);
        var long=parametros.length
}

sumarNumeros(1,2,3,4)

function saludarnombre(nombre,funcionMensajeria){
    var saludo = `Hola ${nombre.toUpperCase()}`;
    funcionMensajeria(saludo);
    return saludo;
}

function imprimirConsola(texto){
    console.log(texto);
}

saludarnombre("Steven",imprimirConsola);