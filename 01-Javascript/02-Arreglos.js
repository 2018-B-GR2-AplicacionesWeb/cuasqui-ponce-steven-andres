var arreglo=[
    1,
    2.2,
    "Hola",
    true,
    false,
    {},
    undefined,
    null,
    []
];

var arregloNUmeros=[1,2,3];
arregloNUmeros[0]; //1
arregloNUmeros[2]; //3
console.log(arregloNUmeros[4]);

arregloNUmeros.push(8);
console.log(arregloNUmeros);

arregloNUmeros.pop();
console.log(arregloNUmeros);

arregloNUmeros.splice(0,0,0);
console.log(arregloNUmeros);

arregloNUmeros.splice(2,0,1.5);
console.log(arregloNUmeros);

var usuario = 1.5;
console.log(arregloNUmeros.indexOf(1.5));
var indiceUsuario = arregloNUmeros.indexOf(usuario);
arregloNUmeros.splice(indiceUsuario,1);
console.log(arregloNUmeros);


console.log(arregloNUmeros.slice(0,3));

var arregloNotasPrimerBimestre = [8.5,9,4];
var arregloNotasSegundoBimestre = [8.5,9,4];
//Desctructuración de arreglos:
var arreglofinal = [...arregloNotasPrimerBimestre,...arregloNotasSegundoBimestre];
console.log(arreglofinal);
//Destructuracion de objetos:
var steven2018A={
    sexualidad:0,
    web:7
};

var steven2018B={
  musica:7,
  moviles:8
};

var steven = {
    ...steven2018A,
    ...steven2018B
};

console.log('steven',steven);