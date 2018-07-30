'use strict';
let speed = 10;
let allEnemies = []; // Array holding enemies

let refresh = document.getElementById('reset'); // Place in a class?
refresh.addEventListener('click', function(e) { // Listen for click event
  window.location.reload(true); // Reset (refresh) page to reset(hacky)
});

class Character { // TODO: Inherit common properties from this class
  constructor() {

  }
}

class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.initEnemyX = -100;
    this.initEnemyY = 50;
    this.speed = speed;
    this.width = 101; // Image width
    this.height = 171; // Image height
    this.xCollOffset = 70;
    this.yCollOffset = 53;
    this.sprite = 'images/enemy-bug.png'; // Bug file location
  }

  update(dt) {

    this.x = this.x + this.speed * dt; // Delta time to universalize movement

    if (player.initPlayerY < -20) { // Player has reached water
      player.initPlayerY = 350; // Place player at start position
      player.initPlayerX = 200; // Place player at start position
      player.level++; // Increment level
      speed += 10; // Increment speed, must be global, otherwise only one bug.
      $('#level').html(player.level); // Update life count
      if (player.level % 3 === 0 && allEnemies.length < 10) { // Add bug every third level
        this.pushBugs(); // Push more bugs to array to increase difficulty
      }
      if (this.initEnemyY < 220) { // Move bugs down as long as they aren't on grass
        this.initEnemyY += 35; // Move bugs down from previous ones
      } else {
        this.initEnemyY = 40; // Start placing bugs at top of stones again
        // this.y = 50;
      }
    }

    if (this.x > 506) { // Put bug back at beginning of X axis when moves off canvas
      this.x = -100;
    }

    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (player.initPlayerX < this.x + this.xCollOffset && // Character must overlap
      player.initPlayerX + this.xCollOffset > this.x &&
      player.initPlayerY < this.y + this.yCollOffset &&
      this.yCollOffset + player.initPlayerY > this.y) { // Detect collision
      player.initPlayerY = 350; // Move player back to start postion
      player.initPlayerX = 200; // Move player back to start postion
      player.livesLeft--; // Decrement livesLeft
      $('#lives').html(player.livesLeft);
      // $('#lives')
      this.dialog();
    }
  }
  // This modal shows when life count has been depleted
  dialog() {
    if (player.livesLeft < 0) {
      allEnemies = [];
      $('#lives').html('0');
      // this.allEnemies = [];
      vex.dialog.confirm({
        message: `You made it to level ${player.level}! Do you want to play again?`,
        callback: function(value) {
          if (value) {
            window.location.reload(true); // Reset (refresh) page to reset(hacky)
          }
        }
      });
    }
  }
  pushBugs() {
    allEnemies.push(new Enemy(this.initEnemyX, this.initEnemyY, speed, this.sprite));
  }

  render() {
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

let enemy = new Enemy();

class Player {

  constructor(x, y) {
    this.moveSize = 50;
    this.sprite = 'images/char-boy.png';
    this.livesLeft = 5;
    this.level = 0;
    this.initPlayerY = 350;
    this.initPlayerX = 200;
    this.x = x;
    this.y = y;
  }

  update() { // Not sure why this is here
    if (this.x) {}
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.initPlayerX, this.initPlayerY); // Init player pos
  }

  handleInput(keyCode) {
    if (keyCode) {
      if (allEnemies.length === 0) { // Put first bug on board when key pressed
        enemy.pushBugs();
      }
    }

    if (keyCode == 'up') {
      this.initPlayerY -= this.moveSize;
    }

    if (keyCode == 'down' && this.initPlayerY < 400) { // Move if player on board
      this.initPlayerY += this.moveSize;
    }

    if (keyCode == 'right' && this.initPlayerX < 400) { // Move if player on board
      this.initPlayerX += this.moveSize;
    }

    if (keyCode == 'left' && this.initPlayerX > 0) { // Check if player on board, move if so
      this.initPlayerX -= this.moveSize;
    }
  }
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