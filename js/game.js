"use strict";
const event_lose = new CustomEvent("endgame", { detail: { name: "lose" }, });
const event_win = new CustomEvent("endgame", { detail: { name: "win" }, });
const obj = new EventTarget();
let draw;
window.onload = function() {
    setup("Pass the enemy");
}

function setup(title) {
    document.title = title;
    const canvas = new Canvas();
    draw = () => canvas.draw();
    draw();
    canvas.c.font = "50px monospace";
    canvas.c.fillText("Use the left and right arrow keys to", 50, 50);
    canvas.c.fillText("pass the enemy.", 50, 150);
    setTimeout(() => {
        canvas.c.clearRect(0, 0, canvas.width, canvas.height);
        canvas.start_game();
    }, 2000);
}
class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.c = this.canvas.getContext("2d");
        this.player = new Player(50, 400, 100);
        this.enemy = new Enemy(900, 400, 100);
        this.sprites = [this.player, this.enemy];
        obj.addEventListener("endgame", () => {
            this.c.font = "50px monospace";
            this.c.fillText("Game Over", 50, 50);
        });
    }
    start_game() {
        this.draw();
        this.player.check_keys(this.c, this.enemy);
        this.enemy.guard(this.c, this.player);
    }
    draw() {
        this.draw_background();
        this.player.draw_sprite(this.c);
        this.enemy.draw_sprite(this.c);
    }
    draw_background() {
        this.c.fillStyle = "#44e0ff";
        this.c.fillRect(0, 0, this.width, this.height);
        this.c.fillStyle = "#555555";
        this.c.fillRect(0, 450, this.width, this.height - 450);
    }
}
class Sprite {
    constructor(color, x, y, size) {
        this.color = color;
        this.size = size;
        this.x = x;
        this.y = y;
        this.on = true;
        let self = this;
        obj.addEventListener("endgame", () => {
            self.on = false;
        });
    }
    draw_sprite(c = document.getElementById("canvas").getContext("2d")) {
        c.beginPath();
        c.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
    }
    move(x_increment, y_increment, c, sprite) {
        if (this.on) {
            c.clearRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
            this.x += x_increment;
            this.y += y_increment;
            draw();
            if (this.is_touching(sprite) && this.color == "black") {
                sprite.color = "black";
                sprite.draw_sprite(c);
                obj.dispatchEvent(event_lose);
            }
        }
    }
    is_touching(sprite) {
        let a;
        let b;
        let c;
        if (this.x > sprite.x) {
            a = this.x - sprite.x;
        } else {
            a = sprite.x - this.x;
        }
        if (this.y > sprite.y) {
            b = this.y - sprite.y;
        } else {
            b = sprite.y - this.y;
        }
        c = Math.sqrt(a * a + b * b);
        let size;
        if (this.size >= sprite.size) {
            size = this.size;
        } else {
            size = sprite.size;
        }
        if (c < size) {
            return true;
        } else {
            return false;
        }
    }
}
class Player extends Sprite {
    constructor(x, y, size) {
        super("green", x, y, size);
    }
    check_keys(c, sprite) {
        $(document).on('keydown', (event) => {
            if (event.which == 39) {
                this.move(10, 0, c, sprite);
            } else if (event.which == 37) {
                this.move(-10, 0, c, sprite);
            } else if (event.which === 38) {
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        this.move(0, -5, c, sprite);
                    }, 30);
                }
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        this.move(0, 5, c, sprite);
                    }, 30);
                }
            }
        });
    }
}
class Enemy extends Sprite {
    constructor(x, y, size) {
        super("black", x, y, size);
    }
    guard(c, sprite) {
        let down = true;
        let speed = 10;
        setInterval(() => {
            if (down) {
                this.move(0, speed, c, sprite);
            } else {
                this.move(0, 0 - speed, c, sprite);
            }
            if (this.y >= 585) {
                down = false;
            } else if (this.y <= 50) {
                down = true;
            }
        }, 30);
    }
}