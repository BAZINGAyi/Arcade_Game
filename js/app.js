/********** init data **************/

// table detail
const TABLE_WIDTH = 505;
const TABLE_HEIGHT = 606;
const TABLE_ROWS = 5;
const TABLE_COLUMNS = 6;

// move element details
const GENERAL_WIDTH = 101;
const GENERAL_HEIGHT = 83;
const OFFSETY = 20;

// enemies move rate
const enemiesMoveRate = 30;

// collision area
const COLLISION_AREA = 15;

/********** init end ***************/





/********** oob start **************/

var Character = function(x,y,sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

// Draw the obj on the screen, required method for game
Character.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the obj position, required method for game
// Parameter: dt, a time delta between ticks
Character.prototype.update = function(dt) {
    ;
};

/********** oob set ****************/




/********** enemy set **************/

var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var sprite = 'images/enemy-bug.png';
    var x = x * GENERAL_WIDTH - GENERAL_WIDTH;
    var y = y * GENERAL_HEIGHT - OFFSETY;

    Character.call(this, x, y, sprite);
};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var x = (dt * enemiesMoveRate + this.x);
    if (x > TABLE_WIDTH) {
        x = -GENERAL_WIDTH;
    }

    this.x = x;

    // check whether overlap of player's square and enemy's square
    this.checkCollision();
};


Enemy.prototype.checkCollision = function() {
    var isOverLap = false;

    // get player-rectangle right bottom position
    var playerX = player.x + GENERAL_WIDTH;
    var playerY = player.y + GENERAL_HEIGHT;
    var playerWidth = GENERAL_WIDTH;
    var playerHeight = GENERAL_HEIGHT;

    for (var i = 0; i < allEnemies.length; i++) {

       var enemy = allEnemies[i];

       // get enemy-rectangle right bottom position
       var enemyX = enemy.x + GENERAL_WIDTH;
       var enemyY = enemy.y + GENERAL_HEIGHT;
       var enemyWidth = GENERAL_WIDTH;
       var enemyHeight = GENERAL_HEIGHT;

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
       if (width > COLLISION_AREA && height > COLLISION_AREA) {
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


/********** enemy end **************/





/********** player set**************/

var Player = function(x,y) {
   var x = x * GENERAL_WIDTH;
   // The Plater's position will on the bottom of table if y don't minus offset
   var y = y * GENERAL_HEIGHT - OFFSETY;
   var character = 'images/char-boy.png';

   Character.call(this, x, y, character);
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.constructor = Player;

Player.prototype.handleInput = function(keyCode) {
    switch(keyCode)
    {
        case "up":
            // Player won when the player arrive at river
            if (this.y === GENERAL_HEIGHT - OFFSETY) {
                this.y = TABLE_ROWS * GENERAL_HEIGHT - OFFSETY;
                isWin();
            }else {
              this.y = this.y - GENERAL_HEIGHT;
            }
            break;
        case "down":
            this.y = (this.y === TABLE_ROWS * GENERAL_HEIGHT - OFFSETY ? TABLE_ROWS * GENERAL_HEIGHT - OFFSETY : this.y + GENERAL_HEIGHT);
            break;
        case "right":
            this.x = (this.x + GENERAL_WIDTH) % TABLE_WIDTH;
            break;
        case "left":
            this.x = (this.x  === 0 ? TABLE_WIDTH - GENERAL_WIDTH : this.x - GENERAL_WIDTH);
            break;
        default:
        break;
    }
};

Player.prototype.resetPosition = function(x,y) {
    this.x = x * GENERAL_WIDTH;
    this.y = y * GENERAL_HEIGHT - OFFSETY;
};

/********** player end *************/





/********** utils start **************/

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
