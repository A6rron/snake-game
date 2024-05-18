const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("scoreValue");
const gameOverScreen = document.getElementById("game-over-screen");
const restartButton = document.getElementById("restartButton");

const tileSize = 20;
const gridSize = 20;
const snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let speed = 100;

function drawSnake() {
  ctx.fillStyle = "#00ff00";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });
}

function drawApple() {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    score++;
    scoreDisplay.textContent = score;
    generateApple();
    speed -= 2; // Increase speed
  } else {
    snake.pop();
  }
}

function generateApple() {
  apple = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

function gameOver() {
  clearInterval(gameLoop);
  gameOverScreen.style.display = "flex";
  document.getElementById("finalScore").textContent = score;
}

function restartGame() {
  snake.length = 1;
  snake[0] = { x: 10, y: 10 };
  dx = 0;
  dy = 0;
  score = 0;
  speed = 100;
  scoreDisplay.textContent = score;
  gameOverScreen.style.display = "none";
  generateApple();
  gameLoop = setInterval(update, speed);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawApple();
  moveSnake();
  if (checkCollision()) {
    gameOver();
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (dy === 0) {
        dx = 0;
        dy = -1;
      }
      break;
    case "ArrowDown":
      if (dy === 0) {
        dx = 0;
        dy = 1;
      }
      break;
    case "ArrowLeft":
      if (dx === 0) {
        dx = -1;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx === 0) {
        dx = 1;
        dy = 0;
      }
      break;
  }
});

generateApple();
let gameLoop = setInterval(update, speed);

restartButton.addEventListener("click", restartGame);


