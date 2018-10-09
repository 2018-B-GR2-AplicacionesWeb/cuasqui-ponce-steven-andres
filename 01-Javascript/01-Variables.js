var nombreVariable = 'valorVariable';
var edad= 1; //number
var edad2 = '1'; //string
var casado = false; //boolean
var amigable = null; //??
var existeONo = undefined; //??
var fechaNacimiento = new Date('1997-01-22');

console.log('edad',typeof edad);
console.log('edad2',typeof edad2);
console.log('casado',typeof casado);
console.log('amigable',typeof amigable);
console.log('existeONo',typeof existeONo, existeONo);
console.log('fechaNacimiento',typeof fechaNacimiento, fechaNacimiento);

//Javascript
//var adrian={}; Objeto vacío
var adrian = {
    nombre:'Adrian',
    edad:29,
    hijos:undefined,
    llave:'valor',
};

console.log(adrian.nombre);
console.log(typeof adrian);

//Json
var adrianJSON ={
    "":""
};
//No Tipado: no tiene tipos
//var edad=10;
//Tipado:
//Int_edad=10