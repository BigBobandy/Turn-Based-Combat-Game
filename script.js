//Object representing the player in the game
const player = {
  health: 150,
  maxHealth: 150,
  isItMyTurn: false,
  element: document.getElementById("player-health"),
  updateHealth: function (newHealth) {
    this.health = newHealth;
    this.element.textContent = newHealth;
  },
  diceRoll: function () {
    return 1 + Math.floor(Math.random() * 20);
  },
};

//Object representing the enemy in the game
const enemy = {
  health: 150,
  maxHealth: 150,
  isItMyTurn: false,
  element: document.getElementById("enemy-health"),
  updateHealth: function (newHealth) {
    this.health = newHealth;
    this.element.textContent = newHealth;
  },
  diceRoll: function () {
    return 1 + Math.floor(Math.random() * 20);
  },
};

//Bringing in UI elements
const beginBtn = document.getElementById("begin-btn");
const rollBtn = document.getElementById("roll-btn");
const nextBtn = document.getElementById("next-btn");
const middleContainer = document.getElementById("middle-container");
const turnCounterElement = document.getElementById("turn-counter");
const whoseTurnElement = document.getElementById("whose-turn");
const greetingMessage = document.getElementById("greeting-message");
const turnMessage = document.getElementById("battle-info");

//Turn counter that is incremented and updated using the function below every turn
let turnNumber = 1;
let isItPlayerTurn;

//This function is called when the page is loaded
function startGame() {
  //Sets the initial health values
  player.updateHealth(player.health);
  enemy.updateHealth(enemy.health);

  updateTurnCounter();

  //Attaching the event listeners
  beginBtn.addEventListener("click", handleBeginClick);
  rollBtn.addEventListener("click", handleRollClick);
  nextBtn.addEventListener("click", handleNextTurnClick);
}

//Event Handler Functions
function handleBeginClick() {
  greetingMessage.remove();
  beginBtn.classList.add("hide");
  rollBtn.classList.remove("hide");

  turnMessage.innerText =
    "A dice must be rolled to decide who attacks first. The highest number goes first.";
  middleContainer.appendChild(turnMessage);
}

function handleRollClick() {
  playerRollResult = player.diceRoll();
  enemyRollResult = enemy.diceRoll();

  if (handleTieAndReroll(playerRollResult, enemyRollResult)) {
    return; // exits the function early if there's a tie
  }

  if (playerRollResult > enemyRollResult) {
    player.isItMyTurn = true;
    turnMessage.innerText = `You rolled a ${playerRollResult} and the enemy rolled a ${enemyRollResult}. You get to attack first.`;
  } else {
    enemy.isItMyTurn = true;
    turnMessage.innerText = `The enemy rolled a ${enemyRollResult} and you rolled a ${playerRollResult}. The enemy gets to go first.`;
  }

  middleContainer.appendChild(turnMessage);

  rollBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
  whoseTurnIsItAnyway();
}

function handleTieAndReroll(playerRoll, enemyRoll) {
  if (playerRoll === enemyRoll) {
    turnMessage.innerText = "It's a tie! Roll again.";
    middleContainer.appendChild(turnMessage);
    return true; //returns true if there is a tie
  }
  return false; //returns false if there is no tie
}

function handleNextTurnClick() {
  turnNumber++;
  updateTurnCounter();
}

//Calls the start game function
startGame();

function updateTurnCounter() {
  turnCounterElement.textContent = turnNumber;
}

function whoseTurnIsItAnyway() {
  if (player.isItMyTurn === true) {
    whoseTurnElement.innerText = `Player's Turn`;
  } else {
    whoseTurnElement.innerText = `Enemy's Turn`;
  }
}
