// calculator display
const display = document.getElementById('display')

// add number or mathematic operation to the display
function input(val) {
    // reset display if it's showing error
    if (!display.value || display.value == "Error") 
        clearInput()

    display.value += val
}

// calculate math expression on display
function calculate() {  
    try {
        res = eval(display.value) // turn expression on display to JS code and run it

        // if result is float
        if (!Number.isInteger(res)) {
            res = res.toFixed(6) // to 6 places decimal
        }

        // x / 0 = infinity
        if (res == Infinity)
            throw new Error('0 division')

        display.value = res.toString() 
    } 
    catch(e) {
        if (e.message == '0 division') {
            display.value = "can not divide by 0"
        } else {
            display.value = 'Error'
        }
    }
    
}

function clearInput() {
    display.value = ''
}

// remove last character on display
function backspace() {
    display.value = display.value.substring(0, display.value.length - 1) 
}

// event for using keyboard to input number and operation
document.addEventListener('keypress', (e) => {
    if (!isNaN(e.key)) { // if e.key is a number
        input(e.key) 
    } else {
        switch(e.key) {
            case 'b': backspace(); break;
            case 'c': clearInput(); break;
            case '+': input('+'); break;
            case '-': input('-'); break;
            case '*': input('*'); break;
            case '/': input('/'); break;
            case '.': input('.'); break;
            case 'Enter': calculate(); break;
        }
    }

    // prevent user from typing spacebar into readonly display (WTF!, I can type space into readonly text input)
    if (display.value.includes(' ')) {
        display.value = display.value.replace(' ', '')
    }
})