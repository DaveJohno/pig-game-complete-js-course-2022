'use strict';

//selecting elements
const player0Element = document.querySelector(`.player--0`);
const player1Element = document.querySelector(`.player--1`);
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById(`current--0`);
const current1Element = document.getElementById(`current--1`);

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//starting contitions
const initialize = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add(`hidden`);
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  player0Element.classList.remove(`player--winner`);
  player1Element.classList.remove(`player--winner`);
};

initialize();
playing;
//switch players reset dice
const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //switch to the next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle(`player--active`);
  player1Element.classList.toggle(`player--active`);
};

//rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //1.gerating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceElement.classList.remove(`hidden`);
    diceElement.src = `dice-${dice}.png`;
    //3.check for roll 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

//holding the score
btnHold.addEventListener(`click`, function () {
  if (playing) {
    //1. adding the score to the active player Score
    scores[activePlayer] += currentScore;

    //scores[1] = scores[1] + currentscore; //what it would be if player 2 was active
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player's score is >= 100
    //finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      //switch to the next player
      switchPlayers();
    }
  }
});

btnNew.addEventListener(`click`, function () {
  if (playing === false) {
    initialize();
  }
});
