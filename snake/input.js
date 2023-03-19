const moveDir = {
    x: 0,
    y: 0,
}

let isInput = false;

window.addEventListener('keydown', (e) => {
    if (isInput) return
    if ((e.key === 'w' || e.key === 'ArrowUp') && moveDir.y === 0) {
        isInput = true;
        moveDir.x = 0;
        moveDir.y = -1;
    }
    if ((e.key === 'a' || e.key === 'ArrowLeft') && moveDir.x === 0) {
        isInput = true;
        moveDir.x = -1;
        moveDir.y = 0;
    }
    if ((e.key === 's' || e.key === 'ArrowDown') && moveDir.y === 0) {
        isInput = true;
        moveDir.x = 0;
        moveDir.y = 1;
    }
    if ((e.key === 'd' || e.key === 'ArrowRight') && moveDir.x === 0) {
        isInput = true;
        moveDir.x = 1;
        moveDir.y = 0;
    }
})

export function getMoveDir() {
    return moveDir;
}
export function setIsInputToFalse() {
    isInput = false;
}
export function resetMoveDir() {
    moveDir.x = 0;
    moveDir.y = 0;
}
