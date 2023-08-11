const container = document.querySelector(".container");
const splashScreen = document.querySelector(".splash-screen");
const finalText = document.getElementById("final-text");
const finalCollected = document.getElementById("final-collected");
const finalScore = document.getElementById("final-score");
const currScore = document.getElementById("score");
const timer = document.getElementById("timer");
const collectedItems = document.getElementById("collected-items");
const gameGoal = document.getElementById("goal-text");

let score = 0;
let collected = 0;
let goal = "";

let array1 = [];
let array2 = [];
const gameField = document.getElementById("game-field");
// displayField(array1, gameField);

function makeGoal() {
  goal = flowerType(getRandomNumber(1, 3));
  gameGoal.innerHTML = "Goal: " + goal;
  collectedItems.innerHTML = `Collected: ${goal} ${collected}`;
}

function generateArray(length, min, max) {
  const tempArray = [];

  for (let i = 0; i < length; i++) {
    const ranNumber = getRandomNumber(min, max);
    let icon = flowerType(ranNumber);
    tempArray.push({ icon });
  }
  return tempArray;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function flowerType(number) {
  const flowerIcons = ["🌱", "🌼", "🌻", "🌷"];
  return flowerIcons[number];
}

function displayField(array, targetElement) {
  targetElement.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    displayObject(array, i, targetElement);
  }
}

function displayObject(array, index, targetElement) {
  let objectClass = "object";
  let objectIconClass = "object-icon";
  let objectBtnClass = "btn";
  let objectBtnId = "button" + index;

  targetElement.innerHTML += `<div class = '${objectClass}'>
  <button class='${objectBtnClass} ${objectIconClass}' id='${objectBtnId}'>
  ${array[index].icon}
  </button>
  </div>`;
}

function checkGoal(goal) {
  const targetName = goal;
  const objectsWithTargetName = array1.filter((obj) => obj.icon === targetName);
  if (objectsWithTargetName.length > 25) {
    console.log(`You win!`);
    checkGameOver();
  }
}

function disableAllButtons() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function checkGameOver() {
  splashScreen.classList.remove("hide");
  container.classList.add("hide");
  finalText.classList.remove("hide");
  finalCollected.classList.remove("hide");
  finalScore.classList.remove("hide");
  gameGoal.classList.add("hide");
  finalCollected.innerText = `Collected: ${goal} ${collected}`;
  finalScore.innerText = `Score: ${score}`;
  startButton.innerText = "Restart Game";

  array1 = generateArray(105, 1, 3);
  array2 = [];
  score = 0;
  currScore.innerHTML = `Score: ${score}`;
  displayField(array1, gameField);
}

function update() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
      if (array2.length < 3) {
        array2.push(index);
      } else {
        const firstIndex = array2.shift();
        array1[firstIndex].icon = flowerType(getRandomNumber(1, 3));
        buttons[firstIndex].textContent = array1[firstIndex].icon;
        buttons[firstIndex].disabled = false;
        array2.push(index);
      }

      console.log(array1[index].icon);

      if (array1[index].icon == goal) {
        collected++;
        score += 10;
      } else {
        score -= 10;
      }
      currScore.innerHTML = `Score: ${score}`;
      collectedItems.innerHTML = `Collected: ${goal} ${collected}`;

      array1[index].icon = flowerType(0);
      button.textContent = flowerType(0);
      button.disabled = true;

      checkGoal(goal);
    });
  });
}

function startGame() {
  array1 = generateArray(105, 1, 3);
  array2 = [];
  displayField(array1, gameField);
  if (goal != "") {
    makeGoal();
  }
  container.classList.remove("hide");
  splashScreen.classList.add("hide");
  update();
}

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", function () {
  startGame();
  document.body.style.overflow = "inherit";
});

makeGoal();
