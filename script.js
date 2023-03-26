//Object representing the player in the game
const player = {
  health: 150,
  maxHealth: 150,
  element: document.getElementById("player-health"),
  updateHealth: function (newHealth) {
    this.health = newHealth;
    this.element.textContent = newHealth;
  },
};

//Object representing the enemy in the game
const enemy = {
  health: 150,
  maxHealth: 150,
  element: document.getElementById("enemy-health"),
  updateHealth: function (newHealth) {
    this.health = newHealth;
    this.element.textContent = newHealth;
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
const battleInfoElement = document.getElementById("battle-info");

let turnNumber = 1;

function updateTurnCounter() {
  turnCounterElement.textContent = turnNumber;
}

function startGame() {
  player.updateHealth(player.health);
  enemy.updateHealth(enemy.health);
}

beginBtn.addEventListener("click", function () {
  greetingMessage.remove();
  beginBtn.classList.add("hide");
  rollBtn.classList.remove("hide");

  const rollMessage = document.createElement("p");
  rollMessage.classList.add("message");
  rollMessage.innerText =
    "A dice must be rolled to decide who attacks first. The highest number goes first.";
  middleContainer.appendChild(rollMessage);

  updateTurnCounter();
});

rollBtn.addEventListener("click", function () {
  playerRollResult = diceRoll();
  enemyRollResult = diceRoll();
  nextBtn.classList.remove("hide");
  resultMessage = document.createElement("p");
  resultMessage.innerText = `You rolled a ${playerRollResult} and the enemy rolled a ${enemyRollResult}.`;
  middleContainer.appendChild(resultMessage);
});

function diceRoll() {
  return 1 + Math.floor(Math.random() * 20);
}
