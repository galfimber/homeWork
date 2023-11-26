const divBooks = document.querySelector(".books");
const books = document.querySelectorAll(".book");
let booksArr = []; //Массив для элементов nodelist books
let indexA = 0; //индекс символа номера книги А
let indexB = 0; //индекс символа номера книги Б
const backgroundImg = "url(./image/you-dont-know-js.jpg)";
const adv = document.querySelector(".adv");

//Функция правила сортировки массива html элементов books
function compareNumericForBook(a, b) {
  //индекс символа номера книги А
  indexA =
    a.querySelector("h2").textContent[
      +a.querySelector("h2").textContent.indexOf(".") - 1
    ];
  //индекс символа номера книги Б
  indexB =
    b.querySelector("h2").textContent[
      +b.querySelector("h2").textContent.indexOf(".") - 1
    ];
  if (indexA > indexB) return 1;
  if (indexA == indexB) return 0;
  if (indexA < indexB) return -1;
}

//Функция получение элементов из nodelist в обычный массив(Чтобы потом применить метод sort())
const indexArr = function (arr) {
  for (let book of arr) {
    booksArr.push(book);
  }
};

indexArr(books); //Получение массива индексов номера книг
booksArr.sort(compareNumericForBook); //Сортировка массива booksArr

//1.
//Вывод восстановленного порядка книг
for (let book of booksArr) {
  divBooks.append(book);
}

//2.
document.body.style.backgroundImage = backgroundImg;

//3.
booksArr[2].querySelector("h2 > a").textContent =
  "Книга 3. this и Прототипы Объектов";

//4.
adv.remove();

//5.
//Сортировка глав Книга 2
const bookList2 = booksArr[1].querySelector("ul");
const chapters2 = booksArr[1].querySelectorAll("li");
bookList2.append(chapters2[0]);
bookList2.append(chapters2[1]);
bookList2.append(chapters2[3]);
bookList2.append(chapters2[6]);
bookList2.append(chapters2[8]);
bookList2.append(chapters2[4]);
bookList2.append(chapters2[5]);
bookList2.append(chapters2[7]);
bookList2.append(chapters2[9]);
bookList2.append(chapters2[2]);
bookList2.append(chapters2[10]);

//Сортировка глав Книга 5
const bookList5 = booksArr[4].querySelector("ul");
const chapters5 = booksArr[4].querySelectorAll("li");
bookList5.append(chapters5[0]);
bookList5.append(chapters5[1]);
bookList5.append(chapters5[9]);
bookList5.append(chapters5[3]);
bookList5.append(chapters5[4]);
bookList5.append(chapters5[2]);
bookList5.append(chapters5[6]);
bookList5.append(chapters5[7]);
bookList5.append(chapters5[5]);
bookList5.append(chapters5[8]);
bookList5.append(chapters5[10]);

//6. 
const chapters6 = books[2].querySelectorAll("li");
const elem8 = chapters6[8].cloneNode(true);
elem8.textContent = "Глава 8: За пределами ES6";
chapters6[8].append(elem8);
