import {ctx, cellSize} from './index.js';

class Cell {
    constructor(x, y, type) {
        this.position = {
            x,
            y,
        };
        this.ctx = ctx;
        this.size = cellSize;
        this.type = type === 'fruit' ? 'fruit' : 'snake';
    }

    draw() {
        this.ctx.fillStyle = this.type === 'snake' ? 'green' : 'red';
        this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

    updatePosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        this.draw();
    }
}

export default Cell;