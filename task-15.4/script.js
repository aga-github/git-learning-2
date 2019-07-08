/*
Zadanie 1
Połączenie dwóch stringów przy użyciu operatora + jest bardzo łatwym 
zadaniem. Innym sposobem jest użycie metody concat albo join, 
ale co jeśli nie moglibyśmy skorzystać z żadnej z tych opcji? 
Twoim zadaniem będzie stworzenie dwóch zmiennych z wartościami 
Hello oraz World, a następnie połączenie ich metodą inną niż 
wymienione powyżej.
*/
const a  = 'Hello';
const b = 'World!';

console.log(`${a} ${b}`);

/*
Zadanie 2
Stwórz funkcję multiply, która ma zwracać wynik działania operacji 
mnożenia dwóch wartości a i b. Przykładowo:

multiply(2, 5) // 10
multiply(6, 6) // 36
Jeśli użytkownik poda na wejściu tylko jedną wartość- przykładowo:
multiply(5) // 
to drugi parametr ma zostać zastąpiony 1. 
Nie wolno korzystać z instrukcji warunkowych! 
Funkcję stwórz za pomocą arrow function.
*/

const multiply = (a, b = 1) => a * b;

console.log(multiply(10, 5));
console.log(multiply(10, 8));
console.log(multiply(27));

/*
Zadanie 3
Napisz funkcję average, która obliczy średnią arytmetyczną 
wszystkich argumentów, które zostaną do niej przekazane. 
Załóż, że argumenty zawsze będą liczbami:

average(1) // 1
average(1, 3) // 2
average(1, 3, 6, 6) // 4
Skorzystaj z rest parameters! Funkcję stwórz za pomocą arrow function.

Zadanie 4
Stwórz tablicę z ocenami const grades = [1, 5, 5, 5, 4, 3, 3, 2, 1], 
a następnie przekaż oceny do funkcji average tak, aby otrzymać wynik. 
Skorzystaj z operatora spread!
*/

const grades = [1, 5, 5, 5, 4, 3, 3, 2, 1]

const average = (...args) => {
  
  let elements = [];
  args.forEach(arg => elements.push(arg));
  let total = elements.reduce((a,b) => { return a + b; });
  console.log(total/elements.length); 
}

average(4,5);

average(...grades);

/* 
Zadanie 5
Podczas pracy nad projektem natknąłeś się na bardzo dziwną strukturę danych - 
[1, 4, 'Iwona', false, 'Nowak']. Twoim zadaniem jest skorzystanie 
z destrukturyzacji w celu wyciągnięcia z tablicy zmiennych firstname oraz lastname.
*/

const data = [1, 4, 'Iwona', false, 'Nowak'];
const [ , ,third, ,fifth] = data;
const firstName = third;
const lastName = fifth;

console.log(`Hello, ${firstName} ${lastName}, how are you doing today?`);
