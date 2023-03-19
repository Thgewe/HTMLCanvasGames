export class Platform {
    constructor(x, y, width, height, ctx) {
        this._height = height;
        this._width = width;
        this._color = 'green';
        this._position = {
            x,
            y,
        }
        this._ctx = ctx;
    }

    getHeight() {
        return this._height;
    }
    getWidth() {
        return this._width;
    }
    getPosition() {
        return this._position;
    }
    setPosition(newPosition) {
        this._position.x = newPosition.x;
        this._position.y = newPosition.y;
    }

    draw() {
        this._ctx.fillStyle = this._color;
        this._ctx.fillRect(this._position.x, this._position.y, this._width, this._height);
    }
}