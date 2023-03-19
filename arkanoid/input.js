import {Vector2} from "./Vector2.js";

export const moveDir = new Vector2(0, 0)

let leftPressed = false;
let rightPressed = false;
let isBallAttachedToPlayer = true;

export function getIsBallAttachedToPlayer() {
    return isBallAttachedToPlayer;
}
export function setIsBallAttachedToPlayer(newState) {
    isBallAttachedToPlayer = newState;
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'a' || e.key === 'ArrowLeft') {
        moveDir.x = -1;
        leftPressed = true;
    }
    if (e.key === 'd' || e.key === 'ArrowRight') {
        moveDir.x = 1;
        rightPressed = true;
    }
    if (e.key === 'w' || e.key === 'ArrowUp' || e.code === 'Space') {
        isBallAttachedToPlayer = false;
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
            moveDir.x = 0;
            leftPressed = false;
            if (rightPressed) {
                moveDir.x = 1;
            }
            break;
        case 'd':
            moveDir.x = 0;
            rightPressed = false;
            if (leftPressed) {
                moveDir.x = -1;
            }
            break;
    }
})