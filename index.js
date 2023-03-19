const canvas = document.querySelector("canvas[id='test']");
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = .2;

class Sprite {
    constructor({position, velocity, color}) {
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.height = 150;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
            this.position.y = canvas.height - this.height;
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: '#26ff00',
})


const enemy = new Sprite({
    position: {
        x: 400,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: '#ff0000',
})

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}
let lastKey;

function animate() {

    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -2;
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 2;
    }
}
animate();

window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyD') {
        player.velocity.x = 2;
        keys.d.pressed = true;
        lastKey = 'd';
    }
    if (e.code === 'KeyA') {
        player.velocity.x = -2;
        keys.a.pressed = true;
        lastKey = 'a';
    }
    if (e.code === 'Space') {
        player.velocity.y = -10;
    }
})
window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyD') {
        player.velocity.x = 0;
        keys.d.pressed = false;
    }
    if (e.code === 'KeyA') {
        player.velocity.x = 0;
        keys.a.pressed = false;
    }
})