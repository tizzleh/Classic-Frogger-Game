// Enemies our player must avoid
let Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let initPlayerY = 350;
// var player = new Player;
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {

  }
  update() {
    if (this.x) {

    }
  }
  render() {
    let sprites = 'images/char-boy.png';
    let initPlayerX = 200;
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
      initPlayerY -= 23;
    }

    if (keyCode == 'down') {
      console.log(keyCode);
      initPlayerY += 23;
    }

    if (keyCode == 'right') {
      console.log(keyCode);
    }

    if (keyCode == 'left') {
      console.log(keyCode);
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