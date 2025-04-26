// Game state variables
let money = 1000;
let points = 0;
let productionRate = 1;
let level = 1;
let progress = 0;
let gameInterval;
let countries = 1;

function showPage(page) {
  const pages = document.querySelectorAll('.page');
  pages.forEach((pageElement) => {
    pageElement.classList.remove('active');
  });
  document.getElementById(page).classList.add('active');
}

function startGame() {
  showPage('factory');
  money = 0;
  points = 0;
  productionRate = 1;
  level = 1;
  progress = 0;
  countries = 1;
  updateUI();
}

function upgradeFactory() {
  if (money >= 100) {
    money -= 100;
    productionRate *= 2;
    level += 1;
    updateUI();
  } else {
    alert('Not enough money!');
  }
}

function hireManager(level) {
  const managerCost = [500, 2000, 5000];
  const managerSpeed = [0.1, 0.25, 0.5];
  if (money >= managerCost[level - 1]) {
    money -= managerCost[level - 1];
    productionRate += managerSpeed[level - 1];
    updateUI();
  } else {
    alert('Not enough money!');
  }
}

function researchUpgrade() {
  if (money >= 1000) {
    money -= 1000;
    productionRate *= 2;
    updateUI();
  } else {
    alert('Not enough money!');
  }
}

function expandWarehouse() {
  if (money >= 5000) {
    money -= 5000;
    countries += 1;
    document.getElementById('countries').innerText = `Current Countries: ${countries}`;
    updateUI();
  } else {
    alert('Not enough money!');
  }
}

function earnPoints() {
  points += 1;
  document.getElementById('points').innerText = points;
}

function updateUI() {
  document.getElementById('money').innerText = money;
  document.getElementById('productionRate').innerText = productionRate;
  document.getElementById('level').innerText = level;
  document.getElementById('progress').style.width = (progress % 100) + '%';
  document.getElementById('earnInfo').innerText = `Earned Points: ${points}`;
}

function updateProgress() {
  progress += productionRate;
  if (progress >= 100) {
    money += 10;
    progress = 0;
  }
  updateUI();
}

// Automatically increase progress every second
gameInterval = setInterval(updateProgress, 1000);
