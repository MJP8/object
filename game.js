function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function pause(ms) {
    await sleep(ms);
}
class Sprite {
    constructor(width = '10px', height = '10px', x = '50%', y = '0%', color = '#000') {
        this.x = x;
        this.y = y;
        this.test = parseInt(width) / 2;
        this.createElement = function() {
            let elem = $('<div id="sprite"></div>');
            elem.css('width', width);
            elem.css('height', height);
            elem.css('position', 'absolute');
            elem.css('left', this.x);
            elem.css('top', this.y);
            elem.css('background', color);
            elem.css('border-radius', (this.test + 'px'));
            $('.game').append(elem);
        }
    }
}
class Enemy extends Sprite {
    constructor(visibility = 1, lives = 1) {
        super('20px', '20px', '50%', '0%', '#000');
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
            $('.enemy').animate({ left: this.moveToX + 'px', top: this.moveToY + 'px' }, 400);
        }
    }
}
enemy = new Enemy();
enemy.createElement();
enemy.checkVisibility();
for (let i = 0; i < 1000; i++) {
    enemy.move();
    let text_object = {
        width: $('.enemy').css('width'),
        height: $('.enemy').css('height')
    }
    text_object.width.replace('px', '')
    text_object.width = parseInt(text_object.width);
    text_object.height.replace('px', '');
    text_object.height = parseInt(text_object.height);
    enemy.moveToX = Math.round(Math.random() * ($(window).width() - text_object.width));
    enemy.moveToY = Math.round(Math.random() * ($(window).height() - text_object.height));
}