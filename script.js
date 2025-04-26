let products = ["Paper", "Pencils", "Notebooks", "Phones", "Laptops", "Cars", "Planes", "Satellites", "Rockets", "AI Robots"];
let productIndex = 0;
let money = 0;
let level = 1;
let productionSpeed = 1;
let automationMultiplier = 1;
let progress = 0;
let managerHired = false;
let productionInterval;

// Load saved game
window.onload = function() {
  if (localStorage.getItem('factorySave')) {
    let save = JSON.parse(localStorage.getItem('factorySave'));
    productIndex = save.productIndex;
    money = save.money;
    level = save.level;
    automationMultiplier = save.automationMultiplier;
    managerHired = save.managerHired;
  }
}

function startGame() {
  document.getElementById('mainMenu').classList.add('hidden');
  document.getElementById('factory').classList.remove('hidden');
  productionInterval = setInterval(produce, 100);
  updateUI();
}

function produce() {
  if (managerHired) {
    progress += 1 * automationMultiplier;
  } else {
    progress += 0.5 * automationMultiplier;
  }

  if (progress >= 100) {
    money += 5 * level;
    progress = 0;
  }

  updateUI();
  saveGame();
}

function tapFactory() {
  money += 10 * automationMultiplier;
  playSound('tapSound');
  showFirework();
  updateUI();
  saveGame();
}

function upgradeProduct() {
  if (money >= 100 * level) {
    money -= 100 * level;
    if (productIndex < products.length - 1) {
      productIndex++;
      level++;
      showMessage("🎉 Upgraded to " + products[productIndex] + "!");
    } else {
      level++;
      showMessage("⭐ Upgraded to Level " + level + "!");
    }
    playSound('upgradeSound');
    updateUI();
    saveGame();
  } else {
    showMessage("❌ Not enough money to upgrade product!");
  }
}

function upgradeAutomation() {
  if (money >= 200 * level) {
    money -= 200 * level;
    automationMultiplier += 0.5;
    showMessage("⚡ Automation Boosted!");
    playSound('upgradeSound');
    updateUI();
    saveGame();
  } else {
    showMessage("❌ Not enough money to upgrade automation!");
  }
}

function hireManager() {
  if (!managerHired && money >= 500) {
    money -= 500;
    managerHired = true;
    showMessage("👨‍💼 Manager Hired! Auto Production Started!");
    playSound('upgradeSound');
    updateUI();
    saveGame();
  } else if (managerHired) {
    showMessage("✅ Manager already hired!");
  } else {
    showMessage("❌ Not enough money to hire a manager!");
  }
}

function updateUI() {
  document.getElementById('product').innerText = "Product: " + products[productIndex];
  document.getElementById('money').innerText = "💰 Money: $" + Math.floor(money);
  document.getElementById('level').innerText = "📈 Level: " + level;
  document.getElementById('progressBar').style.width = progress + "%";
}

function showMessage(text) {
  const messageElement = document.getElementById('message');
  messageElement.innerText = text;
  setTimeout(() => {
    messageElement.innerText = "";
  }, 3000);
}

function saveGame() {
  const saveData = {
    productIndex,
    money,
    level,
    automationMultiplier,
    managerHired
  };
  localStorage.setItem('factorySave', JSON.stringify(saveData));
}

function playSound(id) {
  const sound = document.getElementById(id);
  sound.currentTime = 0;
  sound.play();
}

// Fireworks Effect
const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let fireworks = [];

function showFirework() {
  fireworks.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 0,
    alpha: 1
  });
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((fw, index) => {
    ctx.beginPath();
    ctx.arc(fw.x, fw.y, fw.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${fw.alpha})`;
    ctx.fill();
    fw.radius += 2;
    fw.alpha -= 0.02;
    if (fw.alpha <= 0) fireworks.splice(index, 1);
  });
  requestAnimationFrame(animateFireworks);
}
animateFireworks();
