var os = require('os');

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
            case '/getOSinfo':
                var type = os.type();
                var release = os.release();
                if(type === 'Darwin') {
                    type = 'OSX';
                } else if(type === 'Windows_NT') {
                    type = 'You have got Windows!';
                }
                console.log('System:', type);
                console.log('Release:', release);
                var cpu = os.cpus()[0].model;
                console.log('CPU model:', cpu);
                var uptime = os.uptime();
                console.log('Uptime: ~', (uptime / 60).toFixed(0), 'min');
                var userInfo = os.userInfo();
                console.log('User name:', userInfo.username);
                console.log('Home dir:', userInfo.homedir);
                break;       
            default:
                process.stderr.write('Wrong instruction!\n');
        };
    }
});



