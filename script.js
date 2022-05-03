'use strict';

//selecting all elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
//Score and current values
let score0 = score0El.textContent;
let score1 = score1El.textContent;
//starting fresh game
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');
let scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
//Implementing game logic
rollDice.addEventListener('click', function () {
  if (playing) {
    let diceNumber = Math.ceil(Math.random() * 6);
    console.log(diceNumber);
    dice.src = `dice-${diceNumber}.png`;
    dice.classList.remove('hidden');
    if (diceNumber === 1) {
      //switch player
      switchPlayer();
    } else {
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    if (scores[activePlayer] >= 100) {
      //player wins
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
      document.querySelector(
        `#name--${activePlayer}`
      ).textContent = `🏆WINNER!!!`;
    } else {
      //switch Player
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', function () {
  document.querySelector(`#name--${activePlayer}`).textContent = `PLAYER ${
    activePlayer + 1
  }`;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
});
