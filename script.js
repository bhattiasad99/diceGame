'use strict';
//selectors
const player0_element = document.querySelector('.player--0')
const player1_element = document.querySelector('.player--1')
const score0_element = document.getElementById('score--0')
const score1_element = document.getElementById('score--1')
const dice_element = document .querySelector(".dice")
const buttonNew = document.querySelector('.btn--new')
const buttonRoll = document.querySelector('.btn--roll')
const buttonHold = document.querySelector('.btn--hold')
const current0_element = document.getElementById('current--0');
const current1_element = document.getElementById('current--1');
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0_element.classList.toggle('player--active')
    player1_element.classList.toggle('player--active')
}
let currentPlayer, activePlayer, currentScore, gameOn, scores;
//starting conditions
const init = function() {
    current0_element.textContent = 0;
    current1_element.textContent= 0;
    player0_element.classList.remove('player--winner')
    player1_element.classList.remove('player--winner')
    player0_element.classList.add('player--active')
    player1_element.classList.remove('player--active')
    dice_element.classList.add('hidden');
    score0_element.textContent = 0;
    score1_element.textContent = 0;
    currentPlayer = 0;
    activePlayer = 0;
    currentScore = 0;
    gameOn = true;
    scores = [0,0]
}

init()

//Rolling dice functionality
buttonRoll.addEventListener('click',function() {
    if (gameOn) {
        
    //Generating random Dice roll
    const randGen = Math.trunc(Math.random() * 6) + 1
    console.log(randGen);
    //display dice
    dice_element.classList.remove('hidden');
    dice_element.src = `dice-${randGen}.png`;
    //check for rolled 1. If true, switch to next player
    if (randGen !== 1) {
        //add RandGen to current score
        currentScore += randGen;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } 
    else {
        //switch to next player
        switchPlayer()
}}})

buttonHold.addEventListener('click',function() {
    if (gameOn) {
        //add current score to active players score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //check if players score is >= 100
    if (scores[activePlayer] >= 100) {
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        gameOn = false;
        dice_element.classList.add('hidden');

    }
        //then finish game
        //else switch player
        switchPlayer()
    }
    
})
buttonNew.addEventListener('click',init) 
