import Cell from "./Cell.js";
import {cellSize, cols, rows} from "./index.js";

export class Fruit {
    constructor() {
        this.body = new Cell(
            Math.floor(Math.random() * cols) * cellSize,
            Math.floor(Math.random() * rows) * cellSize,
            'fruit',
        )
    }
    draw() {
        this.body.draw()
    }
    getNewPosition(snake) {
        const posX = Math.floor(Math.random() * cols) * cellSize;
        const posY = Math.floor(Math.random() * rows) * cellSize;
        if (snake.some((cell) => {
            return (cell.position.x === posX && cell.position.y === posY)
        })) {
            this.getNewPosition(snake)
        } else {
            this.body.updatePosition(posX, posY);
        }
    }
}
