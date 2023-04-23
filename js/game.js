"use strict";
// function move() { // create a function to make the enemy move
//     enemy.move(); // call the enemy object's move method
//     enemy.moveToX = Math.round(Math.random() * ($(window).width() - text_object.width)); // add a random x for the enemy to move to
//     enemy.moveToY = Math.round(Math.random() * ($(window).height() - text_object.height)); // add a random y for the enemy to move to
// };

// function game_over() { // create a function to do when the game is over
//     document.getElementsById('game').style.display ='none'; // $('.game').hide(); // use JQuery to hide the game
//     $('.game_over').show(); // use JQuery to show the message
// };

// function win() { // create a function that runs when you win
//     $('.win').show(); // show the message with JQuery
//     $('.game').hide(); // hide the rest of the game
// };
// class Enemy { // create a enemy sprite class
//     constructor(visibility) {
//         this.x = '0%'; // set the x to zero percent 
//         this.visibility = visibility; // set if it is visible or not
//         this.moveToX = Math.round(Math.random() * $(window).width()); // create a random x for the enemy to move to
//         this.moveToY = Math.round(Math.random() * $(window).height()); // create a random y  for the enemy to move to
//         this.checkVisibility = function() { // create a method to check its visiblity
//             if (this.visibility == 0) { // if the visibility is 0...
//                 $('.enemy').css('background-image', 'url(\'img/transparent_enemy.png\')'); // then use JQuery to set the code inside to a different image
//             } else { // otherwise...
//                 $('.enemy').css('background-image', 'url(\'img/enemy.png\')'); // then use JQuery to set the code inside it to the default image 
//             };
//         };
//         this.move = function() { // create a method to move the enemy
//             this.elem.class = "enemy"; // add a class with JQuery 
//             $('.enemy').animate({ left: this.moveToX + 'px' }, 1000); // animate it to a random number with JQuery
//         };
//     };
// };
// class Player { // create a player sprite class
//     constructor(visibility) {
//         this.visibility = visibility;
//         setInterval(function() { // repeat this with a interval in between
//             if (Math.abs(parseInt($('.player').css('left')) - parseInt($('.enemy').css('left'))) < parseInt($('.enemy').width()) && Math.abs(parseInt($('.player').css('top')) - $('.enemy').css('top')) < $('.enemy').height()) { // if the player if touching the enemy...
//                 game_over(); // then call the game_over function
//             } else if (Math.abs(parseInt($('.player').css('top')) - parseInt($('.treasure').css('top'))) < parseInt($('.treasure').height())) { // otherwise if the player is touching the treasure...
//                 win(); // then call the win function
//             };
//         }, 1000); // do this each second
// $(document).on('keydown', function(event) { // if a key is pressed...
//     if (event.which === 39) { // then if the key the right arrow key...
//         $('.player').animate({ // then animate it with JQuery...
//             left: `+=${$('.player').width() * 3}`
//         }, 'slow'); // and do it slowly
//     } else if (event.which === 37) { // otherwise if the key is the left arrow key...
//         $('.player').animate({ // then animate it with JQuery...
//             left: `-=${$('.player').width() * 3}`
//         }, 'slow'); // and do it slowly
//     } else if (event.which === 38) { // otherwise if it is the up arrow key...
//         $('.player').animate({ // then animate it with JQuery...
//             top: `-=${$('.player').width() * 10}`
//         }, 'slow'); // and do it slowly
//         if (Math.abs(parseInt($('.player').css('top')) - parseInt($('.treasure').css('top'))) < parseInt($('.treasure').height()) && Math.abs($('.player').css('left') - $('.treasure').css('left')) < $('.treasure').width()) { // if the player is touching the treasure...
//             win(); // then call the win function
//         }
//         $('.player').animate({ // animate it with JQuery again...
//             top: `+=${$('.player').width() * 10}`
//         }, 'slow'); // and do it slowly
//     };
//     event.preventDefault();
// });
//         this.checkVisibility = function() { // create a method to check its visiblity
//             if (this.visibility == 0) { // if the visibility is 0...
//                 $('.player').html('<img src=\'img/transparent_player.png\' />'); // then use JQuery to set the code inside to a different image
//             } else { // otherwise...
//                 $('.player').html('<img src=\'img/player.png\' />'); // then use JQuery to set the code inside it to the default image 
//             };
//         };
//     };
// };
// $('.win').hide(); // use JQuery to hide the \'win\' section
// $('.treasure').css('left', ($(window).width() / 2)); // put the \'treasure\' section in the middle of the page
// $('.game_over').hide(); // hide the \'game_over\' section
// let enemy = new Enemy(1); // create a new object instance of the Enemy class
// let player = new Player(1); // create a new object instance of the Player class
// enemy.checkVisibility(); // call the enemy object's checkVisibility method
// let text_object = { // create a object
//     width: $('.enemy').css('width'), // create a property for the text_object object
//     height: $('.enemy').css('height') // create another property for the text_object object
// };
// text_object.width.replace('px', ''); // edit a property
// text_object.width = parseInt(text_object.width); // edit it again
// text_object.height.replace('px', ''); // edit another property
// text_object.height = parseInt(text_object.height); // edit it again
// setInterval(function() {
//     move(); // call the move function
// }, 1010);
window.onload = function() {
    setup("Pass the enemy");
}
const event_lose = new CustomEvent("endgame", { detail: { name: "lose" }, });
const event_win = new CustomEvent("endgame", { detail: { name: "win" }, });
let draw;

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
const obj = new EventTarget();
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
        console.log("draw");
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
        console.log()
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
            } else if (event.which === 38 && event.which === 39) {
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        this.move(0, -1, c, sprite);
                    }, 30);
                }
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        this.move(1, 0, c, sprite);
                    }, 30);
                }
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        this.move(0, 1, c, sprite);
                    }, 30);
                }
            } else if (event.which === 38 && event.which === 37) {
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        this.move(0, -1, c, sprite);
                    }, 30);
                }
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        this.move(-1, 0, c, sprite);
                    }, 30);
                }
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        this.move(0, 1, c, sprite);
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