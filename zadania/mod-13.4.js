// 13.4.1. Korzystanie z modułów:

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
                getOSinfo();
                break;
                /* MNIEJ ELEGANCKA & DŁUŻSZA WERSJA
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
                console.log('Uptime: ~', (uptime / 60).toFixed(0), 'sek.');
                var userInfo = os.userInfo();
                console.log('User name:', userInfo.username);
                console.log('Home dir:', userInfo.homedir);
                break;  
                */     
            default:
                process.stderr.write('Wrong instruction!\n');
        };
// BARDZIEJ CZYTELNA WERSJA, Z FUNKCJĄ NA DOLE, A WYWOŁANIEM FUNKCJI W CASE POWYŻEJ:
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
    }
});

/*

Korzystanie z modułów
=====================
Napiszmy prostą aplikację, która korzysta z modułu os. Moduł ten dostarcza 
różne użyteczne metody związane z systemem operacyjnym. 
Aplikacja będzie rozszerzeniem poprzedniej i ma za zadanie wyświetlić informacje 
na temat komputera z którego korzysta użytkownik w czytelnej formie.

Na początku musimy zaimportować ów moduł za pomocą następującego fragmentu kodu: 
var os = require('os');

Moduły najlepiej importować na samej górze pliku, żebyśmy od razu wiedzieli 
z jakich modułów korzystamy.

Od tej chwili możemy używać jego funkcjonalności. 
Dokumentację do omawianego modułu znajdziesz w tym miejscu:
https://nodejs.org/api/os.html#os_os_userinfo_options

Ok, wracając do naszej aplikacji - powinna ona do tej pory wyglądać mniej więcej tak:

var os = require('os');

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function() {
    var input = process.stdin.read();
    if(input !== null) {
        var instruction = input.trim();
        switch(instruction) {
            case '/exit':
                process.stdout.write('Quitting app!\n'');
                process.exit();
                break;
            case '/sayhello':
                process.stdout.write('hello!\n');
                break;
            default:
                process.stderr.write('Wrong instruction!\n');
        };
    }
});
Dopiszmy teraz do niej prostą komendę /getOSinfo.

Zaczniemy od dopisania kolejnej opcji instrukcji switch, która poprawnie 
zinterpretuje zadaną komendę.

case '/sayhello':
    process.stdout.write('hello!\n');
    break;
case '/getOSinfo':
    process.stdout.write('Tutaj będzie info o systemie!\n');
    break;
Kiedy wpiszemy komendę /getOSinfo na naszym ekranie powinna pojawić się wiadomośc: 
'Tutaj będzie info o systemie!'

Zamieńmy ją na bardziej sensowną informację i zamiast kodu 
process.stdout.write('Tutaj będzie info o systemie!\n'); umieśćmy kod, który znajduje się poniżej. 
Zacznijmy od wyświetlenia systemu operacyjnego i jego wersji (tak jak na powyższym obrazku):

var type = os.type();
var release = os.release();
if(type === 'Darwin') {
    type = 'OSX';
} else if(type === 'Windows_NT') {
    type = 'Windows';
}
console.log('System:', type);
console.log('Release:', release);
UWAGA: zauważ, że używam zamiennie process.stdout i console.log. Nie są to jednak funkcje, 
które działają tak samo. Różnią się jedynie tym, że console.log zawsze stawia na końcu znak nowej linii (\n). 
Można poniekąd przyjąć, że:

console.log = function(d) {
    process.stdout.write(d + '\n');
};
Wracając do naszej mini aplikacji, dlaczego napisaliśmy taki fragment kodu?
W dokumentacji modułu OS metoda type może zwrócić trzy wartości:

Darwin - dla systemów Apple (takich jak OS X)
Linux - dla systemów Linuxowych
Windows_NT - dla systemów Windows
Darwin i Windows_NT - są to tzw. podstawy systemów operacyjnych. 
Dla zwykłego użytkownika mogą być średnio czytelne, więc zamieniamy je na ich odpowiedniki - 
OS X dla Darwin'a i Windows dla Windows_NT (tutaj bardziej chodzi o kwestię estetyki).

Teraz dodajmy informację o procesorze. Tutaj także jest mała pułapka - spójrzmy w dokumentację:

Okazuje się, że metoda .cpus() zwraca informację o wszystkich rdzeniach w postaci tablicy “procesorów", 
która wygląda następująco:
{
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 252020,
      nice: 0,
      sys: 30340,
      idle: 1070356870,
      irq: 0
    }

Nam potrzebna jest tylko informacja o modelu procesora. 
Wystarczy więc, że po pobraniu informacji o procesorach odniesiemy się do np. pierwszego elementu tablicy, 
a konkretniej do jego modelu:

var cpu = os.cpus()[0].model;
console.log('CPU model:', cpu);
Kolejnym elementem informacji o systemie będzie czas jego działania (od ostatniego uruchomienia).

W dokumentacji jest napisane, że czas podawany jest w sekundach. 
Nam nie zależy na aż tak dokładnym szacunku. Wystarczy, że wyświetlimy czas w minutach:

var uptime = os.uptime();
console.log('Uptime: ~', (uptime / 60).toFixed(0), 'min');
Jak widzisz podzieliliśmy czas na 60, a następnie zaokrągliliśmy uzyskany wynik do 0 miejsc po przecinku.

Ostatnim krokiem jest wyciągnięcie informacji na temat użytkownika systemu.

Odnosząc się do dokumentacji widzimy, że metoda .userinfo() zwraca obiekt, z różnymi informacjami. 
Nas interesują tylko dane związane z nazwą użytkownika i lokalizacją jego katalogu domowego:

var userInfo = os.userInfo();
console.log('User name:', userInfo.username);
console.log('Home dir:', userInfo.homedir);
Dane te znajdziemy odwołując się do odpowiednich kluczy obiektu userinfo (username i homedir).

Nasza instrukcja wygląda dosyć topornie. W case /getOSinfo znajduje się około 17 linii kodu - 
to zdecydowanie za dużo.

Nasz kod wyglądałby o niebo lepiej, jeśli wyciągniemy zawartość /getOSinfo do osobnej funkcji:

Napiszmy ją na samym dole pliku i przenieśmy do niej kawałek kodu z case'a:

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
Teraz wywołajmy funkcję:

case '/getOSinfo':
    getOSinfo();
break;
Jest dużo czyściej, prawda? Tak, ale nasz plik zaczyna się coraz bardziej rozrastać. 
W zasadzie to moglibyśmy wydzielić część kodu odpowiedzialnego za generowanie informacji o systemie 
do własnego modułu. Jest to niezależna funkcjonalność i możemy ją śmiało wynieść w osobne miejsce.

*/

