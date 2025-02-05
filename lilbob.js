// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;

// Listen for arrow key presses
document.addEventListener("keydown", changeDirection);

// Game loop
setInterval(gameLoop, 100);

// Function to update the game
function gameLoop() {
    if (isGameOver()) {
        alert("Game Over! Your score: " + score);
        document.location.reload();
    }

    moveSnake();
    if (hasEatenFood()) {
        growSnake();
        food = generateFood();
        score += 10;
    } else {
        snake.pop(); // Remove tail
    }

    drawGame();
}

// Move the snake
function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;

    snake.unshift(head);
}

// Change direction
function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    if (key === 38 && direction !== "DOWN") direction = "UP";
    if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    if (key === 40 && direction !== "UP") direction = "DOWN";
}

// Check if the snake eats food
function hasEatenFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

// Grow the snake
function growSnake() {
    snake.push({}); // Add new segment at the end
}

// Generate new food position
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
}

// Check for game over conditions
function isGameOver() {
    let head = snake[0];

    // Check collision with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Check collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

// Draw everything on canvas
function drawGame() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
    });

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}
