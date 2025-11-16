const puzzleEl = document.getElementById("puzzle");
const inputEl = document.getElementById("operatorInput");
const checkBtn = document.getElementById("checkBtn");
const resultEl = document.getElementById("result");

let a, b, op, answer;

function generatePuzzle() {
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;
    const ops = ["+", "-", "*", "/"];
    op = ops[Math.floor(Math.random() * ops.length)];

    switch(op) {
        case "+": answer = a + b; break;
        case "-": answer = a - b; break;
        case "*": answer = a * b; break;
        case "/": answer = a / b; answer = Math.round(answer*100)/100; break;
    }

    puzzleEl.textContent = `${a} ? ${b} = ${answer}`;
    inputEl.value = "";
    resultEl.textContent = "";
}

checkBtn.addEventListener("click", () => {
    const userOp = inputEl.value.trim();
    let userAnswer;
    switch(userOp) {
        case "+": userAnswer = a + b; break;
        case "-": userAnswer = a - b; break;
        case "*": userAnswer = a * b; break;
        case "/": userAnswer = a / b; userAnswer = Math.round(userAnswer*100)/100; break;
        default:
            resultEl.textContent = "Introduceți un operator valid: +, -, *, /";
            return;
    }

    if(userAnswer === answer) resultEl.textContent = "Corect!";
    else resultEl.textContent = "Greșit!";
    setTimeout(generatePuzzle, 1500);
});

generatePuzzle();
