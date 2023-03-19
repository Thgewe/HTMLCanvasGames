import {Platform} from "./Platform.js";

export class Player extends Platform {
    constructor(...args) {
        super(...args);
        this._color = 'white';
    }
    move(moveDir, speed) {
        this.setPosition({
            x: this.getPosition().x + moveDir.multiplied(speed).x,
            y: this.getPosition().y + moveDir.multiplied(speed).y
        })
        this.draw();
    }
}