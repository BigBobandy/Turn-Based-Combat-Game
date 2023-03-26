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
const rollBtn = docment.getElementById("roll-btn");
const nextBtn = document.getElementById("next-btn");
const middleContainer = document.getElementById("middle-container");
const turnCounterElement = document.getElementById("turn-counter");
const whoseTurnElement = document.getElementById("whose-turn");
