/**
 * Represents a chick in the game, extending the MovableObject class.
 */
class Chick extends MovableObject {
  /**
   * Array containing paths to images for the walking animation of the chick.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Offset object defining the hitbox of the chick.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Constructor for the Chick class.
   */
  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png"); // Load the first image of the walking animation.
    this.loadImages(this.IMAGES_WALKING); // Load all images for the walking animation.
    this.x = 600 + Math.random() * 1000; // Set the initial x-coordinate randomly.
    this.y = 365; // Set the initial y-coordinate.
    this.height = 60; // Set the height of the chick.
    this.width = 60; // Set the width of the chick.
    this.speed = 0.15 + Math.random() * 1.9; // Set the speed of the chick randomly.
    this.animation(); // Start the chick animation.
  }

  /**
   * Starts the animation for the chick.
   */
  animation() {
    this.chickMovesLeft(); // Make the chick move to the left.
    this.walkingAnimationApplied(); // Start the walking animation.
  }

  /**
   * Applies the walking animation for the chick.
   */
  walkingAnimationApplied() {
    this.playInterval = setStoppableInterval(
      this.walkingAnimation.bind(this),
      100
    ); // Start the walking animation loop.
  }

  /**
   * Executes the walking animation for the chick.
   */
  walkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING); // Play the walking animation.
  }

  /**
   * Makes the chick move to the left continuously.
   */
  chickMovesLeft() {
    this.playInterval = setStoppableInterval(
      this.moveLeft.bind(this),
      1000 / 60
    ); // Move the chick to the left at a set interval.
  }
}
