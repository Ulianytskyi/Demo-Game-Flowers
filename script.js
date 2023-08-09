let array1 = generateArray(105, 1, 3);
let array2 = [];
const gameField = document.getElementById("game-field");
displayField(array1, gameField);

let turns = 0;
let goal = flowerType(getRandomNumber(1, 3));
const gameGoal = document.getElementById("title");
gameGoal.innerHTML = "Збери усі: " + goal;

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
  if (objectsWithTargetName.length == 0) {
    console.log(`You win!`);
    disableAllButtons();

    gameGoal.innerHTML = "Зроблено кроків: " + turns;
  }
}

function disableAllButtons() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function update() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
      turns++;
      console.log("Кроків: " + turns);
      if (array2.length < 3) {
        array2.push(index);
      } else {
        const firstIndex = array2.shift();
        array1[firstIndex].icon = flowerType(getRandomNumber(1, 3));
        buttons[firstIndex].textContent = array1[firstIndex].icon;
        buttons[firstIndex].disabled = false;
        array2.push(index);
      }

      array1[index].icon = flowerType(0);
      button.textContent = flowerType(0);
      button.disabled = true;

      checkGoal(goal);
    });
  });
}

update();
