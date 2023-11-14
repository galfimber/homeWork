"use strict";

const rollback = 20;

let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let service2;
let servicePercentPrice;
let fullPrice;
let allServicePrices;

const isNumber = function (screenPrice) {
  return (screenPrice!=null && !isNaN(parseFloat(screenPrice)) && isFinite(screenPrice));
};

const asking = function () {
  title = prompt("Как называется ваш проект?");
  screens = prompt("Какие типы экранов нужно разработать?");
  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));
  screenPrice = Number(screenPrice);
  adaptive = confirm("Нужен ли адаптив на сайте?");
  console.log(showTypeOf(screenPrice));
  console.log(screenPrice);
};

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
  let sum = 0;
  let servicePrices;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
    }
    do {
      servicePrices = prompt("Сколько это будет стоить?");
    } while (!isNumber(servicePrices));
    servicePrices = Number(servicePrices);
    sum += servicePrices;
  }
  return sum;
};

const showTypeOf = function (variable) {
  return typeof variable;
};

function getFullPrice(screenPrice, allServicePrices) {
  return screenPrice + allServicePrices;
}

const getTitle = function (title) {
  title = title.trimStart().toLowerCase();
  return title.charAt(0).toUpperCase() + title.slice(1);
};

const getServicePercentPrices = function (fullPrice, rollback) {
  return fullPrice - (fullPrice / 100) * rollback;
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);

console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
