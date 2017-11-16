/********** init data **************/

// table detail
var tableWidth = 505;
var tableHeight = 606;
var tableRows = 5;
var tableColumns = 6;

// move element details
var generalWidth = 101;
var generalheight = 83;
var offsetY = 20;

// enemies move rate
var enemiesMoveRate = 30;

/********** init end ****************/





/********** enemy set **************/

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

    // check whether overlap of player's square and enemy's square
    CheckOverLap();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/********** enemy end **************/





/********** player set**************/

var Player = function(x,y) {
   this.x = x * generalWidth;
   // The Plater's position will on the bottom of table if y don't minus offset
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
            // Player won when the player arrive at river
            if (this.y === generalheight - offsetY) {
                this.y = tableRows * generalheight - offsetY;
                isWin();
            }else {
              this.y = this.y - generalheight;
            }
            break;
        case "down":
            this.y = (this.y === tableRows * generalheight - offsetY ? tableRows * generalheight - offsetY : this.y + generalheight);
            break;
        case "right":
            this.x = (this.x + generalWidth) % tableWidth;
            break;
        case "left":
            this.x = (this.x  === 0 ? tableWidth - generalWidth : this.x - generalWidth);
            break;
        default:
        break;
    }
};

Player.prototype.resetPosition = function(x,y) {
    this.x = x * generalWidth;
    this.y = y * generalheight - offsetY;
};

/********** player end *************/





/********** utils start **************/

function CheckOverLap() {
    var isOverLap = false;

    // get player-rectangle right bottom position
    var playerX = player.x + generalWidth;
    var playerY = player.y + generalheight;
    var playerWidth = generalWidth;
    var playerHeight = generalheight;

    for (var i = 0; i < allEnemies.length; i++) {

       var enemy = allEnemies[i];

       // get enemy-rectangle right bottom position
       var enemyX = enemy.x + generalWidth;
       var enemyY = enemy.y + generalheight;
       var enemyWidth = generalWidth;
       var enemyHeight = generalheight;

       // calculate overlap area
       // get the max value of x in the player‘s and enemy
       var endX = max(playerX, enemyX);
       // get the minutes value of x in the player‘s and enemy
       var startX = min(player.x, enemy.x);
       // get overlap squate in the player‘s and enemy
       var width = enemyWidth + playerWidth - (endX - startX);

       var endY = max(playerY, enemyY);
       var startY  = min(player.y, enemy.y);
       var height = enemyHeight + playerHeight - (endY - startY);

       // If you find overlap in the x and y directions，game is over
       if (width > 0 && height > 0) {
          isOverLap = true;
          break ;
       }
    }

    if (isOverLap) {
        // reset player position
        player.resetPosition(0, 5);
        isOverLap = false;
        return true;
    }else {
        return false;
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    playButton.click();
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// isWin
function isWin() {
  var congratulationLayout = document.getElementById("congratulation");
  congratulationLayout.className = "congratulation";
}

// click again
let playButton = document.getElementById("play");
playButton.addEventListener("click", function (){
  let scoreDisplay = document.getElementById("congratulation");
  // win layout hidden
  scoreDisplay.className = "no_display";
});

/********** utils end ****************/









/********** game start set**************/

var allEnemies = [];
var player;
// randomly generate enemy
(function generate() {
    var enemyCount = Math.ceil(Math.random() * 5);
    for (var i = enemyCount; i >= 0; i--) {
        var x = randomNum(0, 4);
        var y = randomNum(1, 4);
        var enemy = new Enemy(x, y);
        allEnemies.push(enemy);
    }

    var playerXPos = Math.ceil(Math.random() * 4);
    player = new Player(playerXPos, 5);
})();

/********** game end *******************/
