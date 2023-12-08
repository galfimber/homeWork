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
const select = document.querySelector(".main-controls__select > select");
const inputCount = document.querySelector(".main-controls__input > input");

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
    this.addTitle();
    startBtn.addEventListener("click", this.isReady);
    resetBtn.addEventListener("click", this.reset);
    plusBtn.addEventListener("click", this.addScreenBlock);
    inputRange.addEventListener("input", this.addRollbackValue.bind(appData));
  },
  isReady: function () {
    screens = document.querySelectorAll(".screen");
    let completed = false;

    screens.forEach(() => {
      if (inputCount.value !== "" && select.selectedIndex !== 0) {
        completed = true;
      } else {
        completed = false;
      }
    });
    if (completed) {
      startBtn.style.display = "none";
      resetBtn.style.display = "block";
      screens.forEach((item) => {
        item.querySelector(".main-controls__select > select").disabled = true;
        item.querySelector(".main-controls__input > input").disabled = true;
      });
      appData.start();
    }
  },
  reset: function () {
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
    screens.forEach((item) => {
      item.querySelector(".main-controls__select > select").disabled = false;
      item.querySelector(".main-controls__input > input").disabled = false;
    });

    select.selectedIndex = select.options[0];
    inputCount.value = "";
    otherItemsPercent.forEach((item) => {
      item.querySelector("input").checked = false;
    });
    otherItemsNumber.forEach((item) => {
      item.querySelector("input").checked = false;
    });
    inputRange.value = 0;
    for (let i = 1; i < screens.length; i++) {
      screens[i].remove();
    }
    appData.clear();

    appData.showResult();
  },
  clear: function () {
    this.rollback = 0;
    this.title = "";
    this.screenPrice = 0;
    this.screensCount = 0;
    this.screens = [];
    this.adaptive = true;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.servicePercentPrice = 0;
    this.fullPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.screensCount;
    totalCountOther.value =
      this.servicePricesNumber + this.servicePricesPercent;
    fullTotalCount.value = this.fullPrice;
    totalcountRollback.value = this.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value,
      });
      this.screensCount += +input.value;
    });
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
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
    this.rollback = +inputRange.value;
    this.servicePercentPrice =
      this.fullPrice - (this.fullPrice / 100) * this.rollback;
    totalcountRollback.value = this.servicePercentPrice;
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    // appData.logger();
    console.log(this);
    this.showResult();
    this.clear.bind(appData);
  },
  logger: function () {
    for (let key in this) {
      console.log(`Ключ: ${key}, Значение:${this[key]}`);
    }
  },
  isNumber: function (num) {
    return num != null && !isNaN(parseFloat(num)) && isFinite(num);
  },
  isString: function (string) {
    return string != null && isNaN(string);
  },
  addPrices: function () {
    this.screenPrice = this.screens.reduce((sum, current) => {
      return sum + current.price;
    }, 0);
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        (this.screenPrice / 100) * this.servicesPercent[key];
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrice =
      this.fullPrice - (this.fullPrice / 100) * this.rollback;
  },
};
appData.init();
