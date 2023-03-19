import {arkanoidStart} from './index.js';

export let isGameStop = false;

export function gameStop(canvas, ctx, message) {
    isGameStop = true

    ctx.fillStyle = 'white';
    ctx.fillRect(
        canvas.width / 4,
        canvas.height / 4,
        canvas.width - canvas.width / 2,
        canvas.height - canvas.height / 2
    )

    ctx.fillStyle = "blue";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(message, (canvas.width / 2), (canvas.height / 2 - 20));
    ctx.fillText('Press "R" to restart', (canvas.width / 2), (canvas.height / 2 + 20));

    window.addEventListener('keydown', gameRestart)
}

export function gameRestart(e) {
    if (e.key === 'r') {
        arkanoidStart();
    }
}
export function resetIsGameStop() {
    isGameStop = false;
}