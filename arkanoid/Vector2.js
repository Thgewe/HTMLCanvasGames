export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this._angle = (Math.atan2(y, x));
    }
    getDirAngleRad() {
        return this._angle
    }
    normalized() {
        // return {
        //     x: this.x / Math.sqrt(this.x * this.x + this.y * this.y),
        //     y: this.y / Math.sqrt(this.x * this.x + this.y * this.y),
        // };
        return new Vector2(
            isNaN(this.x / Math.sqrt(this.x * this.x + this.y * this.y)) ?
                 0 : this.x / Math.sqrt(this.x * this.x + this.y * this.y),
            isNaN(this.y / Math.sqrt(this.x * this.x + this.y * this.y)) ?
                0 : this.y / Math.sqrt(this.x * this.x + this.y * this.y)
            )
    }
    changeDir(angleRad, radius) {
        this._angle = angleRad
        this.x = Math.cos(angleRad) * radius;
        this.y = Math.sin(angleRad) * radius;
    }
    multiplied(multiplier) {
        return {x: this.x * multiplier, y: this.y * multiplier}
    }
    static getVectorLength(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
    }
}