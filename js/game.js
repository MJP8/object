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
//         $(document).on('keydown', function(event) { // if a key is pressed...
//             if (event.which === 39) { // then if the key the right arrow key...
//                 $('.player').animate({ // then animate it with JQuery...
//                     left: `+=${$('.player').width() * 3}`
//                 }, 'slow'); // and do it slowly
//             } else if (event.which === 37) { // otherwise if the key is the left arrow key...
//                 $('.player').animate({ // then animate it with JQuery...
//                     left: `-=${$('.player').width() * 3}`
//                 }, 'slow'); // and do it slowly
//             } else if (event.which === 38) { // otherwise if it is the up arrow key...
//                 $('.player').animate({ // then animate it with JQuery...
//                     top: `-=${$('.player').width() * 10}`
//                 }, 'slow'); // and do it slowly
//                 if (Math.abs(parseInt($('.player').css('top')) - parseInt($('.treasure').css('top'))) < parseInt($('.treasure').height()) && Math.abs($('.player').css('left') - $('.treasure').css('left')) < $('.treasure').width()) { // if the player is touching the treasure...
//                     win(); // then call the win function
//                 }
//                 $('.player').animate({ // animate it with JQuery again...
//                     top: `+=${$('.player').width() * 10}`
//                 }, 'slow'); // and do it slowly
//             };
//             event.preventDefault();
//         });
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

function setup(title) {
    document.title = title;
    const canvas = new Canvas();
    canvas.start_game();
    setTimeout(function() {
        canvas.player.move(0, 100, canvas.c);
    }, 1000);
}
class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.c = this.canvas.getContext("2d");
        // var img = document.getElementById(id01);
        // ctx.drawImage(img, 0, 0, width, height);
        // img = document.getElementById(id02);
        // ctx.drawImage(img, width - (width / 4.5 * 2), 100, width / 5 * 2, height / 5 * 2);
        // enemy.move(ctx);
        this.player = new Player(50, 50, 100);
        this.enemy = new Enemy(250, 50, 100);
        this.sprites = [this.player, this.enemy];
    }
    start_game() {
        this.player.draw_sprite(this.c);
        this.enemy.draw_sprite(this.c);
    }
}
class Sprite {
    constructor(color, x, y, size) {
        this.color = color;
        this.size = size;
        this.x = x;
        this.y = y;
    }
    draw_sprite(c = document.getElementById("canvas").getContext("2d")) {
        c.beginPath();
        c.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
    }
    move(x_increment, y_increment, c) {
        c.clearRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        this.x += x_increment;
        this.y += y_increment;
        this.draw_sprite(c);
    }
}

class Player extends Sprite {
    constructor(x, y, size) {
        super("blue", x, y, size);
    }
}

class Enemy extends Sprite {
    constructor(x, y, size) {
        super("black", x, y, size);
        this.move = function(ctx) {
            for (let i = this.x; i < (this.x + 100); i++) {
                this.x = i;
                this.createSprite(ctx, window.innerHeight);
            }
        }
    }
}