var rxjs = require('rxjs');
var observables$ = rxjs.of(1, 2, 3, 4, 5, 6);
numeros$
    .subscribe(function (ok) {
    console.log('En ok', ok);
}, function (error) {
    console.log('Error', error);
}, function () {
    console.log('Complete');
});
