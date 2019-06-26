

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function() {
    var input = process.stdin.read();
    if(input !== null) {
        var instruction = input.trim();
        switch(instruction) {
            case '/exit':
                process.stdout.write('Quitting app!\n');
                process.exit();
                break;
            case '/sayhello':
                process.stdout.write('hello!\n');
                break;

            case '/ver':
                process.stdout.write('Wersja node to: (patrz na linijkę nr 2) \n');
                console.log(process.versions);
                break;
                    
            case '/lang':
                process.stdout.write('Info o języku jest gdzieś tu poniżej- szukaj LANG: \n');
                console.log(process.env);        
                break;
            default:
                process.stderr.write('Wrong instruction!\n');
        };
    }
});


//console.log(process.versions);
//console.log(process.env);