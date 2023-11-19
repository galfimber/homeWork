"use strict";

const appData = {
  rollback: 20,
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  service1: "",
  service2: "",
  servicePercentPrice: 0,
  fullPrice: 0,
  allServicePrices: 0,
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(
      appData.screenPrice,
      appData.allServicePrices
    );
    appData.servicePercentPrice = appData.getServicePercentPrices(
      appData.fullPrice,
      appData.rollback
    );
    appData.title = appData.getTitle();
    appData.logger();
  },
  logger: function () {
    console.log(appData.showTypeOf(appData.title));
    console.log(appData.showTypeOf(appData.fullPrice));
    console.log(appData.showTypeOf(appData.adaptive));
    console.log(appData.screens.toLowerCase().split(", "));
    console.log(appData.getRollbackMessage());
    console.log(appData.servicePercentPrice);
    for (let key in appData) {
      console.log(`Ключ: ${key}, Значение:${appData[key]}`);
    }
  },
  asking: function () {
    appData.title = prompt("Как называется ваш проект?");
    appData.screens = prompt("Какие типы экранов нужно разработать?");
    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNumber(appData.screenPrice));
    appData.screenPrice = Number(appData.screenPrice);
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNumber: function () {
    return (
      appData.screenPrice != null &&
      !isNaN(parseFloat(appData.screenPrice)) &&
      isFinite(appData.screenPrice)
    );
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
  getAllServicePrices: function () {
    let sum = 0;
    let servicePrices;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }
      do {
        servicePrices = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(servicePrices));
      servicePrices = Number(servicePrices);
      sum += servicePrices;
    }
    return sum;
  },
  getTitle: function () {
    appData.title = appData.title.trimStart().toLowerCase();
    return appData.title.charAt(0).toUpperCase() + appData.title.slice(1);
  },
  getServicePercentPrices: function () {
    return appData.fullPrice - (appData.fullPrice / 100) * appData.rollback;
  },
  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },
  showTypeOf: function (variable) {
    return typeof variable;
  },
};
appData.start();
