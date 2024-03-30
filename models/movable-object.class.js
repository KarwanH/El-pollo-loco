class MovableObject extends DrawableObject {
  // Speed of the object
  speed = 0.25;

  // Image of the object
  img;

  // Flag to indicate direction
  otherDirection = false;

  // Speed in the Y direction (vertical)
  speedY = 0;

  // Speed in the X direction (horizontal)
  speedX = 80;

  // Acceleration due to gravity
  acceleration = 10;

  // Energy of the object
  energy = 100;

  // Timestamp of the last hit
  lastHit = 0;

  // Time limit for being in pain after a hit
  timeLimit = 0;

  // Position of the ground
  groundPosition = 180;

  // Interval IDs for animations
  setIntervalId = [];

  // Offset for collision detection
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  // Check if the object is alive
  isAlive() {
    return this.energy > 0;
  }

  // Check if the object is dead
  isDead() {
    return this.energy <= 0;
  }

  // Set direction forwards
  forwards() {
    this.otherDirection = false;
  }

  // Check if heading forwards
  headingForwards() {
    return !this.otherDirection;
  }

  // Set direction backwards
  backwards() {
    this.otherDirection = true;
  }

  // Check if the object is above ground
  aboveGround() {
    return this.y < this.groundPosition;
  }

  // Check if the object is on the ground
  objectOnGround() {
    return this.y >= this.groundPosition;
  }

  // Apply gravity to the object
  applyGravity() {
    this.playInterval = setStoppableInterval(this.gravity.bind(this), 40);
  }

  // Apply gravity when the object is in the air
  gravity() {
    if (this.aboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    } else {
      this.speedX = 0;
      this.y = this.groundPosition;
    }
  }

  // Check if there's a hit on top of an object
  hitOnTop(object) {
    return (
      this.rightBorderColliding(object) &&
      this.bottomBorderColliding(object) &&
      this.leftBorderColliding(object) &&
      this.topBorderColliding(object)
    );
  }

  // Check if two objects are colliding
  isColliding(object) {
    return (
      this.rightBorderColliding(object) &&
      this.bottomBorderColliding(object) &&
      this.leftBorderColliding(object) &&
      this.topBorderColliding(object)
    );
  }

  // Check if two objects are colliding on the right
  rightBorderColliding(object) {
    return (
      this.x + this.width - this.offset.right > object.x + object.offset.left
    );
  }

  // Check if two objects are colliding on the bottom
  bottomBorderColliding(object) {
    return (
      this.y + this.height - this.offset.bottom > object.y + object.offset.top
    );
  }

  // Check if two objects are colliding on the left
  leftBorderColliding(object) {
    return (
      this.x + this.offset.left < object.x + object.width - object.offset.right
    );
  }

  // Check if two objects are colliding on the top
  topBorderColliding(object) {
    return (
      this.y + this.offset.top < object.y + object.height - object.offset.bottom
    );
  }

  // Handle injury to the object
  injury(damage) {
    this.energy -= damage;
    this.energy < 0 ? (this.energy = 0) : (this.lastHit = new Date().getTime());
  }

  // Check if the object is in pain based on a time limit
  isInPain(timeLimit) {
    let timepassed = this.now() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < timeLimit;
  }

  // Get the current time
  now() {
    return new Date().getTime();
  }

  // Play an animation
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  // Move the object to the left
  moveLeft() {
    this.x -= this.speed;
  }

  // Move the object to the right
  moveRight() {
    this.x += this.speed;
  }

  // Make the object jump
  jump() {
    this.speedY = 45;
  }

  // Move the object to a new ground level
  goesToGrave(newGround) {
    this.groundPosition = newGround;
  }
}
