// table detail
var tableWidth = 505;
var tableHeight = 606;

// move element details
var generalWidth = 101;
var generalheight = 83;
var offsetY = 20;

// enemies move rate
var enemiesMoveRate = 20;

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x * generalWidth - generalWidth;
    this.y = y * generalheight - offsetY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var x = (dt * enemiesMoveRate + this.x);

    if (x > tableWidth) {
        x = -generalWidth;
    }

    this.x = x;

    // 如果玩家的位置和 emeny 的面积虫重合那么游戏终止
    CheckOverLap();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
   this.x = x * generalWidth;
   this.y = y * generalheight - offsetY;
   this.character = 'images/char-boy.png';
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.character), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    switch(keyCode)
    {
        case "up":
            this.y = (this.y === 63 ? 5 * 83 -20 : this.y - 83);
            break;
        case "down":
            this.y = (this.y === 395 ? 395 : this.y + 83);
            break;
        case "right":
            this.x = (this.x + 101)%505;
            break;
        case "left":
            this.x = (this.x  === 0 ? 404 : this.x - 101);
            break;
        default:
        break;
    }
};

Player.prototype.resetPosition = function(x,y) {
    this.x = x * generalWidth;
    this.y = y * generalheight - offsetY;
};


function CheckOverLap() {
    var isOverLap = false;

    var playerX = player.x + generalWidth;
    var playerY = player.y + generalheight;
    var playerWidth = generalWidth;
    var playerHeight = generalheight;

    var width;
    var height;

    for (var i = 0; i < allEnemies.length; i++) {

       var enemy = allEnemies[i];

       var enemyX = enemy.x + generalWidth;
       var enemyY = enemy.y + generalheight;
       var enemyWidth = generalWidth;
       var enemyHeight = generalheight;

       var endX = max(playerX,enemyX);
       var startX = min(player.x,enemy.x);
       width = enemyWidth + playerWidth - (endX - startX);

       var endY = max(playerY, enemyY);
       var startY  = min(player.y,enemy.y);
       height = enemyHeight + playerHeight - (endY - startY);

       if (width > 0 && height > 0) {
          isOverLap = true;
          break ;
       }
    }

    if (isOverLap) {
        // touch the enemy
        player.resetPosition(0,5);
        isOverLap = false;
        return true;
    }else {
        return false;
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0,4);
var enemy2 = new Enemy(1,4);
var enemy3 = new Enemy(3,1);
var enemy4 = new Enemy(0,2);
var enemy5 = new Enemy(2,3);
var enemy6 = new Enemy(0,2);
var enemy7 = new Enemy(2,2);
var enemy8 = new Enemy(3,4);
var allEnemies =[enemy1,enemy2,enemy3,enemy4,enemy5,enemy6,enemy7,enemy8];

// var allEnemies =[enemy1];
//
var player = new Player(0,5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
