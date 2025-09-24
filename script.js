const random = parseInt(Math.random() * 100 + 1);
const guess = document.querySelector('#guessfield');
const highLow = document.querySelector('.highLow');
let gameStatus = true;
let count = 10;
let prevGuess = [];
const resultPara = document.querySelector('.resultPara');
const submit = document.querySelector('#sbmt');
const guessSpan = document.querySelector('.guess');
const remain = document.querySelector('.remain');

submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (!gameStatus) return;  // prevent clicking after game over

    let guessNum = parseInt(guess.value);
    if (isNaN(guessNum)) return;

    cndnCheck(guessNum);
    guess.value = "";

    // disable submit if attempts reach 0
    if (count <= 0) submit.disabled = true;
});

function cndnCheck(guessNum) {
    if (guessNum <= 0 || guessNum > 100) {
        alert('Please Enter a Valid Number (1-100)');
    } else if (!gameStatus) {
        endGame();
    } else {
        validation(guessNum);
    }
}

function validation(guessNum) {
    prevGuess.push(guessNum);
    displayGuess();

    if (guessNum === random) {
        // Hide previous guesses and remaining count
        guessSpan.parentElement.style.display = 'none';  // hides "Previous Guess"
        remain.parentElement.style.display = 'none';     // hides "Remaining Guess"

        highLow.innerHTML = '';
        resultPara.innerHTML += `<p class="win">YOU WON THE GAME! YOUR GUESS IS ${guessNum}</p>`;
        gameStatus = false;
        submit.disabled = true;
        newGame();
        return;
    }

    count--;
    remain.innerHTML = count;

    if (count === 0) {
        endGame();
        return;
    }

    if (guessNum > random) {
        highLow.innerHTML = 'Guess is too high!';
        highLow.style.color = 'red';
        highLow.style.fontWeight = 'bold';
    } else if (guessNum < random) {
        highLow.innerHTML = 'Guess is too low!';
        highLow.style.color = 'red';
        highLow.style.fontWeight = 'bold';
    }
}


function displayGuess() {
    guessSpan.innerHTML = prevGuess.join(", ");
}

function newGame() {
    resultPara.innerHTML += '<input class="newButton" type="button" value="Start a New Game" onclick="location.reload()">';
}

function endGame() {
    gameStatus = false;
    highLow.innerHTML = '';
    resultPara.innerHTML += `<p class="lose">YOU LOSE THE GAME! RANDOM NUMBER IS ${random}</p>`;
    submit.disabled = true;
    newGame();
}
