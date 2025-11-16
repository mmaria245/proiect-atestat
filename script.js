let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowerOrHigher = document.querySelector(".lowerORhigher");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

const timerDisplay = document.getElementById("timer");
const body = document.getElementById("body");

let guessCount = 1;
let resetButton;

let timeLeft = 60;
let timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
    timeLeft--;
    if(timerDisplay) timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        lastResult.textContent = "Timpul a expirat!";
        setGameOver();
    }
}

function checkGuess() {
    let userGuess = Number(guessField.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        lastResult.textContent = "Introduceți un număr între 1 și 100!";
        flashWrong();
        return;
    }

    if (guessCount === 1) {
        guesses.textContent = "Încercări anterioare: ";
    }
    guesses.textContent += userGuess + " ";

    if (userGuess === randomNumber) {
        lastResult.textContent = "Ai ghicit!";
        lowerOrHigher.textContent = "";
        flashCorrect();
        saveScore(guessCount);
        setGameOver();
        return;
    } else if (guessCount === 10) {
        lastResult.textContent = "Ai epuizat încercările!";
        flashWrong();
        setGameOver();
        return;
    } else {
        lastResult.textContent = "Greșit!";
        if (userGuess < randomNumber)
            lowerOrHigher.textContent = "Numărul este mai mare!";
        else
            lowerOrHigher.textContent = "Numărul este mai mic!";
        flashWrong();
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

if(guessSubmit) guessSubmit.addEventListener("click", checkGuess);

function flashWrong() {
    if(body) {
        body.className = "body-wrong";
        setTimeout(() => body.className = "", 300);
    }
}

function flashCorrect() {
    if(body) body.className = "body-correct";
}

function setGameOver() {
    if(guessField) guessField.disabled = true;
    if(guessSubmit) guessSubmit.disabled = true;
    clearInterval(timerInterval);

    resetButton = document.createElement("button");
    resetButton.textContent = "Joc nou";
    resetButton.classList.add("scoresBtn");
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    guessCount = 1;
    document.querySelectorAll(".resultate p").forEach(p => p.textContent = "");
    if(resetButton) resetButton.remove();
    if(guessField) guessField.disabled = false;
    if(guessSubmit) guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
    body.className = "";
    randomNumber = Math.floor(Math.random() * 100) + 1;
    timeLeft = 60;
    timerInterval = setInterval(updateTimer, 1000);
}

function saveScore(score) {
    let list = JSON.parse(localStorage.getItem("scoreList")) || [];
    list.push(score);
    localStorage.setItem("scoreList", JSON.stringify(list));
}
