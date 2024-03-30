/**
 * Represents a cloud object, extending the MovableObject class.
 */
class Cloud extends MovableObject {
  /**
   * Y-coordinate position of the cloud.
   * @type {number}
   */
  y = 20;

  /**
   * Height of the cloud.
   * @type {number}
   */
  height = 250;

  /**
   * Width of the cloud.
   * @type {number}
   */
  width = 500;

  /**
   * Speed at which the cloud moves.
   * @type {number}
   */
  speed = 0.4;

  /**
   * Constructor for the Cloud class.
   */
  constructor() {
    super().loadImage("./img/5_background/layers/4_clouds/1.png"); // Load the image of the cloud.
    this.x = Math.random() * 4200; // Set a random x-coordinate position within the game environment.
    this.moveLeftAnimation(); // Start the animation to move the cloud to the left.
  }

  /**
   * Animates the movement of the cloud to the left.
   */
  moveLeftAnimation() {
    this.playInterval = setStoppableInterval(
      this.moveLeft.bind(this), // Bind the context of 'this' to the moveLeft method.
      1000 / 60 // Set the interval for the animation.
    );
  }
}
