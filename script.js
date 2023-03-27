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
  attack: function () {
    return 1 + Math.floor(Math.random() * 10);
  },
  missRoll: function () {
    return 1 + Math.floor(Math.random() * 10);
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
  attack: function () {
    return 1 + Math.floor(Math.random() * 10);
  },
  missRoll: function () {
    return 1 + Math.floor(Math.random() * 10);
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

  //Displays a message about rolling a dice to decide who gets to go first
  turnMessage.innerText =
    "A dice must be rolled to decide who attacks first. The highest number goes first.";
  middleContainer.appendChild(turnMessage);
}

//This function is called when the roll button is clicked. Both the player and enemy roll a random number and and whoever wins goes first
function handleRollClick() {
  playerRollResult = player.diceRoll();
  enemyRollResult = enemy.diceRoll();

  //If there is a tie, this informs the player and exits the function early
  if (handleTieAndReroll(playerRollResult, enemyRollResult)) {
    return;
  }

  //Determines whose turn it is based on the dice roll
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

//If there is a tie in the dice roll this function is called which displays a message and then forces the player to roll again
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

  if (player.isItMyTurn === true) {
    if (player.missRoll() === 1) {
      turnMessage.innerText = `Your attack missed!`;
      player.isItMyTurn = false;
      enemy.isItMyTurn = true;
    } else {
      damageNumber = player.attack();
      enemy.updateHealth(enemy.health - damageNumber);

      turnMessage.innerText = `You hit the enemy for ${damageNumber}`;
      player.isItMyTurn = false;
      enemy.isItMyTurn = true;
    }
  } else if (enemy.isItMyTurn === true) {
    if (enemy.missRoll() === 1) {
      turnMessage.innerText = `The enemy's attack missed!`;
      player.isItMyTurn = true;
      enemy.isItMyTurn = false;
    } else {
      damageNumber = enemy.attack();
      player.updateHealth(player.health - damageNumber);

      turnMessage.innerText = `The enemy hit you for ${damageNumber}`;
      player.isItMyTurn = true;
      enemy.isItMyTurn = false;
    }
  }
  whoseTurnIsItAnyway();
  isGameOver();
}

//Calls the start game function
startGame();

//When this function is called it updates the turn counter element
function updateTurnCounter() {
  turnCounterElement.textContent = turnNumber;
}

//This function displays whose turn it is (player's or enemy's)
function whoseTurnIsItAnyway() {
  if (player.isItMyTurn === true) {
    whoseTurnElement.innerText = `Player's Turn`;
  } else if (enemy.isItMyTurn === true) {
    whoseTurnElement.innerText = `Enemy's Turn`;
  }
}

function isGameOver() {
  if (player.health <= 0 || enemy.health <= 0) {
    nextBtn.disabled = true;

    let gameOverMessage;
    if (player.health <= 0) {
      gameOverMessage = "You have been defeated. Better luck next time!";
    } else {
      gameOverMessage = "Congratulations, you won!";
    }

    const gameOverElement = document.createElement("h1");
    gameOverElement.innerText = gameOverMessage;
    middleContainer.appendChild(gameOverElement);
  }
}
