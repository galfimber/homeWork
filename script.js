"use strict";
const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");

const rollback = 2000;

const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.ceil(fullPrice - rollback);
console.log(servicePercentPrice);
switch(true){
    case fullPrice >= 30000:
        console.log("Даем скидку в 10%");
        break
    case fullPrice >= 15000:
        console.log("Даем скидку в 5%");
        break
    case fullPrice < 15000 && 0 < fullPrice:
        console.log("Скидка не предусмотрена");
        break
    default:
        console.log("Что то пошло не так");
}

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));
