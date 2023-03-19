import {resetScore, scoreInc} from './score.js';
import {resetMoveDir, setIsInputToFalse} from "./input.js";
import {Snake} from "./Snake.js";
import {Fruit} from "./Fruit.js";
import {gameRestart, isGameOver, resetIsGameOver} from "./gameOver.js";
import {getGameUpdatesPerSecond} from "./difficulty.js";

export const canvas = document.querySelector('#snakeBoard');
export const ctx = canvas.getContext('2d');

export const cellSize = 25;
export const rows = 20;
export const cols = 20;
let lastUpdateTime = 0;

canvas.width = cellSize * cols;
canvas.height = cellSize * rows;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let snake;
let fruit;

export function restart() {
    resetScore();
    resetMoveDir();
    resetIsGameOver();
    snake = new Snake();
    fruit = new Fruit();
    window.requestAnimationFrame(main);
    window.removeEventListener('keydown', gameRestart);
}
restart();

function main(currentTime) {
    if (isGameOver) {
        return
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastUpdate = (currentTime - lastUpdateTime) / 1000;

    if (secondsSinceLastUpdate >= 1 / getGameUpdatesPerSecond()) {
        lastUpdateTime = currentTime;

        fixedUpdate()
    }
}

function fixedUpdate() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fruit.draw()
    snake.move()
    snake.checkCollision()
    snake.checkCollisionWithFruit(
        fruit.body.position.x,
        fruit.body.position.y,
        () => {
            scoreInc()
            fruit.getNewPosition(snake.body)
        },
    )
    setIsInputToFalse()
}

