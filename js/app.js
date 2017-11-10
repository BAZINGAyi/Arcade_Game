// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x * 101;
    this.y = y * 83;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (dt * 50 + this.x)%505;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
   this.x = x * 101;
   this.y = y * 83;
   this.character = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    dt = dt + 1;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.character), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    switch(keyCode)
    {
        case "up":
            this.y = (this.y - 101 === -101 ? 606 : this.y - 101);
            break;
        case "down":
            this.y = (this.y + 101)%606;
            break;
        case "right":
            this.x = (this.x + 101)%505;
            break;
        case "left":
            this.x = (this.x - 101 === -101 ? 505 : this.x - 101);
            break;
        default:
        break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0,0);
var enemy2 = new Enemy(1,0);
var enemy3 = new Enemy(0,1);
var enemy4 = new Enemy(1,2);
var enemy5 = new Enemy(2,3);
var enemy6 = new Enemy(3,2);
var enemy7 = new Enemy(2,2);
var enemy8 = new Enemy(3,4);

var allEnemies =[enemy1,enemy2,enemy3,enemy4,enemy5,enemy6,enemy7,enemy8];
var player = new Player(1,5);

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
