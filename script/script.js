"use strict";
const title = document.getElementsByTagName("h1")[0];
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const plusBtn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalcountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  rollback: 0,
  title: "",
  screens: [],
  screenPrice: 0,
  screensCount: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  servicePercentPrice: 0,
  fullPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", appData.isReady);
    plusBtn.addEventListener("click", appData.addScreenBlock);
    inputRange.addEventListener("input", appData.addRollbackValue);
  },
  isReady: function () {
    screens = document.querySelectorAll(".screen");
    let completed = false;

    screens.forEach(function (screen) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      if (input.value !== "" && select.selectedIndex !== 0) {
        completed = true;
      } else {
        completed = false;
      }
    });
    if (completed) {
      appData.start();
    }
  },
  clear: function () {
    appData.screens = [];
    appData.screensCount = 0;
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.screensCount;
    totalCountOther.value =
      appData.servicePricesNumber + appData.servicePricesPercent;
    fullTotalCount.value = appData.fullPrice;
    totalcountRollback.value = appData.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value,
      });
      appData.screensCount += +input.value;
    });
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    const input = cloneScreen.querySelector("input");

    input.value = "";

    screens[screens.length - 1].after(cloneScreen);
  },
  addRollbackValue: function () {
    inputRangeValue.textContent = inputRange.value;
    appData.rollback = +inputRange.value;
    appData.servicePercentPrice =
      appData.fullPrice - (appData.fullPrice / 100) * appData.rollback;
    totalcountRollback.value = appData.servicePercentPrice;
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    // appData.logger();
    console.log(appData);
    appData.showResult();
    appData.clear();
  },
  logger: function () {
    for (let key in appData) {
      console.log(`Ключ: ${key}, Значение:${appData[key]}`);
    }
  },
  isNumber: function (num) {
    return num != null && !isNaN(parseFloat(num)) && isFinite(num);
  },
  isString: function (string) {
    return string != null && isNaN(string);
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, current) {
      return sum + current.price;
    }, 0);
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        (appData.screenPrice / 100) * appData.servicesPercent[key];
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber;

    appData.servicePercentPrice =
      appData.fullPrice - (appData.fullPrice / 100) * appData.rollback;
  },
};
appData.init();
