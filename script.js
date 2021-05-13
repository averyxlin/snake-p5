let backgroundColor, playerSnake, currentApple, score

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frameRate(12);
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
}

function draw() {
  background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  // We put the score in its own function for readability.
  displayScore();
}

function displayScore() {
  console.log('displaying score');
  fill('green');
  text(`Score: ${score}`, 10, 20);
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width/2;
    this.y = height - 10;
    this.direction = 'N';
    this.speed = 12;
    this.tail = []; // Array of TailSegment
  }

  moveSelf() {
    if (this.tail.length > 0) {
      // Before moving the head, update the tail segments.
      // Take the segment at the back of the tail off.
      this.tail.pop();

      // Add a new segment at the front, which is where the
      // head (this.x, this.y) is now.
      let frontSegment = new TailSegment(this.x, this.y);
      this.tail.unshift(frontSegment);
    }
    
    
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
  }

  showSelf() {
    // stroke(240, 100, 100);
    noStroke();
    fill('purple');
    rect(this.x, this.y, this.size, this.size);
    noStroke();
    
    // Show its tail
    for (let i = 0; i < this.tail.length; i++) {
      this.tail[i].showSelf();
    }
  }

  checkApples() {
    let snakeEatsApple = collideRectRect(
        this.x, this.y, 
        this.size, this.size, 
        currentApple.x, currentApple.y, 
        currentApple.size, currentApple.size);
    if (snakeEatsApple) {
      score++;
      currentApple = new Apple();
      this.extendTail();
    }
  }

  checkCollisions() {}

  extendTail() {
    this.tail.push(new TailSegment(this.x, this.y));
  }
}

class TailSegment {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = 9;
  }

  showSelf() {
    noStroke();
    fill('purple');
    rect(this.x, this.y, this.size, this.size);
  }
}

class Apple {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 10;
  }

  showSelf() {
    noStroke();
    fill('red');
    rect(this.x, this.y, this.size, this.size);
  }
}

function keyPressed() {
  console.log("key pressed: ", keyCode)
  if (keyCode === UP_ARROW && playerSnake.direction != 'S') {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != 'N') {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != 'W') {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != 'E') {
    playerSnake.direction = "W";
  } else {
    console.log("wrong key");
  }
}

function restartGame() {}

function gameOver() {}