const container = document.querySelector('.container');
const splashScreen = document.querySelector('.splash-screen');
const goalScreen = document.querySelector('.goal-screen');
const finalBlock = document.querySelector('.final-block');
const finalText = document.getElementById('final-text');
const winLoseStyle = document.querySelector('.win-lose');
const finalCollected = document.getElementById('final-collected');
const finalScore = document.getElementById('final-score');
const currScore = document.getElementById('score');
const healthPoints = document.getElementById('health');
const collectedItems = document.getElementById('collected-items');

const gameField = document.getElementById("game-field");
const gameGoal = document.getElementById('goal-text');

let score = 0;
let collected = 0;
let array1 = [];
let array2 = [];
let goal = '';
let health = 0;


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
  const flowerIcons = ["рџЊ±", "рџЊј", "рџЊ»", "рџЊ·"];
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
  if (objectsWithTargetName.length == 0) {
    finalText.innerHTML = 'You win!';
    winLoseStyle.classList.add('win-style');
    checkGameOver();
  }
}

function checkHealth() {
  switch (health) {
    case 1:
      healthPoints.innerHTML = 'вќ¤пёЏрџ¤Ќрџ¤Ќ';
      break;
    case 2:
      healthPoints.innerHTML = 'вќ¤пёЏвќ¤пёЏрџ¤Ќ';
      break;
    case 3:
      healthPoints.innerHTML = 'вќ¤пёЏвќ¤пёЏвќ¤пёЏ';
      break;
  }
  if (health == 0) {
    finalText.innerHTML = 'You lose!';
    winLoseStyle.classList.remove('win-style');
    checkGameOver();
  }
}

function checkGameOver() {
  splashScreen.classList.remove('hide');
  container.classList.add('hide');
  finalText.classList.remove('hide');
  finalCollected.classList.remove('hide');
  finalScore.classList.remove('hide');
  finalCollected.innerText = `Collected: ${goal} ${collected}`;
  finalScore.innerText = `Score: ${score}`;
  startButton.innerText = "Restart Game";

}

function update() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
      if (array1[index] && array1[index].icon) {
        if (array2.length < 3) {
          array2.push(index);
          
        } else {
          const firstIndex = array2.shift();
          array1[firstIndex].icon = flowerType(getRandomNumber(1, 3));
          buttons[firstIndex].textContent = array1[firstIndex].icon;
          buttons[firstIndex].disabled = false;
          array2.push(index);
        }

        if (array1[index].icon == goal) {
          collected++;
          score += (health * 3);
        } else {
          health -= 1;
          score -= 9;
          if (score < 0) {
            score = 0;
          }
        }

        console.log('health ' + health)

        currScore.innerHTML = `Score: ${score}`;
        collectedItems.innerHTML = `Collected: ${goal} ${collected}`

        array1[index].icon = flowerType(0);
        button.textContent = flowerType(0);
        button.disabled = true;
  
        checkHealth();
        checkGoal(goal);
      }
    });
  });
  
}

function initialization() {
  score = 0;
  collected = 0;
  array1 = generateArray(98, 1, 3);
  array2 = [];
  health = 3;
  displayField(array1, gameField);
  goal = flowerType(getRandomNumber(1, 3));
  gameGoal.innerHTML = "Goal: " + goal;
  collectedItems.innerHTML = `Collected: ${goal} ${collected}`;
  currScore.innerHTML = `Score: ${score}`;
  checkHealth();
  console.log(health);
}

function startGame() {
  container.classList.remove('hide');
  goalScreen.classList.add('hide');
  initialization();
  update();
}

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', function() {
  splashScreen.classList.add('hide');
  finalBlock.classList.remove('hide');
  goalScreen.classList.remove('hide');
  document.body.style.overflow = 'inherit';
});

const startGameButton = document.getElementById('start-game');
startGameButton.addEventListener('click', function() {
  startGame();
  document.body.style.overflow = 'inherit';
});
