let init = true, flag = false, opFlag = false;
let op = "";
let value1, value2, result;

const input1 = document.querySelector('.input1')
const input2 = document.querySelector('.input2')

const numbers = document.querySelectorAll('.numpad')
numbers.forEach(number => {
    number.addEventListener('click', ()=>handleNumClick(number));
})

const operators = document.querySelectorAll('.operators');
operators.forEach(operator => {
    operator.addEventListener('click', ()=>handleOperatorClick(operator))
})

const equal = document.querySelector('.equal');
equal.addEventListener('click', handleEqualClick)

const C = document.querySelector('.C');
C.addEventListener('click', handleCclick)

const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', handleBackSpaceClick)

const sq = document.querySelector('.sq');
sq.addEventListener('click', handleSqClick)

addEventListener('keydown', (e)=>{
    if(e.key === "Backspace"){
        handleBackSpaceClick();
    }
})

addEventListener('keypress', (e) => {
    if (e.key === '+' || e.key === "-" || e.key === "*" || e.key === "/") {
        handleOperatorClick({value: e.key});
    }  else if(e.key === "Enter"){
        handleEqualClick();
    }
    else handleNumClick({value: e.key});
});

function handleNumClick(number) {
    console.log(number);
    if (init) {
        value1 = input1.value = "";
        value2 = input2.value = "";
        init = false;
    }
    if (flag) {
        input2.value = "";
        flag = false;
    }
    input1.value += number.value;
    input2.value += number.value;
    opFlag = false;
}

function handleOperatorClick (operator) {
    if (op === "") {
        value1 = input2.value;
    } else if (!opFlag) {
        value2 = input2.value;
        result = eval(value1 + op + value2);
        input1.value = value1 = result;
        input2.value = result;
    }

    let inputValue = input1.value;
    const lv = inputValue[inputValue.length - 1];
    if (lv === '+' || lv === "-" || lv === "*" || lv === "/") {
        input1.value = inputValue.slice(0, inputValue.length - 1) + operator.value;

    } else input1.value += operator.value;
    flag = true;
    op = operator.value;
    opFlag = true;
}

function handleEqualClick () {
    if (!opFlag && op !== "") {
        value2 = input2.value;
        result = eval(value1 + op + value2);
        input1.value = value1 = result;
        input2.value = result;
        op = "";
    }
}

function handleCclick () {
    input1.value = value1 = "0";
    input2.value = value2 = "0";
    op = "";
    init = true;
}

function handleBackSpaceClick () {
    let inputValue = input1.value;
    const lv = inputValue[inputValue.length - 1];
    if (lv !== '+' && lv !== "-" && lv !== "*" && lv !== "/") {
        input2.value = value2 = input2.value.slice(0, input2.value.length - 1);
    } else op = "";
    input1.value = value1 = input1.value.slice(0, input1.value.length - 1);
}

function handleSqClick () {
    let inputValue = input1.value;
    const lv = inputValue[inputValue.length - 1];
    if (lv !== '+' && lv !== "-" && lv !== "*" && lv !== "/") {
        result = inputValue*inputValue;
        input1.value = value1 = result;
        input2.value = value2 = result;
        op = "";
    }
}