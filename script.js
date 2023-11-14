"use strict";

let title = prompt("Как называется ваш проект?");

const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");

const rollback = 20;

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

const getAllServicePrices = function (servicePrice1, servicePrice2) {
  return servicePrice1 + servicePrice2;
};

const showTypeOf = function (variable) {
  return typeof variable;
};

function getFullPrice (screenPrice, allServicePrices) {
  return screenPrice + allServicePrices;
};

const getTitle = function (title) {
  title = title.trimStart().toLowerCase();
  return title.charAt(0).toUpperCase() + title.slice(1);
};

const getServicePercentPrices = function(fullPrice, rollback){
    return fullPrice - (fullPrice / 100 * rollback);
}

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
const fullPrice = getFullPrice(screenPrice, allServicePrices);
const servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);

console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);

