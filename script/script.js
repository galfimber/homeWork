const title = document.getElementsByTagName("h1")[0];
const btns = document.getElementsByClassName("handler_btn");
const plus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback > * > input");
const spanRange = document.querySelector(".rollback > * > .range-value");
let totalInput = [];
let screen = document.querySelectorAll(".screen");

for (
  let i = 0;
  i < document.getElementsByClassName("total-input").length;
  i++
) {
  totalInput[i] = document.getElementsByClassName("total-input")[i];
}
