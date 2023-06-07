class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1) / 3, random(-1, 1) / 3);
    this.radius = random(1, 5);
  }

  move() {
    this.position.add(this.velocity);
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  draw() {
    let alpha = map(this.radius, 1, 5, 20, 220); // map the radius to a transparency value
    let color = (255, alpha); // create a color with the mapped transparency value
    fill(color);
    noStroke();
    circle(this.position.x, this.position.y, this.radius * 2);
  }

  checkCollision() {
    if (myTriangle.contains(this.position)) {
      this.velocity.mult(-1);
    }
  }
}

class Triangle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.size = 50;
    this.velocity = createVector(0, 0);
    this.speed = 5;
  }

  draw() {
    fill(255);
    noStroke();
    triangle(
      this.position.x,
      this.position.y - this.size / 2,
      this.position.x - this.size / 2,
      this.position.y + this.size / 2,
      this.position.x + this.size / 2,
      this.position.y + this.size / 2
    );
  }

  contains(point) {
    return (
      point.x > this.position.x - this.size / 2 &&
      point.x < this.position.x + this.size / 2 &&
      point.y > this.position.y - this.size / 2 &&
      point.y < this.position.y + this.size / 2
    );
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mult(0.98); // Apply friction to gradually reduce velocity
  }

  moveLeft() {
    this.velocity.x = -this.speed;
    isMoving = true;
  }

  moveRight() {
    this.velocity.x = this.speed;
    isMoving = true;
  }

  moveUp() {
    this.velocity.y = -this.speed;
    isMoving = true;
  }

  moveDown() {
    this.velocity.y = this.speed;
    isMoving = true;
  }
}
