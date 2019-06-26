// 13.4.2. Tworzenie własnych modułów:

var os = require('os');

function getOSinfo() {
    var type = os.type();
    if(type === 'Darwin') {
        type = 'OSX';
    } else if(type === 'Windows_NT') {
        type = 'Windows';
    }
    var release = os.release();
    var cpu = os.cpus()[0].model;
    var uptime = os.uptime();
    var userInfo = os.userInfo();
    console.log('System:', type);
    console.log('Release:', release);
    console.log('CPU model:', cpu);
    console.log('Uptime: ~', (uptime / 60).toFixed(0), 'min');
    console.log('User name:', userInfo.username);
    console.log('Home dir:', userInfo.homedir);
}

exports.print = getOSinfo;

/*  

Tworzenie własnych modułów
==========================
Własne moduły można tworzyć na wiele sposobów. 
Nie przedłużając, przejdźmy od razu do rozwiązania zadania z poprzedniego przykładu, 
wyjaśniając przy okazji w jaki sposób można eksportować moduły:

Pierwszym krokiem będzie stworzenie osobnego pliku z modułem. 
Plik może się nazywać np. OSinfo.js. Następnie będzie trzeba przenieść funkcję getOSinfo() 
oraz import modułu os do stworzonego pliku. Na samym końcu dodamy do naszego pliku następującą linijkę: 
exports.print = getOSinfo;

Tutaj zatrzymamy się na chwilkę. Wydzielony moduł może przybierać kilka postaci. 
Jeśli eksportujemy pojedynczą funkcję, możemy przypisać ją w powyższy sposób. 
Podobnie (co za chwilę pokażemy) możemy wyeksportować więcej funkcji. 
Musimy je wyeksportować, ponieważ wszystko co znajduje się wewnątrz pliku jest widoczne tylko dla 
kodu znajdującego się w tym pliku (działa to podobnie jak zakres funkcji). Z poziomu innych plików 
(np. naszego program.js) będziemy wywoływać nasz moduł za pomocą require(), ale widoczne będzie tylko to, 
co zostało wyeksportowane - innymi słowy, wszystko z naszego modułu, z czego chcemy skorzystać w innym pliku, 
musi być przypisane do obiektu exports.

W powyższym przykładzie zależy nam na udostępnieniu funkcji getOSinfo. 
Standardowo moduł ma czytelnie komunikować czym się zajmuje - dlatego w naszym przypadku zarówno nazwa pliku 
jak i modułu to OSinfo. Nie miałoby jednak sensu wywoływanie naszej funkcji za pomocą odwołania 
OSinfo.getOSinfo i z tego względu nazwą eksportowanej funkcji będzie print() - 
to dlatego zastosowaliśmy exports.print = getOSinfo;.

Po wyeksportowaniu i zaimportowaniu w innym module, będziemy korzystać z niej w następujący sposób:

OSinfo.print();
Możesz to sobie skojarzyć z przypisywaniem eksportowanych wartości do zmiennej, 
którą 'wyciągasz' z modułu za pomocą require() i później możesz ją normalnie wykorzystywać - 
mam nadzieję, że pamiętasz, że wartościami w zmiennych w JavaScripcie mogą być także funkcje :)

Zależało mi w tym miejscu, aby pokazać, że to co znajduje się po lewej stronie znaku równości 
jest widoczne w innych modułach:

exports.print = getOSinfo;
Całość powinna wyglądać tak:

var os = require('os');

function getOSinfo() {
    var type = os.type();
    if(type === 'Darwin') {
        type = 'OSX';
    } else if(type === 'Windows_NT') {
        type = 'Windows';
    }
    var release = os.release();
    var cpu = os.cpus()[0].model;
    var uptime = os.uptime();
    var userInfo = os.userInfo();
    console.log('System:', type);
    console.log('Release:', release);
    console.log('CPU model:', cpu);
    console.log('Uptime: ~', (uptime / 60).toFixed(0), 'min');
    console.log('User name:', userInfo.username);
    console.log('Home dir:', userInfo.homedir);
}

exports.print = getOSinfo;
Jeśli chcielibyśmy eksportować więcej niż jedną część z jednego pliku, należy albo użyć konstrukcji.

exports.print = getOSinfo;
exports.getCPUDetails = getCPUDetails;
albo

module.exports = {
    print: getOSinfo,
    getCPUDetails: getCPUDetails
};
Oba zapisy są równoznaczne przy czym exports i module.exports to dwa różne obiekty 
(dwie różne referencje) i trzeba ich używać zgodnie z powyższymi przykładami.

*/