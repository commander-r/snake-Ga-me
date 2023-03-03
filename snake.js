const GAME_SPEED = 50;
const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "lightgreen";
const SNAKE_COLOUR = 'darkgreen';
const SNAKE_BORDER_COLOUR = 'black';
const FOOD_COLOUR = 'red';
const FOOD_BORDER_COLOUR = 'darkred';

// The game canvas
let canvas = document.getElementById("mein-canvas");
let ctx = canvas.getContext("2d");

// Set the canvas background colour
ctx.drawImage = CANVAS_BACKGROUND_COLOUR;
ctx.strokeStyle = CANVAS_BORDER_COLOUR;

// Set the canvas border colour
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);

// The snake
let snake = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150}
];

// The food
let food = {x: 0, y: 0};

// The score
let score = 0;

// The direction of the snake
let dx = 10;
let dy = 0;

// Generate a random number
function randomTen(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

// Generate a new piece of food
function createFood() {
  food.x = randomTen(0, canvas.width - 10);
  food.y = randomTen(0, canvas.height - 10);
  
  // Check if the new food location is inside the snake
  snake.forEach(function isOnSnake(part) {
    if (part.x == food.x && part.y == food.y) {
      createFood();
    }
  });
}

// Draw the snake
function drawSnake() {
  snake.forEach(drawSnakePart);
}

// Draw a single part of the snake
function drawSnakePart(snakePart) {
  ctx.fillStyle = SNAKE_COLOUR;
  ctx.strokeStyle = SNAKE_BORDER_COLOUR;
  
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Move the snake
function moveSnake() {
  // Create a new head for the snake
  let head = {x: snake[0].x + dx, y: snake[0].y + dy};
  
  // Add the new head to the beginning of the snake array
  snake.unshift(head);
  
  // Check if the snake has eaten food
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score += 1;
    createFood();
  } else {
    // Remove the tail of the snake
    snake.pop();
  }
}

// Change the direction of the snake
// The arrow keys
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

// Prevent the snake from reversing
document.addEventListener("keydown", function(event) {
if (event.keyCode === LEFT_KEY && dx !== 10) {
dx = -10;
dy = 0;
} else if (event.keyCode === UP_KEY && dy !== 10) {
dx = 0;
dy = -10;
} else if (event.keyCode === RIGHT_KEY && dx !== -10) {
dx = 10;
dy = 0;
} else if (event.keyCode === DOWN_KEY && dy !== -10) {
dx = 0;
dy = 10;
}
});

// Main game function
function main() {
// Clear the canvas
ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
ctx.strokeStyle = CANVAS_BORDER_COLOUR;

ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);

// Move the snake
moveSnake();

// Check if the snake has collided with the wall or itself
if (hasGameEnded()){
gameOver() 
return;
}

// Check if the snake has eaten food
if (snake[0].x === food.x && snake[0].y === food.y) {
score += 10;
createFood();
}

// Draw the snake and the food
drawSnake();
drawFood();

// Draw the score
drawScore();

// Call the main function again
setTimeout(main, GAME_SPEED);
}

// Check if the game has ended
function hasGameEnded() {
for (let i = 4; i < snake.length; i++) {
if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
return true;
}
}

const hitLeftWall = snake[0].x < 0;
const hitRightWall = snake[0].x > canvas.width - 10;
const hitTopWall = snake[0].y < 0;
const hitBottomWall = snake[0].y > canvas.height - 10;

return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

// Draw the food
function drawFood() {
ctx.fillStyle = FOOD_COLOUR;
ctx.strokeStyle = FOOD_BORDER_COLOUR;

ctx.fillRect(food.x, food.y, 10, 10);
ctx.strokeRect(food.x, food.y, 10, 10);
}

// Draw the score
function drawScore() {
ctx.fillStyle = "black";
ctx.font = "20px Arial";
ctx.fillText("Score: " + score, canvas.width - 100, 30);
}

function gameOver() {
  // Set the canvas styles
  ctx.fillStyle = "black";
  ctx.font = "40px sans serif";
  
  // Draw the Game Over message
  ctx.fillText("Du hast verloren", canvas.width / 2 - 150, canvas.height / 2);
  
  // Draw the score
  ctx.fillText("Score: " + score, canvas.width / 2 - 70, canvas.height / 2 + 50);
  
}


// Start the game
createFood();
setTimeout(main, GAME_SPEED);
