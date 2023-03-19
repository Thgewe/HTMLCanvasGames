// post-hit delay so that there is no simultaneous triggering on the two platforms
let hit = false;

export class Ball {
    constructor(x, y, radius, ctx) {
        this._radius = radius;
        this._center = {
            x,
            y,
        }
        this._ctx = ctx;
    }
    draw() {
        this._ctx.fillStyle = 'white';
        this._ctx.beginPath();
        this._ctx.arc(this.getCenter().x,this.getCenter().y,10,0,Math.PI*2,true); // Внешняя окружность
        this._ctx.fill();
    }
    getCenter() {
        return this._center;
    }
    getRadius() {
        return this._radius;
    }
    setCenter(newPosition) {
        this._center.x = newPosition.x;
        this._center.y = newPosition.y;
    }
    move(moveDir, speed) {
        this.setCenter({
            x: this.getCenter().x + moveDir.multiplied(speed).x,
            y: this.getCenter().y - moveDir.multiplied(speed).y
        })
        this.draw()
    }
    collision({moveDir, speed, obstacle, player, destroyFunc, deviationFunc}) {

        // checks if the ball collides with any game object
        if (
            this.getCenter().x + this.getRadius() + moveDir.normalized().x * speed > obstacle.getPosition().x &&
            this.getCenter().x - this.getRadius() + moveDir.normalized().x * speed < obstacle.getPosition().x + obstacle.getWidth() &&
            this.getCenter().y + this.getRadius() - moveDir.normalized().y * speed > obstacle.getPosition().y &&
            this.getCenter().y - this.getRadius() - moveDir.normalized().y * speed < obstacle.getPosition().y + obstacle.getHeight()
        ) {

            // checks if the ball collides with the player
            if (obstacle === player) {
                const centerX = (obstacle.getWidth()) / 2;
                const between = Math.abs(this.getCenter().x - obstacle.getPosition().x) - Math.abs(centerX)
                const newAngle = between === 0
                    ? (Math.PI / 2)
                    : between < 0
                        ? (Math.PI / 2) * (Math.abs(between) + centerX) / centerX
                        : (Math.PI / 2) * (Math.abs(centerX - between) / centerX)

                moveDir.changeDir(
                    newAngle >= Math.PI - 0.28
                        ? Math.PI - 0.28
                        : newAngle <= 0.28
                            ? 0.28

                            // if directed straight up, then it adds a deviation
                            : newAngle === Math.PI
                                ? deviationFunc()
                                : newAngle,
                    this.getRadius())

            // if not with the player, then the ball collided with the platform
            } else {

                // checks for collision with the top/bottom of the platform
                if (
                    this.getCenter().x > obstacle.getPosition().x &&
                    this.getCenter().x < obstacle.getPosition().x + obstacle.getWidth()
                ) {
                    const newAngleRad = 1.5 * Math.PI - moveDir.getDirAngleRad() + Math.PI / 2
                    moveDir.changeDir(newAngleRad, this.getRadius())
                    destroyFunc(obstacle)

                // checks for collision with the left/right platform border
                } else if (
                    this.getCenter().y > obstacle.getPosition().y &&
                    this.getCenter().y < obstacle.getPosition().y + obstacle.getHeight()
                ) {
                    const newAngleRad = moveDir.getDirAngleRad() > Math.PI
                        ? 3 * Math.PI - moveDir.getDirAngleRad()
                        : Math.PI - moveDir.getDirAngleRad()

                    moveDir.changeDir(newAngleRad, this.getRadius())
                    destroyFunc(obstacle)

                // if not, it means that the collision occurred with the corner
                } else {
                    if (hit) return
                    hit = true;

                    let halfOfPiAmount = 0;

                    // checks which corner of the platform the collision occurred with
                    switch (true) {
                        // left top
                        case (this.getCenter().x <= obstacle.getPosition().x &&
                            this.getCenter().y <= obstacle.getPosition().y):
                            halfOfPiAmount = 2;
                            break;
                        // right top
                        case (this.getCenter().x >= obstacle.getPosition().x + obstacle.getWidth() &&
                            this.getCenter().y <= obstacle.getPosition().y):
                            halfOfPiAmount = 1;
                            break;
                        // left bottom
                        case (this.getCenter().x <= obstacle.getPosition().x &&
                            this.getCenter().y >= obstacle.getPosition().y + obstacle.getHeight()):
                            halfOfPiAmount = 3;
                            break;
                        // right bottom
                        case (this.getCenter().x >= obstacle.getPosition().x + obstacle.getWidth() &&
                            this.getCenter().y <= obstacle.getPosition().y + obstacle.getHeight()):
                            halfOfPiAmount = 4;
                            break;
                        default:
                    }
                    const newAngleRad =
                        Math.PI / 2 * halfOfPiAmount - (moveDir.getDirAngleRad() % (Math.PI / 2)) +
                        Math.floor(moveDir.getDirAngleRad() / Math.PI / 2) * Math.PI / 2
                    moveDir.changeDir(newAngleRad, this.getRadius())
                    destroyFunc(obstacle)
                    setTimeout(() => {
                        hit = false
                    }, 10)
                }
            }
        }
    }
    borderCollision(moveDir, speed, canvas, gameOverFunc) {
        // checks for collision with the left/right game boundary
        if (
            this.getCenter().x - this.getRadius() + moveDir.normalized().x * speed  < 0 ||
            this.getCenter().x + this.getRadius() + moveDir.normalized().x * speed  > canvas.width
        ) {
            const newAngleRad = moveDir.getDirAngleRad() > Math.PI
                ? 3 * Math.PI - moveDir.getDirAngleRad()
                : Math.PI - moveDir.getDirAngleRad()

            moveDir.changeDir(newAngleRad, this.getRadius())
        }

        // checks for collision with the upper bound of the game
        if (this.getCenter().y - this.getRadius() - moveDir.normalized().y * speed < 0) {
            const newAngleRad = 2 * Math.PI - moveDir.getDirAngleRad()

            moveDir.changeDir(newAngleRad, this.getRadius())
        }

        // checks if the ball has gone beyond the bottom of the game
        // checks if the game is lost
        if (this.getCenter().y - this.getRadius() > canvas.height) {
            gameOverFunc()
        }
    }
}