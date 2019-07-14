var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.send('Hello world');
});

/*
Powyższy kod rejestruje pierwszy routing 
(proces przetwarzania otrzymanego adresu 
żądania i na jego podstawie decydowanie, 
co powinno zostać uruchomione) na wysłane 
żądanie GET po wejściu na stronę główną 
( http://localhost:3000/ ). 
Jako callback na wystąpienie tego zdarzenia 
wywoływana jest funkcja, która w przypadku 
udanej odpowiedzi wyśle wiadomość Hello world.

*/

var server = app.listen(3000, function() {
    console.log('Przykładowa aplikacja nasłuchuje na http://localhost:3000');
});