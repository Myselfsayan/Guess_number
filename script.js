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
const accuracy=document.querySelector('.accuracy');

submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (!gameStatus) return;  // prevent clicking after game over

    let guessNum = parseFloat(guess.value);
    if (isNaN(guessNum) || !Number.isInteger(guessNum)) {
    alert('Enter a valid integer!');
    return;
    }
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
        accuracy.innerHTML=`<p class="acry">Your Accuracy is ${count*10} </p>`
        displayAccuracy(count);
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
function displayAccuracy(count) {
    const accuracyValue = count * 10;
    accuracy.innerHTML = `<p class="acry">Your Accuracy is ${accuracyValue}%</p>`;
    const ele = document.querySelector('.acry');
    if (accuracyValue >= 70) ele.style.color = 'green';
    else if (accuracyValue >= 40) ele.style.color = 'orange';
    else ele.style.color = 'red';

}

function endGame() {
    gameStatus = false;
    highLow.innerHTML = '';
    submit.disabled = true;
    resultPara.innerHTML += `<p class="lose">YOU LOSE THE GAME! RANDOM NUMBER IS ${random}</p>`;
    accuracy.innerHTML=`<p class="acry">Your Accuracy is ${count*10}</p>`;
    displayAccuracy(count);
    newGame();
}
