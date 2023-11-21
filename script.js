"use strict";

const appData = {
  rollback: 20,
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  services: {},
  servicePercentPrice: 0,
  fullPrice: 0,
  allServicePrices: 0,
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
    appData.getTitle();
    appData.logger();
  },
  logger: function () {
    for (let key in appData) {
      console.log(`Ключ: ${key}, Значение:${appData[key]}`);
    }
  },
  asking: function () {
    do {
      appData.title = prompt("Как называется ваш проект?");
    } while (!appData.isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let name ="";
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!appData.isString(name));
      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));
      price = +price;
      appData.screens.push({ id: i, name: name, price: price });
    }
    for (let i = 0; i < 2; i++) {
      let name ="";
      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (!appData.isString(name));
      let price = 0;
      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));
      appData.services[`${name}-${i + 1}`] = +price;
    }
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNumber: function (num) {
    return num != null && !isNaN(parseFloat(num)) && isFinite(num);
  },
  isString: function (string) {
    return string != null && isNaN(string);
  },
  getRollbackMessage: function () {
    switch (true) {
      case appData.fullPrice >= 30000:
        return "Даем скидку в 10%";
      case appData.fullPrice >= 15000:
        return "Даем скидку в 5%";
      case appData.fullPrice < 15000 && 0 <= appData.fullPrice:
        return "Скидка не предусмотрена";
      default:
        return "Что то пошло не так";
    }
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, current) {
      return sum + current.price;
    }, 0);
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  getTitle: function () {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substring(1).toLowerCase();
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice =
      appData.fullPrice - (appData.fullPrice / 100) * appData.rollback;
  },
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },
  showTypeOf: function (variable) {
    return typeof variable;
  },
};
appData.start();
