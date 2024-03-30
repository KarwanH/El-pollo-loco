class ThrowableObjects extends MovableObject {
  // Override ground position and Y speed for throwable objects
  groundPosition = 320;
  speedY = 50;

  // Offset for collision detection
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  // Array of paths to images for flying bottles animation
  IMAGES_FLYING_BOTTLES = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    // Call the constructor of the parent class and load the throwable object image
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    // Load images for flying bottles animation
    this.loadImages(this.IMAGES_FLYING_BOTTLES);
    // Set initial position and dimensions
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 90;
    // Perform the throw action
    this.throw();
    // Start the animation for the throwable object being thrown
    this.bottleBeingThrownAnimation();
  }

  /**
   * Function to set the speed of the throw
   */
  throw() {
    this.speedY = this.speedY;
    this.applyGravity();
    // Set an interval to move the throwable object to the right side
    this.playInterval = setStoppableInterval(
      this.throwToRightSide.bind(this),
      120
    );
  }

  /**
   * Move the throwable object to the right side
   */
  throwToRightSide() {
    this.x += this.speedX;
  }

  /**
   * Perform the animation for the throwable object being thrown
   */
  bottleBeingThrownAnimation() {
    // Set an interval to animate the throwable object
    this.playInterval = setStoppableInterval(
      this.bottleAnimation.bind(this),
      90
    );
  }

  /**
   * Animate the throwable object
   */
  bottleAnimation() {
    this.playAnimation(this.IMAGES_FLYING_BOTTLES);
  }
}
