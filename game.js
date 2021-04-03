class Sprite {
    constructor(width, height, x, y, color, speed) {
        this.speed = speed;
        for (let i = 0; i < 2; i++) {
            let elem = $('<div class="sprite"></div>');
            elem.css('width', width);
            elem.css('height', height);
            elem.css('position', 'absolute');
            elem.css('left', x + i * 20);
            elem.css('top', y);
            elem.css('background', color);
            $('.game').append(elem);
        }
        this.move = function() {

        }
    }
}
class Enemy extends Sprite {
    constructor(visibility, lives) {
        super('10px', '10px', '50%', '0%', '#000', 50);
        $('.sprite').addClass('enemy');
        this.lives = lives;
        this.visibility = visibility;
        if (this.visibility === 0) {
            $('.enemy').css('opacity', 0.1);
        }
    }
}