let particles = [];
let myTriangle;
let isMoving = false;

// class Particle {
//   constructor() {
//     this.position = createVector(random(width), random(height));
//     this.velocity = createVector(random(-1, 1), random(-1, 1));
//     this.radius = random(1, 5);
//   }

//   move() {
//     this.position.add(this.velocity);
//     if (this.position.x < 0 || this.position.x > width) {
//       this.velocity.x *= -1;
//     }
//     if (this.position.y < 0 || this.position.y > height) {
//       this.velocity.y *= -1;
//     }
//   }

//   draw() {
//     let alpha = map(this.radius, 1, 5, 20, 220); // map the radius to a transparency value
//     let color = (255, alpha); // create a color with the mapped transparency value
//     fill(color);
//     noStroke();
//     circle(this.position.x, this.position.y, this.radius * 2);
//   }

//   checkCollision() {
//     if (myTriangle.contains(this.position)) {
//       this.velocity.mult(-1);
//     }
//   }
// }

// class Triangle {
//   constructor(x, y) {
//     this.position = createVector(x, y);
//     this.size = 50;
//   }

//   draw() {
//     fill(255);
//     noStroke();
//     triangle(
//       this.position.x,
//       this.position.y - this.size / 2,
//       this.position.x - this.size / 2,
//       this.position.y + this.size / 2,
//       this.position.x + this.size / 2,
//       this.position.y + this.size / 2
//     );
//   }

//   contains(point) {
//     return (
//       point.x > this.position.x - this.size / 2 &&
//       point.x < this.position.x + this.size / 2 &&
//       point.y > this.position.y - this.size / 2 &&
//       point.y < this.position.y + this.size / 2
//     );
//   }

//   moveLeft() {
//     this.position.x -= 5;
//   }

//   moveRight() {
//     this.position.x += 5;
//   }

//   moveUp() {
//     this.position.y -= 5;
//   }

//   moveDown() {
//     this.position.y += 5;
//   }
// }

function setup() {
  background(0);
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
  isPlaying = false;

  //Create triangle instance
  myTriangle = new Triangle(width / 2, height / 2);
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  particles.forEach((particle) => {
    particle.move();
    particle.draw();
  });

  // Draw the triangle
  myTriangle.draw();

  // Update the triangle's position if it's moving
  if (isMoving) {
    myTriangle.update();
  }

  // Move the triangle based on arrow key inputs
  if (keyIsDown(LEFT_ARROW)) {
    myTriangle.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW)) {
    myTriangle.moveRight();
  } else if (keyIsDown(UP_ARROW)) {
    myTriangle.moveUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    myTriangle.moveDown();
  }

  // Check collision between particles and the triangle
  particles.forEach((particle) => {
    particle.move();
    particle.checkCollision();
    particle.draw();
  });
}

function keyReleased() {
  // Stop the triangle's movement when arrow keys are released
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    myTriangle.velocity.x = 0;
  }
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    myTriangle.velocity.y = 0;
  }

  // Check if the triangle has completely stopped moving
  if (myTriangle.velocity.x === 0 && myTriangle.velocity.y === 0) {
    isMoving = false;
  }
}
