let money = 0;
let level = 1;
let productionRate = 1;
let currentProduct = "Paper";
let automationMultiplier = 1;
let countries = 1;

const products = ["Paper", "Pencil", "Book", "Phone", "Car", "Rocket"];

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.add('hidden');
  });
  document.getElementById(pageId).classList.remove('hidden');
}

function startGame() {
  showPage('factory');
}

function upgradeFactory() {
  if (money >= 100) {
    money -= 100;
    level++;
    if (level < products.length) {
      currentProduct = products[level - 1];
    }
    productionRate += 2;
    updateUI();
  } else {
    alert("Not enough money!");
  }
}

function hireManager(type) {
  let cost = 50;
  let boost = 1.5;
  if (type === 1) { cost = 190; boost = 2; }
  if (type === 2) { cost = 2000; boost = 5; }
  if (type === 3) { cost = 10000; boost = 10; }
   if (type === 4) { cost = 22000; boost = 15; }

  if (money >= cost) {
    money -= cost;
    automationMultiplier *= boost;
    updateUI();
    alert("Manager hired!");
  } else {
    alert("Not enough money!");
  }
}

function researchUpgrade() {
  if (money >= 500) {
    money -= 500;
    automationMultiplier *= 2;
    updateUI();
    alert("Research Successful!");
  } else {
    alert("Not enough money!");
  }
}

function expandWarehouse() {
  if (money >= 50000) {
    money -= 50000;
    countries++;
    document.getElementById('countries').innerText = `Current Countries: ${countries}`;
    updateUI();
    alert("Warehouse expanded!");
  } else {
    alert("Not enough money!");
  }
}

function updateUI() {
  document.getElementById('money').innerText = money.toFixed(2);
  document.getElementById('productionRate').innerText = (productionRate * automationMultiplier).toFixed(1);
  document.getElementById('level').innerText = level;
  document.getElementById('currentProduct').innerText = currentProduct;
}

// Auto production
setInterval(() => {
  money += productionRate * automationMultiplier;
  updateUI();
  updateProgressBar();
}, 1000);

function updateProgressBar() {
  let progress = document.getElementById('progress');
  let width = Math.min((money % 100) * 1, 100);
  progress.style.width = width + "%";
}
