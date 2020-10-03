let lastRenderTimestamp = 0;
const snake_speed = 5;
let gameOver = false;
let score = 0;

const board = document.querySelector(".board");

// currentTimestamp is DOMHighResTimeStamp, which indicates the current time (based on the number of milliseconds since time origin)
function main(currentTimestamp) {
    if (gameOver) {
        // if (confirm('You Lost. Press OK to restart.')) {
        //     // Refreshing the window;
        //     window.location = '/';
        // }
        const gameOverScreen = document.querySelector('#overlay');
        gameOverScreen.style.display = "block";
        gameOverScreen.addEventListener('click', () => {
            board.innerHTML = '';
            gameOverScreen.remove();
            location.reload();
            return;
        })
    }

    window.requestAnimationFrame(main);
    const secSinceLastRender = (currentTimestamp - lastRenderTimestamp) / 1000;
    // We divide by 1000 as currentTimestamp value is given in microseconds

    // Don't render the frame when seconds passed are less than 1/speed seconds
    if (secSinceLastRender < 1 / snake_speed) return
    // console.log("Render", currentTimestamp);
    lastRenderTimestamp = currentTimestamp;

    updateSnake();
    updateFood();
    updateScore();
    checkForDeath();
    board.innerHTML = '';
    drawSnake(board);
    drawFood(board);

}

window.requestAnimationFrame(main);

// ======================================================= //

// Snake Body 

let snake_body = [
    { x: 15, y: 15 }
];
let newBodySegments = 0;
const expansionRate = 1;

function updateSnake() {
    addSegments();
    const inputDirection = getInputDirection();

    for (let i = snake_body.length - 2; i >= 0; i--) {
        snake_body[i + 1] = { ...snake_body[i] }
    }
    snake_body[0].x += inputDirection.x;
    snake_body[0].y += inputDirection.y;

}

function drawSnake(board) {

    snake_body.forEach(bodySegment => {
        const snakeBodyElement = document.createElement("div");
        snakeBodyElement.style.gridRowStart = bodySegment.y;
        snakeBodyElement.style.gridColumnStart = bodySegment.x;
        snakeBodyElement.classList.add("snake");
        board.appendChild(snakeBodyElement);
    })

}

function addSegments() {
    for (let i = 0; i < newBodySegments; i++) {
        snake_body.push({ ...snake_body[snake_body.length - 1] });
    }
    newBodySegments = 0;
}

function expandSnake(amount) {
    newBodySegments += amount
    score += 1;
}

function isFoodOnSnake(position) {
    return snake_body.some((segment) => {
        console.log(position, segment);
        return segment.x == position.x && segment.y == position.y;
    })
}

// ============================================================= //

// Food

let food = { x: 10, y: 10 };


function updateFood() {
    if (isFoodOnSnake(food)) {
        expandSnake(expansionRate);
        food = getRandomPosition();
    }
}
function getRandomPosition() {
    let newFoodPos;
    // Keep fetching random positions until the position is not on Snake
    while ((newFoodPos == null) || isFoodOnSnake(newFoodPos)) {
        // 30 is the grid size
        newFoodPos = {
            x: Math.floor(Math.random() * 30) + 1,
            y: Math.floor(Math.random() * 30) + 1
        }
    }
    return newFoodPos;
}

function drawFood(board) {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}

// ====================================================================== //

// Game Rules 


function checkForDeath() {
    // Game is over when snake goes out of the grid
    // or when snake intersects itself.
    gameOver = isSnakeOutsideGrid(snake_body[0]) || snakeIntersectsItself()
}

function isSnakeOutsideGrid(snakeHead) {
    return (
        snakeHead.x < 1 || snakeHead.x > 30 || snakeHead.y < 1 || snakeHead.y > 30
    );
}
function snakeIntersectsItself() {
    const snakeBodyWithoutHead = snake_body.slice(1);
    const snakeHead = snake_body[0];
    return snakeBodyWithoutHead.some((segment) => {
        console.log(snakeHead, segment);
        return segment.x == snakeHead.x && segment.y == snakeHead.y;
    })
}

function updateScore() {
    const scoreElem = document.querySelector('#score');
    scoreElem.innerText = `Score: ${score}`;
}


// Taking Input for snake movements

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };


function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (lastInputDirection.y !== 0) return
            inputDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (lastInputDirection.y !== 0) return
            inputDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (lastInputDirection.x !== 0) return
            inputDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (lastInputDirection.x !== 0) return
            inputDirection = { x: 1, y: 0 };
            break;
    }
})

