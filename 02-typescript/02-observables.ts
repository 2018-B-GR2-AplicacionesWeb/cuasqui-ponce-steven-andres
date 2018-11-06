declare var require:any;
const rxjs = require('rxjs');
declare var numeros$:any;

const observables$ = rxjs.of(1,2,3,4,5,6);
numeros$
    .subscribe(
        (ok)=>{
            console.log('En ok',ok);
        },
        (error)=>{
            console.log('Error',error)
        },
        ()=>{
            console.log('Complete');
        }

    );