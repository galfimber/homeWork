"use strict";

let title = prompt("Как называется ваш проект?");

const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");

const rollback = 2000;

const getRollbackMessage = function (price) {
  switch (true) {
    case price >= 30000:
      return "Даем скидку в 10%";
    case price >= 15000:
      return "Даем скидку в 5%";
    case price < 15000 && 0 <= price:
      return "Скидка не предусмотрена";
    default:
      return "Что то пошло не так";
  }
};

const getAllServicePrices = function (service1, service2) {
  return service1 + service2;
};

const showTypeOf = function (variable) {
  return typeof variable;
};

const getFullPrice = function (screenPrice, allServicePrices) {
  return screenPrice + allServicePrices;
};

const getTitle = function (title) {
  title = title.trimStart().toLowerCase();
  return title.charAt(0).toUpperCase() + title.slice(1);
};

const getServicePercentPrices = function(fullPrice, rollback){
    return fullPrice - rollback;
}

const servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
const allServicePrices = getAllServicePrices(service1, service2);
const fullPrice = screenPrice + allServicePrices;
title = getTitle(title);

console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);

