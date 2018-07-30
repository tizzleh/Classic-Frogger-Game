let initPlayerX = 200;
let initEnemyX = -100;
let initEnemyY = 50;
let initPlayerY = 350;
let livesLeft = 5;
let level = 0;
let speed = 10;
let allEnemies = [];

let refresh = document.getElementById('reset'); // Place in a class?
refresh.addEventListener('click', function(e) { // Listen for click event
  window.location.reload(true); // Reset (refresh) page to reset(hacky)
});


class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 101; // Image width
    this.height = 171; // Image height
    this.sprite = 'images/enemy-bug.png'; // Bug file location
  }

  update(dt) {

    this.x = this.x + this.speed * dt; // Delta time to universalize movement

    if (initPlayerY < -20) { // Player has reached water
      initPlayerY = 350; // Place player at start position
      initPlayerX = 200; // Place player at start position
      level++; // Increment level
      speed += 10; // Increment speed
      $('#level').html(level); // Update life count
      if (level % 3 === 0) { // Add bug every third level
        this.pushBugs(); // Push more bugs to array to increase difficulty
      }
      if (initEnemyY < 220) { // Move bugs down as long as they aren't on grass
        initEnemyY += 35; // Move bugs down from previous ones
      } else {
        initEnemyY = 40; // Start placing bugs at top of stones again
        // this.y = 50;
      }
    }

    if (this.x > 506) { // Put bug back at beginning of X axis when moves off canvas
      this.x = -100;
    }

    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (initPlayerX < this.x + 70 &&
      initPlayerX + 70 > this.x &&
      initPlayerY < this.y + 50 &&
      50 + initPlayerY > this.y) { // Detect collision
      initPlayerY = 350; // Move player back to start postion
      initPlayerX = 200; // Move player back to start postion
      livesLeft--; // Decrement livesLeft
      $('#lives').html(livesLeft);
      // $('#lives')
      this.dialog();
    }
  }
  // This modal shows when life count has been depleted
  dialog() {
    if (livesLeft < 0) {
      $('#lives').html('0');
      // speed = 0
      // this.y = 0;
      allEnemies = [];
      vex.dialog.confirm({
        message: `You made it to level ${level}! Do you want to play again?`,
        callback: function(value) {
          if (value) {
            // $('#lives').html(0);
            window.location.reload(true); // Reset (refresh) page to reset(hacky)
          }
        }
      });
    }
  }
  pushBugs() {
    allEnemies.push(new Enemy(initEnemyX, initEnemyY, speed, this.sprite));
  }

  render() {
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
  }
}

let enemy = new Enemy();

class Player {

  constructor(x, y, moveSize) {
    this.moveSize = moveSize = 50;
    this.sprite = 'images/char-boy.png';
  }

  update() { // Not sure why this is here
    if (this.x) {}
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), initPlayerX, initPlayerY); // Init player pos
  }

  handleInput(keyCode) {
    if (keyCode) {
      if (allEnemies.length == 0 && allEnemies.length <= 10) { // If no bugs, add them
        enemy.pushBugs();
      }
    }

    if (keyCode == 'up') {
      initPlayerY -= player.moveSize;
    }

    if (keyCode == 'down' && initPlayerY < 400) { // Move if player on board
      initPlayerY += player.moveSize;
    }

    if (keyCode == 'right' && initPlayerX < 400) { // Move if player on board
      initPlayerX += player.moveSize;
    }

    if (keyCode == 'left' && initPlayerX > 0) { // Check if player on board, move if so
      initPlayerX -= player.moveSize;
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