import Cell from "./Cell.js";
import {cellSize, canvas} from "./index.js";
import {getMoveDir} from "./input.js";
import {gameOver} from "./gameOver.js";

const moveDir = getMoveDir();

export class Snake {
    constructor() {
        this.head = new Cell(cellSize, cellSize)
        this.body = [
            this.head,
            new Cell(this.head.position.x, this.head.position.y),
        ]
    }
    move() {
        for (let i = this.body.length - 2; i >= 0; i--) {
            this.body[i + 1].updatePosition(this.body[i].position.x, this.body[i].position.y)
        }
        this.head.updatePosition(
            this.head.position.x + moveDir.x * cellSize,
            this.head.position.y + moveDir.y * cellSize
        )
    }
    checkCollision() {
        // check if collision with the body
        if (this.body.length > 3 && this.body.some((cell, index) => {
            return (index !== 0 &&
                cell.position.x === this.head.position.x &&
                cell.position.y === this.head.position.y)
        })) {
            // on collision with the body
            gameOver()
        }

        // check if collision with borders
        if (
            this.head.position.x < 0 ||
            this.head.position.x >= canvas.width ||
            this.head.position.y < 0 ||
            this.head.position.y >= canvas.height
        ) {
            // on collision with borders
            gameOver()
        }
    }
    checkCollisionWithFruit(fruitX, fruitY, newFruitPosFunc) {
        // check if collision with fruit
        if (this.head.position.x === fruitX && this.head.position.y === fruitY) {
            // on collision with fruit
            this.body.push(new Cell(0, 0));
            newFruitPosFunc();
        }
    }
}