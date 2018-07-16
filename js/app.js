//game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;
//ui elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    //validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    //check if won
    if (guess === winningNum) {
        //game over - won
        gameOver(true,`${winningNum} is correct! You win!`)

    } else {
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            //game over - lost
            gameOver(false,`You lose! The correct number was: ${winningNum}`);
        } else {
            guessInput.style.borderColor = 'red';
            //clear input
            guessInput.value = '';
            //game continues - answer wrong
            setMessage(`${guess} is not correct, ${guessesLeft} guasses left`, 'red');
        }
    }
});
//game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    //disabled 
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);
    //play again
    guessBtn.value = 'Play again';
    guessBtn.className += 'play-again';
}

//get wining Number
function getRandomNum(min,max){
 return Math.floor(Math.random()*(max-min+1)+min);   
}

//set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
