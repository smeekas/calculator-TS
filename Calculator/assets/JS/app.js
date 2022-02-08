"use strict";
//   ALL VARIALBES USED IN JAVASCRIPT
const input = document.querySelector("#input").children[0];
console.log(input); //!
let degreeToRadian = true;
let disabledMemory = true;
const disabledStyle = ` color: gray;
cursor: not-allowed;`;
const enabledStyle = `cursor:pointer;color:black;`;
let memoryPositiveValue = 0, memoryNegativeValue = 0;
function numberFormat(input) {
    return input.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
function getInputValue() {
    let currentValue = input.innerText.replace(/,/g, "");
    return currentValue;
}
//---------------------------QUERY SELECTORS-------------------------//
//  upper control
const degreeRadianText = document.querySelector("#deg");
//  middle control
const memoryRecall = document.querySelector("#mr");
const memoryClear = document.querySelector("#mc");
const memoryPositive = document.querySelector("#mp");
const memoryNegative = document.querySelector("#mn");
const memoryStart = document.querySelector("#ms");
//  middle control
/**
 * @event memoryStart
 * @description start memory function and enable memory recall and memory clear
 */
memoryStart.addEventListener("click", () => {
    disabledMemory = false;
    memoryClear.setAttribute("style", enabledStyle);
    memoryRecall.setAttribute("style", enabledStyle);
    memoryClear.addEventListener("click", memoryClearEvent);
});
/**
 * @event memoryPositive
 * @description store result in positive manner
 */
memoryPositive.addEventListener("click", () => {
    if (disabledMemory) {
        memoryStart.click();
    }
    const inputValue = eval(getInputValue());
    if (isNaN(inputValue)) {
        memoryPositiveValue = 0;
    }
    else {
        memoryPositiveValue = eval(getInputValue());
    }
    input.textContent = "";
});
/**
 * @event memoryNegative
 * @description store result in negative manner
 */
memoryNegative.addEventListener("click", () => {
    if (disabledMemory) {
        memoryStart.click();
    }
    const inputValue = eval(getInputValue());
    if (isNaN(inputValue)) {
        memoryNegativeValue = 0;
    }
    else {
        memoryNegativeValue = eval(getInputValue());
    }
    input.textContent = "";
});
/**
 * @event memoryRecall
 * @description add both memory plus and memory minus varialbe and display the result
 */
memoryRecall.addEventListener("click", () => {
    // if (typeof memoryPositiveValue === typeof memoryNegativeValue && typeof memoryPositiveValue === "number") {
    input.textContent = numberFormat((memoryPositiveValue - memoryNegativeValue).toString());
    // }
});
/**
 * @function equal
 * @description evaluate expression and display the result
 */
function equal() {
    const inputValue = getInputValue();
    const answer = eval(inputValue);
    //if answer has more decimal digits then limit it to 5.
    if (declen(answer)) {
        input.textContent = numberFormat(answer.toFixed(5));
        return;
    }
    input.textContent = numberFormat(answer.toString());
}
//  event listener on back and clear button
/**
 * @function backspace
 * @description clear one letter from back
 */
function backspace() {
    input.textContent = numberFormat(input.textContent.slice(0, input.textContent.length - 1));
}
/**
 * @function clearInput
 * @description clear whole display
 */
function clearInput() {
    input.textContent = "";
}
// plusminus: change sign of number
/**
 * @function plusMinus
 * @description change sign of the number
 */
function plusminus() {
    //if input is in exponential form then change sign accordingly
    if (input.textContent.includes("e")) {
        const arr = input.textContent.split("e");
        arr[1] = (parseInt(arr[1]) * -1).toString();
        input.textContent = `${arr[0]}e${arr[1]}`;
        return;
    }
    input.textContent = (Number(getInputValue()) * -1).toString();
}
//  first line
// PI: display PI(3.14159)
/**
 * @function pi
 * @description display PI (3.14159)
 */
function pi() {
    if (input.textContent.length === 0) {
        input.textContent = Math.PI.toString();
    }
    else {
        input.textContent += Math.PI.toFixed(3);
    }
}
// natural: display e(2.71828)
/**
 * @function natural
 * @description display e(2.71828)
 */
function natural() {
    input.textContent = Math.E.toString();
}
//  second line
/**
 * @function square
 * @description squares the input number
 */
function square() {
    const inputValue = Number(getInputValue());
    input.textContent = numberFormat((inputValue * inputValue).toString());
}
/**
 * @function inverse
 * @description inerses the input number
 */
function inverse() {
    const inputValue = Number(getInputValue());
    input.textContent = numberFormat((1 / inputValue).toFixed(8));
}
/**
 * @function mod
 * @description mod the input number
 */
function mod() {
    const inputValue = Number(getInputValue());
    if (inputValue < 0) {
        input.textContent = (-inputValue).toString();
    }
}
/**
 * @function modulo
 * @description find the reminder
 */
function modulo() {
    input.textContent += "%";
}
// exp: let user input in exponential form
/**
 * @function exponential
 * @description let user input the number in exponential form
 */
function exponential() {
    input.textContent += "e+";
}
//  third line
/**
 * @function root
 * @description find the square root of given number
 */
function squareRoot() {
    const inputValue = Number(getInputValue());
    if (inputValue < 0) {
        return;
    }
    const answer = Math.sqrt(inputValue);
    if (declen(answer)) {
        input.textContent = numberFormat(answer.toFixed(5));
        return;
    }
    input.textContent = numberFormat(answer.toString());
}
/**
 * @function factorial
 * @description find factorial of given number
 */
function factorial() {
    const inputValue = Number(getInputValue());
    let answer = 1;
    for (let i = 1; i <= inputValue; i++) {
        answer *= i;
    }
    //if answer is too big convert it to exponential form
    if (numLen(answer) > 20) {
        input.textContent = toExponential(answer);
        return;
    }
    input.textContent = numberFormat(answer.toString());
}
//  forth line
/**
 * @function xToPowerY
 * @description find x to the power y
 */
function xToPowerY() {
    input.textContent += "**";
}
//  fifth line
/**
 * @function tenToPowerX
 * @description find 10^x
 */
function tenToPowerX() {
    const inputValue = Number(getInputValue());
    input.textContent = numberFormat(Math.pow(10, inputValue).toString());
}
//  sixth line
/**
 * @function logbase10
 * @description find log x base 10
 */
function logbase10() {
    const inputValue = Number(getInputValue());
    input.textContent = numberFormat(Math.log10(inputValue).toString());
}
//  sfunctionh line
/**
 * @function naturalLog
 * @description find natural log of given number
 */
function naturalLog() {
    const inputValue = Number(getInputValue());
    input.textContent = numberFormat(Math.log(inputValue).toString());
}
//  trigonometry
/**
 * @function sin
 * @description find sin of given radian
 */
function sin() {
    const inputValue = eval(getInputValue());
    input.textContent = numberFormat(Math.sin(inputValue).toString());
}
/**
 * @function cos
 * @description find cos of given radian
 */
function cos() {
    const inputValue = eval(getInputValue());
    input.textContent = numberFormat(Math.cos(inputValue).toString());
}
/**
 * @function tan
 * @description find tan of given radian
 */
function tan() {
    const inputValue = eval(getInputValue());
    input.textContent = numberFormat(Math.tan(inputValue).toString());
}
/**
 * @function cosec
 * @description find cosec of given radian
 */
function cosec() {
    const inputValue = eval(getInputValue());
    input.textContent = numberFormat((1 / Math.sin(inputValue)).toString());
}
/**
 * @function sec
 * @description find sec of given radian
 */
function sec() {
    const inputValue = eval(getInputValue());
    input.textContent = numberFormat((1 / Math.cos(inputValue)).toString());
}
/**
 * @function cot
 * @description find cot of given radian
 */
function cot() {
    const inputValue = eval(getInputValue());
    input.textContent = numberFormat((1 / Math.tan(inputValue)).toString());
}
//  fuction
/**
 * @function floor
 * @description find floor  of given number
 */
function floor() {
    const inputValue = eval(getInputValue());
    input.textContent = numberFormat(Math.floor(inputValue).toString());
}
/**
 * @function ceil
 * @description find ceil of given number
 */
function ceil() {
    const inputValue = eval(getInputValue());
    input.textContent = numberFormat(Math.ceil(inputValue).toString());
}
/**
 * @function truncate
 * @description truncate the given number
 */
function truncate() {
    const inputValue = eval(getInputValue());
    input.textContent = numberFormat(Math.floor(inputValue).toString());
}
/**
 * @function manInFunction
 * @description mod the input number
 */
/**
 * @function degreeRadian
 * @description convert degree to radian and vice versa
 */
function degreeRadian() {
    if (degreeToRadian) {
        //deg to rad
        degreeRadianText.textContent = "RAD";
        input.textContent = numberFormat(((eval(getInputValue()) * Math.PI) / 180).toString());
        degreeToRadian = !degreeToRadian;
    }
    else {
        //rad to deg
        degreeRadianText.textContent = "DEG";
        input.textContent = numberFormat(((eval(getInputValue()) / Math.PI) * 180).toString());
        degreeToRadian = !degreeToRadian;
    }
}
// fe: exponential to decimal and vice versa
/**
 * @function ExponentialDecimal
 * @description convert exponential number to decimal and vice versa
 */
function ExponentialDecimal() {
    if (getInputValue().length === 0) {
        return;
    }
    const answer = eval(getInputValue());
    if (!input.textContent.includes("e")) {
        input.textContent = answer.toExponential();
        return;
    }
    if (input.textContent.includes("e")) {
        input.textContent = numberFormat(answer.toString());
    }
}
/**
 * @function displayNumop
 * @description display the number on screen
 */
function displayNumOp(number) {
    let inputValue = getInputValue();
    //below if take care that user can't press multiple zeros if display is empty
    if (number === "0" && inputValue == "0" && inputValue.length === 1) {
        return;
    }
    //below if used for displaying decimal point
    if (number === "." && !inputValue.includes(".")) {
        input.textContent += number;
        return;
    }
    //below if used to display number
    if (number !== ".")
        input.textContent += number;
    input.textContent = numberFormat(getInputValue());
}
/**
 * @function inputNumOp
 * @description according to pressed button it call dispay number fuction to display the number
 */
function inputNumOp(e) {
    const number = e.getAttribute("data-value");
    displayNumOp(number);
}
//  clears the memory variable
/**
 * @function memoryClearEvent
 * @description clear the memory varialbe
 */
function memoryClearEvent() {
    disabledMemory = true;
    memoryClear.setAttribute("style", disabledStyle);
    memoryRecall.setAttribute("style", disabledStyle);
    memoryPositiveValue = 0;
    memoryNegativeValue = 0;
    memoryClear.removeEventListener("click", memoryClearEvent);
}
/**
 * @function displayOperator
 * @description display the operator according to received argument
 */
// function displayOperator(sign) {
//   if (input.textContent[input.textContent.length - 1] === sign) {
//     return;
//   }
//   input.textContent += sign;
// }
// UTILITY
/**
 * @function declen
 * @description check whether number is float or not
 */
function declen(num) {
    const arr = num.toString().split(".");
    if (arr[1]) {
        return true;
    }
    return false;
}
/**
 * @function numLen
 * @description find length of number
 */
const numLen = (num) => {
    let len = 0;
    while (num != 0) {
        len++;
        num = parseInt((num / 10).toString());
    }
    return len;
};
/**
 * @function toExponential
 * @description convert number to exponential form
 */
const toExponential = (inputValue) => {
    const num = eval(inputValue.toString());
    //  console.log(num.length);
    const len = numLen(num);
    let tens = 1, temp = 0;
    while (temp < len - 1) {
        temp++;
        tens = tens * 10;
    }
    return `${num / tens}E${temp}`;
};
