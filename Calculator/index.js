class Calculator {
    constructor(prevOperandElem, currOperandElem) {
        this.prevOperandElem = prevOperandElem;
        this.currOperandElem = currOperandElem;
        this.clear();
    }
    clear() {
        this.prevOperand = "";
        this.currOperand = "";
        this.operation = undefined;

    }
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);

    }
    appendNumber(number) {
        // When the current Operand already contains a decimal, then exit
        if (number === "." && this.currOperand.includes(".")) {
            return;
        }
        this.currOperand = this.currOperand.toString() + number.toString();

    }
    selectOperation(operation) {
        if (this.currOperand === '') { return }
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.prevOperand = this.currOperand
        this.currOperand = ""

    }
    compute() {
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) { return }
        if (this.operation === "*") {
            this.currOperand = prev * curr;
        }
        else if (this.operation === "+") {
            this.currOperand = prev + curr;
        }
        else if (this.operation === "-") {
            this.currOperand = prev - curr;
        }
        else if (this.operation === "÷") {
            this.currOperand = prev / curr;
        }
        else {
            return;
        }
        this.prevOperand = "";
        this.operation = undefined;
    }
    getFormattedNumber(number) {
        const integerPart = parseFloat(number.toString().split('.')[0]);
        const decimalPart = number.toString().split('.')[1];
        let integerDisplay;
        if (isNaN(integerPart)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerPart.toLocaleString("en", { maximumFractionDigits: 0 });
        }
        if (decimalPart != null) {
            return `${integerDisplay}.${decimalPart}`;
        }
        else {
            return integerDisplay;
        }

    }
    updateDisplay() {
        this.currOperandElem.innerText = this.getFormattedNumber(this.currOperand);
        if (this.operation != null) {
            this.prevOperandElem.innerText = `${this.getFormattedNumber(this.prevOperand)} ${this.operation}`;
        }
        else {
            this.prevOperandElem.innerText = ''
        }

    }
}


let numberBtns = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero, .decimal");
let operationBtns = document.querySelectorAll(".division, .mul, .sum, .sub");
let equalBtn = document.querySelector(".equal");
let delBtn = document.querySelector(".DEL");
let allClearBtn = document.querySelector(".AC");
let prevOperandElem = document.querySelector(".previous-operand");
let currOperandElem = document.querySelector(".current-operand");

let calc = new Calculator(prevOperandElem, currOperandElem);

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calc.appendNumber(btn.innerText);
        calc.updateDisplay();
    })
})

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calc.selectOperation(btn.innerText);
        calc.updateDisplay();
    })
})

equalBtn.addEventListener('click', () => {
    calc.compute()
    calc.updateDisplay()
})

allClearBtn.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
})
delBtn.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
})