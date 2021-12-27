"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

let btnsWorking = true;

function zerarCurrentScore() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
}

function switchToNextPlayer() {
  zerarCurrentScore();
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

// Setting initial propertys
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// Adding event on btnRoll's click
btnRoll.addEventListener("click", function () {
  if (btnsWorking) {
    // 1- Generating random numbers (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2- Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;

    // 3- Check for rolled 1
    if (dice !== 1) {
      // Add dice to currentScore
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchToNextPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (btnsWorking) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 70) {
      zerarCurrentScore();

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);

      document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } VENCEU 🏆`;
      diceEl.classList.add("hidden");
      btnsWorking = false;
    } else {
      switchToNextPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  btnsWorking = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");

  document
    .querySelector(`.player--${activePlayer === 0 ? 1 : 0}`)
    .classList.remove("player--active");

  if (player1El.classList.contains("player--active")) {
    player1El.classList.remove("player--active");
  }
  if (player0El.classList.contains("player--winner"))
    player0El.classList.remove("player--winner");

  if (player1El.classList.contains("player--winner"))
    player1El.classList.remove("player--winner");

  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

  document.querySelector(`#name--0`).textContent = `Player 1`;
  document.querySelector(`#name--1`).textContent = `Player 2`;
});
