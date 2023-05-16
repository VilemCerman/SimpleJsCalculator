class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement  = currentOperandTextElement;
        this.clear();
    }

    maxLength = 10;

    clear(){
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete(){
        if(this.currentOperand.toString().length === 1){
            this.currentOperand = 0;
        }else{
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
        this.updateDisplay();
    }

    appendNumber(number){
        if ((number === '.' && this.currentOperand.includes('.')) || this.currentOperand.length >= this.maxLength || (number === 0 && this.currentOperand.toString() === "0")) return;
        if(this.currentOperand.toString() === "0" && number !== '.') this.currentOperand = number.toString();
        else this.currentOperand = this.currentOperand.toString() + number.toString();
        calculator.updateDisplay();
    }

    updateDisplay(){
        //console.log(this.currentOperand + "  " + this.maxLength - this.currentOperand.toString().indexOf('.'));
        this.currentOperandTextElement.innerText = this.round(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = '';
        }
        
        console.log(this.previousOperand + " " + this.operation + " " + this.currentOperand);
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        // console.log(computation)
        // console.log(current)

        if(computation === '/' && current === 0){
            
        }else{
            switch (this.operation){
                case "+":
                    computation = prev + current;
                    break;
                case "-":
                    computation = prev - current;
                    break
                case "*":   
                    computation = prev * current;
                    break;
                case "/":
                    computation = prev / current;
                    break;
                case "^":
                    computation = Math.pow(prev, current);
                    break;
                case "√":
                    computation = Math.pow(current, 1/prev);;
                    break;
                default:
                    console.log("Unknown operation");
                    return;
            }

            //this.currentOperand = Math.round(computation * Math.pow(10, this.maxLength - 1)) / Math.pow(10, this.maxLength - 1);
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
            calculator.updateDisplay();
        }
    }

    chooseOperation(button) {
        this.operation = button;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        calculator.updateDisplay();
    }

    round = (number) => {
        if(number.toString().includes('.')){
            if(number%1 === 0){
                return number;
            }
            const decimalPlaces = this.maxLength - this.currentOperand.toString().indexOf('.');
            const factorOfTen = Math.pow(10, decimalPlaces);
            return Math.round(number * factorOfTen) / factorOfTen;
        }
        if(this.currentOperand.toString().length > this.maxLength){
            return Math.round(number / Math.pow(10, number.toString().length - 7)) / Math.pow(10, number.toString().length - 6).toString() + 'e' + (number.toString().length - 1);
        }

        return number;
    }
}

//#region 
const numberButtons = document.querySelectorAll('.button-number');
const operationButtons = document.querySelectorAll('.button-operation');
const deleteButton = document.querySelector('#delete');
const allClearButton = document.querySelector('#all-clear');
const equalsButton = document.querySelector('#equals');

const previousOperandTextElement = document.querySelector('.result2nd');
const currentOperandTextElement = document.querySelector('.result');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
//#endregion

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        //console.log (button.innerText);
        calculator.appendNumber(button.innerText);
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log (button.innerText);
        calculator.chooseOperation(button.innerText);
    })
});

allClearButton.addEventListener('click', button => {
    //console.log(button.innerText);
    calculator.clear();
});
deleteButton.addEventListener('click', button => {
    //console.log(button.innerText);
    calculator.delete();
});
equalsButton.addEventListener('click', button => {
    //console.log(button.innerText);
    calculator.compute();
});
