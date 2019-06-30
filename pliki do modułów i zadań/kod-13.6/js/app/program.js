'use scrict';
var EventEmitter = require("events").EventEmitter; //new
var OSinfo = require('../modules/OSinfo');

//new:
var emitter = new EventEmitter();
emitter.on("beforeCommand", function (instruction) {
    console.log('You wrote: ' + instruction + ', trying to run command');
});
emitter.on("afterCommand", function () {
    console.log('Finished command');
});

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function() {
    var input = process.stdin.read();
    if (input !== null) {
        var instruction = input.trim();
 // new: odpalanie zdarzenia beforeCommand (z parametrem)
        emitter.emit('beforeCommand', instruction);

        switch (instruction) {
            case '/exit':
                process.stdout.write('Quitting app!\n');
                process.exit();
                break;
            case '/sayhello':
                process.stdout.write('hello!\n');
                break;
            case '/getOSinfo':
                OSinfo.print();
                break;
            default:
                process.stderr.write('Wrong instruction! Choose /exit to quit. \n');
        };
// new: emitowanie zdarzenia afterCommand (bez parametru)
emitter.emit('afterCommand');
    }
});

