// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 101; // Image width
    this.height = 171; // Image height
    this.speed = 20; // Increment this to make bugs move faster
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // this.xOffset = 8; // Offset to center of bug on X
    // this.yOffset = 4; // Offset to center of bug on Y
  }

  update(dt) {

    this.x = this.x + this.speed * dt;

    if (initPlayerY <= -20) {
      console.log('hit water');
      initPlayerY = 350;
      initPlayerX = 200;
      level++;
      console.log(level);
    }

    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (initPlayerX < this.x + 80 &&
      initPlayerX + 80 > this.x &&
      initPlayerY < this.y + 50 &&
      50 + initPlayerY > this.y) {
      initPlayerY = 350;
      initPlayerX = 200;
      livesLeft--;
      console.log(livesLeft);
    }

    if (this.x > 506) {
      this.x = -100; // Put bug back at beginning of X axis when moves off canvas
    }

  }

  render() {
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
  }

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
// };

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
let enemy = new Enemy();
let initPlayerX = 200;
let initPlayerY = 350;
let livesLeft = 5;
let level = 1;
class Player {

  constructor(x, y, moveSize) {
    this.moveSize = moveSize = 50;
  }
  update() {
    if (this.x) {

    }
  }
  render() {
    let sprites = 'images/char-boy.png';
    ctx.drawImage(Resources.get(sprites), initPlayerX, initPlayerY); // Init player pos
  }

  handleInput(keyCode) {
    // this.initPlayerY = initPlayerY;
    if (keyCode) { //
      // TODO: Create func to start game when keyCode == true
    }
    if (keyCode == 'up') {
      console.log(keyCode);
      initPlayerY -= player.moveSize;
    }

    if (keyCode == 'down') {
      console.log(keyCode);
      initPlayerY += player.moveSize;
    }

    if (keyCode == 'right') {
      console.log(keyCode);
      initPlayerX += player.moveSize;
    }

    if (keyCode == 'left') {
      console.log(keyCode);
      initPlayerX -= player.moveSize;
    }
  }
}
let initEnemyX = -100;
let initEnemyY = 50;
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [
  // new Enemy(-(Math.floor(1 + Math.random() * 5)), 1),
  // new Enemy(-(Math.floor(1 + Math.random() * 5)), 2),
  // new Enemy(-(Math.floor(1 + Math.random() * 5)), 3)
];
const bug1 = new Enemy(initEnemyX, initEnemyY, 'images/enemy-bug.png');
// const bug2 = new Enemy(-100, 0, 100, 'images/enemy-bug.png');
// const bug3 = new Enemy(401, 401, 'images/enemy-bug.png');
const bug4 = new Enemy(initEnemyX, initEnemyY, 'images/enemy-bug.png');
const bug5 = new Enemy(-100, initEnemyY, 'images/enemy-bug.png');
const bug6 = new Enemy(-200, initEnemyY + 100, 'images/enemy-bug.png');
allEnemies.push(bug1);
// allEnemies.push(bug2);
// allEnemies.push(bug3);
allEnemies.push(bug4);
allEnemies.push(bug5);
allEnemies.push(bug6);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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