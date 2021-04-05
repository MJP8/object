function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function pause(ms) {
    await sleep(ms);
}
class Sprite {
    constructor(width = '10px', height = '10px', x = '50%', y = '0%', color = '#000', speed = 1000) {
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.createElement = function() {
            let elem = $('<div id="sprite"></div>');
            elem.css('width', width);
            elem.css('height', height);
            elem.css('position', 'absolute');
            elem.css('left', this.x);
            elem.css('top', this.y);
            elem.css('background', color);
            $('.game').append(elem);
        }
    }
}
class Enemy extends Sprite {
    constructor(visibility = 1, lives = 1, speed = 1000) {
        super('10px', '10px', '50%', '0%', '#000', speed);
        this.lives = lives;
        this.visibility = visibility;
        this.moveToX = Math.round(Math.random() * $(window).width());
        this.moveToY = Math.round(Math.random() * $(window).height());
        this.checkVisibility = function() {
            $('#sprite').addClass('enemy');
            if (this.visibility == 0) {
                $('.enemy').css('opacity', 0.1);
            } else {
                $('.enemy').css('opacity', 1);
            }
        }
        this.move = function() {
            $('#sprite').addClass('enemy');
            $('.enemy').animate({ left: '+=' + this.moveToX + 'px', top: '+=' + this.moveToY + 'px' }, 'fast');
        }
    }
}
enemy = new Enemy();
enemy.createElement();
enemy.checkVisibility();
for (let i = 0; i < 7; i++) {
    enemy.move();
    let text_object = {
        left: $('.enemy').css('left'),
        top: $('enemy').css('top'),
        width: $('.enemy').css('width'),
        height: $('.enemy').css('height')
    }
    text_object.left.replace('px', '');
    text_object.left = parseInt(text_object.left);
    text_object.top.replace('px', '');
    text_object.top = parseInt(text_object.top);
    text_object.width.replace('px', '');
    text_object.width = parseInt(text_object.width);
    text_object.height.replace('px', '');
    text_object.height = parseInt(text_object.height);
    enemy.moveToX = Math.round(Math.random() * (($(window).width() - text_object.left) - text_object.width));
    enemy.moveToY = Math.round(Math.random() * (($(window).height() - text_object.top) - text_object.height));
}