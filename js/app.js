// Enemies our player must avoid
// class Enemy {
//   constructor(x, y, speed) {
//
//   }
// }
let Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;
  if (this.x > 506) {
    this.x = 1; // Put bug back at beginning of X axis when moves off canvas
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

console.log(getRandomInt(4));
let initPlayerX = 200;
let initPlayerY = 350;
let moveSize = 50;
// var player = new Player;
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

  // let moveSize = 60;
  constructor(x, y) {

  }
  update() {
    if (this.x) {

    }
  }
  render() {
    let sprites = 'images/char-boy.png';
    // let initPlayerX = 200;
    // let initPlayerY = 350;
    // let sprites = 'images/char-cat-girl.png';
    ctx.drawImage(Resources.get(sprites), initPlayerX, initPlayerY); // Init player pos


  }

  handleInput(keyCode) {
    // this.initPlayerY = initPlayerY;
    if (keyCode) { //
      // TODO: Create func to start game when keyCode == true
    }
    if (keyCode == 'up') {
      console.log(keyCode);
      initPlayerY -= moveSize;
    }

    if (keyCode == 'down') {
      console.log(keyCode);
      initPlayerY += moveSize;
    }

    if (keyCode == 'right') {
      console.log(keyCode);
      initPlayerX += moveSize;
    }

    if (keyCode == 'left') {
      console.log(keyCode);
      initPlayerX -= moveSize;
    }
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [ // TODO: Generate the enemies

];


let player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  const ALLOWED_KEYS = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(ALLOWED_KEYS[e.keyCode]);
});