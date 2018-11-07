// 02-observables.ts
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const dist = require('rxjs/operators').distinct;
const concat = require('rxjs/operators').concat;
const numeros$ = rxjs.of(1, true, 2, 'Adrian', 3, { nombre: 'Adrian' }, 2, ['oli'], function () { });
console.log(numeros$);
numeros$
    .pipe(dist(), map((valorActual) => {
    return {
        data: valorActual
    };
}))
    .subscribe((ok) => {
    console.log('En ok', ok);
}, (error) => {
    console.log('Error:', error);
}, () => {
    console.log('Complete');
});
const promesita = (funciona) => {
    return new Promise((resolve, reject) => {
        if (funciona) {
            resolve(' :P ');
        }
        else {
            reject(' D: ');
        }
    });
};
const promesita$ = rxjs.from(promesita(true));
promesita$
    .subscribe((ok) => {
    console.log('Promesita bien', ok);
}, (error) => {
    console.log('Promesita mal', error);
}, () => {
    console.log('Completado');
});
const observableConcatenacion$ = numeros$
    .pipe(concat(promesita$), dist(), map((valorActual) => {
    return {
        data: valorActual
    };
}))
    .subscribe((ok) => {
    console.log('Concatenado', ok);
}, (error) => {
    console.log('Error', error);
}, () => {
    console.log('Completado');
});
console.log('salida: ');
