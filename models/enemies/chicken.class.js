/**
 * Represents a chicken character, extending the MovableObject class.
 */
class Chicken extends MovableObject {
  /**
   * Array containing paths to images for the walking animation of the chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Offset values for collision detection.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 0,
    bottom: 10,
    left: 20,
    right: 20,
  };

  /**
   * Constructor for the Chicken class.
   */
  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"); // Load the initial image for the chicken.
    this.loadImages(this.IMAGES_WALKING); // Load all images for the walking animation.
    this.x = 1500 + Math.random() * 2500; // Set a random x-coordinate for the chicken.
    this.y = 350; // Set the y-coordinate for the chicken.
    this.height = 75; // Set the height of the chicken.
    this.width = 75; // Set the width of the chicken.
    this.animation(); // Start the animation.
    this.speed = 0.15 + Math.random() * 0.9; // Set the speed of the chicken.
  }

  /**
   * Initiates the animations for the chicken.
   */
  animation() {
    this.moveLeftAnimation(); // Start the animation for moving left.
    this.walkingAnimationApplied(); // Apply the walking animation.
  }

  /**
   * Animation for the chicken moving left.
   */
  moveLeftAnimation() {
    this.playInterval = setStoppableInterval(
      this.moveLeft.bind(this),
      1000 / 60
    ); // Move the chicken left with a certain interval.
  }

  /**
   * Applies the walking animation to the chicken.
   */
  walkingAnimationApplied() {
    this.playInterval = setStoppableInterval(
      this.walkingAnimation.bind(this),
      100
    ); // Apply walking animation with a certain interval.
  }

  /**
   * Plays the walking animation for the chicken.
   */
  walkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING); // Play the walking animation.
  }
}
