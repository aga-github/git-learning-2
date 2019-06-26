process.stdin.setEncoding('utf-8');

process.stdin.on('readable', function() {
// metoda .read() ma za zadanie 
// odczytać co użytkownik podał na wejściu
    var input = process.stdin.read();
    if(input !== null) {
        // teraz jest sens cokolwiek wyświetlać :)
            process.stdout.write(input);
    }
});