import {ctx, canvas, cellSize, restart} from './index.js';
import {getScore} from "./score.js";

export let isGameOver = false;

export function gameOver() {
    isGameOver = true

    ctx.fillStyle = 'white';
    ctx.fillRect(cellSize * 5, cellSize * 5, cellSize * 10, cellSize * 10)

    ctx.fillStyle = "blue";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("Game Over", (canvas.width / 2), (canvas.height / 2 - 20));
    ctx.fillText("Score: " + getScore(), (canvas.width / 2), (canvas.height / 2));
    ctx.fillText('Press "R" to restart', (canvas.width / 2), (canvas.height / 2 + 20));

    window.addEventListener('keydown', gameRestart)
}

export function gameRestart(e) {
    if (e.key === 'r') {
        restart();
    }
}
export function resetIsGameOver() {
    isGameOver = false;
}