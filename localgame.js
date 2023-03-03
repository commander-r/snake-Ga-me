const GAME_SPEED = 50;
const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "lightgreen";
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
let score2 = 0;
// The direction of the snake
let dx = 10;
let dy = 0;

let snake2 = [
  {x: 250, y: 250},
  {x: 240, y: 250},
  {x: 230, y: 250},
  {x: 220, y: 250},
  {x: 210, y: 250}
];

let dx2 = -10;
let dy2 = 0;

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
  snake2.forEach(function isOnSnake(part2) {
    if (part2.x == food.x && part2.y == food.y) {
      createFood();
    }
  });
}
  


// Draw the snake
function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawSnake2() {
  snake2.forEach(drawSnakePart2);
}

// Draw a single part of the snake
function drawSnakePart(snakePart) {
  ctx.fillStyle = "green";
  ctx.strokeStyle = "black";
  
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnakePart2(snakePart2) {
  ctx.fillStyle = 'blue';
  ctx.strokeStyle = 'darkblue';
  
  ctx.fillRect(snakePart2.x, snakePart2.y, 10, 10);
  ctx.strokeRect(snakePart2.x, snakePart2.y, 10, 10);
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
 function moveSnake2() { 
  let head2 = {x: snake2[0].x + dx2, y: snake2[0].y + dy2};
  
  // Add the new head to the beginning of the snake array
  snake2.unshift(head2);
  
  // Check if the snake has eaten food
  if (snake2[0].x === food.x && snake2[0].y === food.y) {
    score2 += 1;
    createFood();
  } else {
    // Remove the tail of the snake
    snake2.pop();
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

document.addEventListener("keydown", function(event) {
if (event.key === "a" && dx2 !== 10) {
dx2 = -10;
dy2 = 0;
} else if (event.key === "w"&& dy2 !== 10) {
dx2 = 0;
dy2 = -10;
} else if (event.key === "d" && dx2 !== -10) {
dx2 = 10;
dy2 = 0;
} else if (event.key === "s" && dy2 !== -10) {
dx2 = 0;
dy2 = 10;
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
moveSnake2();

// Check if the snake has collided with the wall or itself
if (hasGameEnded()){
gameOver1() 
return;
}

if (hasGameEnded2()){
gameOver2() 
return;
}

// Check if the snake has eaten food
if (snake[0].x === food.x && snake[0].y === food.y) {
score += 1;
createFood();
}
if (snake2[0].x === food.x && snake2[0].y === food.y) {
score2 += 1;
createFood();
}

// Draw the snake and the food
drawSnake();
drawSnake2();
drawFood();

// Draw the score
drawScore();
drawScore2();

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
if  (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) 
return true;

  for (let i = 1; i < snake2.length; i++) {
	   if (snake[0].x === snake2[i].x && snake[0].y === snake2[i].y)
	   return true;
   }

}

function hasGameEnded2() {
   for (let i = 4; i < snake2.length; i++) {
      if (snake2[i].x === snake[0].x && snake2[i].y === snake[0].y) {
         return true;
      }  
   } 
const hitLeftWall2 = snake2[0].x < 0;
const hitRightWall2 = snake2[0].x > canvas.width - 10;
const hitTopWall2 = snake2[0].y < 0;
const hitBottomWall2 = snake2[0].y > canvas.height - 10;
if  (hitLeftWall2 || hitRightWall2 || hitTopWall2 || hitBottomWall2) 
return true; 


   for (let i = 1; i < snake2.length; i++) {
	   if (snake[0].x === snake2[i].x && snake[0].y === snake2[i].y)
	   return true;

}

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
ctx.fillText("Score Green: " + score, canvas.width - 150, 30);
}

function drawScore2() {
ctx.fillStyle = "black";
ctx.font = "20px Arial";
ctx.fillText("Score Blue: " + score2, canvas.width - 380, 380);
}

function gameOver1() {
  // Set the canvas styles
  ctx.fillStyle = "black";
  ctx.font = "30px Courier New ";
  
  // Draw the Game Over message
  ctx.fillText("GRÜN hat verloren", canvas.width / 2 - 150, canvas.height / 3);
  
  // Draw the score
  ctx.fillText("Score von GRÜN: " + score, canvas.width / 2 - 150,canvas.height / 2 * 1.2);
  ctx.fillText("Score von BLAU: " + score2, canvas.width / 2 - 150,canvas.height / 2 * 1.4);
  
  
}
function gameOver2() {
  // Set the canvas styles
  ctx.fillStyle = "black";
  ctx.font = "30px Courier New ";
  // Draw the Game Over message
  ctx.fillText("BLAU hat verloren", canvas.width / 2 - 150, canvas.height / 3);
  
  // Draw the score
 ctx.fillText("Score von GRÜN: " + score, canvas.width / 2 - 150,canvas.height / 2 * 1.2);
 ctx.fillText("Score von BLAU: " + score2, canvas.width / 2 - 150,canvas.height / 2 * 1.4);
  
}

//function PlayAgain() {
//	score = 0;
//	score2 = 0;
	
//createFood();
//setTimeout(main, GAME_SPEED);

//}

//document.addEventListener("keydown", function(event) {
//		if (event.code === "KeyR")
//		PlayAgain();
//});


// Start the game
createFood();
setTimeout(main, GAME_SPEED);




