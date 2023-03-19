import {Vector2} from "./Vector2.js";
import {moveDir, getIsBallAttachedToPlayer, setIsBallAttachedToPlayer} from "./input.js";
import {Player} from "./Player.js";
import {Ball} from "./Ball.js";
import {platforms, createPlatforms, destroy} from "./platforms.js";
import {gameRestart, resetIsGameStop, gameStop, isGameStop} from "./gameStop.js";

const canvas = document.querySelector('#arkanoid');
const ctx = canvas.getContext('2d');

const
    // game
    GAME_UPDATES_PER_SECOND = 60,
    // deviation from direction pointing to Math.PI / 2
    // the ball cannot bounce straight up from the player
    maxDeviation = .13,
    minDeviation = .03,
    // platform
    platformWidth = 100,
    platformHeight = 40,
    platformGap = 10,
    rows = 4,
    cols = 8,
    // player
    playerWidth = 200,
    playerHeight = 20,
    playerMarginTop = 400,
    playerMarginBottom = 30,
    playerSpeed = 10,
    // ball
    ballRadius = 10,
    ballSpeed = 10;


canvas.width = (platformWidth + platformGap) * cols + platformGap;
canvas.height = playerMarginTop + (platformHeight + platformGap) * rows + platformGap;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// game objects

let player;
let ball;
let ballMoveDir;

export function arkanoidStart() {
    resetIsGameStop();
    player = new Player(
    canvas.width / 2 - playerWidth / 2,
        canvas.height - playerMarginBottom,
        playerWidth, playerHeight,
        ctx,
    );
    ball = new Ball(
        player.getPosition().x + player.getWidth() / 2,
        player.getPosition().y - ballRadius,
        ballRadius,
        ctx,
    );
    ballMoveDir = new Vector2(0, 0);
    ballMoveDir.changeDir(
        getStraightUpDirWithDeviation(),
        ballRadius
    );
    createPlatforms({
        width: platformWidth,
        height: platformHeight,
        gap: platformGap,
        rows,
        cols,
        ctx,
    })
    setIsBallAttachedToPlayer(true);
    window.requestAnimationFrame(main);
    window.removeEventListener('keydown', gameRestart);
}
arkanoidStart()

let lastUpdateTime = 0;
function main(currentTime) {
    if (isGameStop) {
        return
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastUpdate = (currentTime - lastUpdateTime) / 1000;

    if (secondsSinceLastUpdate >= 1 / GAME_UPDATES_PER_SECOND) {
        lastUpdateTime = currentTime;

        // updates GAME_UPDATES_PER_SECOND times per second
        fixedUpdate();
    }
}

function fixedUpdate() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.move(moveDir.normalized(), playerSpeed)
    if (getIsBallAttachedToPlayer()) {
        // the ball moves with the player
        ball.move(
            moveDir.normalized(),
            ballSpeed,
        );
    } else {
        // the ball moves on its own
        ball.move(
            ballMoveDir.normalized(),
            ballSpeed,
        );
    }
    platforms.forEach(platform => {
        platform.draw()
        ball.collision({
            moveDir: ballMoveDir,
            speed: ballSpeed,
            obstacle: platform,
            player,
            destroyFunc: destroy,
            deviationFunc: getStraightUpDirWithDeviation(),
        })
    })
    ball.collision({
        moveDir: ballMoveDir,
        speed: ballSpeed,
        obstacle: player,
        player,
        destroyFunc: destroy,
        deviationFunc: getStraightUpDirWithDeviation(),
    });
    ball.borderCollision(
       ballMoveDir,
       ballSpeed,
       canvas,
       () => gameStop(canvas, ctx, 'Game Over'),
    )

    // checks if the player has won
    if (platforms.length <= 0) {
        gameStop(canvas, ctx, 'Victory!!!');
    }
}

function getStraightUpDirWithDeviation() {
    return Math.random() >= 0.5
        ? minDeviation + Math.PI / 2 + Math.random() * (maxDeviation - minDeviation)
        : Math.PI / 2 - minDeviation - maxDeviation + Math.random() * (maxDeviation - minDeviation)
}
