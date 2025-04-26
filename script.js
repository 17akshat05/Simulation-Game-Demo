// Variables
let productCount = 0;
let productionSpeed = 1;
let upgradeCost = 10;
let researchPoints = 0;
let managerHired = false;
let autoProductionUnlocked = false;

// Pages handling
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
  document.getElementById(pageName + 'Page').classList.remove('hidden');
}

// Production
function produce() {
  productCount += productionSpeed;
  updateDisplay();
}

// Factory Upgrade
function upgradeFactory() {
  if (productCount >= upgradeCost) {
    productCount -= upgradeCost;
    productionSpeed += 1;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    updateDisplay();
  } else {
    alert("Not enough products to upgrade!");
  }
}

// Research - Unlock Auto Production
function autoProductionResearch() {
  if (researchPoints >= 50 && !autoProductionUnlocked) {
    researchPoints -= 50;
    autoProductionUnlocked = true;
    setInterval(produce, 1000); // Auto produce every second
    alert("Auto Production Unlocked!");
    updateDisplay();
  } else if (autoProductionUnlocked) {
    alert("Already unlocked!");
  } else {
    alert("Not enough research points!");
  }
}

// Managers
function hireManager() {
  if (productCount >= 100 && !managerHired) {
    productCount -= 100;
    managerHired = true;
    setInterval(produce, 2000); // Extra production by manager every 2 seconds
    document.getElementById('managerStatus').innerText = "Manager working 🚀";
    updateDisplay();
  } else if (managerHired) {
    alert("You already have a manager!");
  } else {
    alert("Not enough products to hire a manager!");
  }
}

// Update all UI elements
function updateDisplay() {
  document.getElementById('productCount').innerText = productCount;
  document.getElementById('productionSpeed').innerText = productionSpeed;
  document.getElementById('upgradeCost').innerText = upgradeCost;
  document.getElementById('researchPoints').innerText = researchPoints;
}

// Earn Research Points every 10 seconds (passive)
setInterval(() => {
  researchPoints += 1;
  updateDisplay();
}, 10000);

// Start at Factory page
showPage('factory');
updateDisplay();
