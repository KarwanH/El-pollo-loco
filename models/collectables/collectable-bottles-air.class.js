/**
 * Represents bottles in the air in the game, extending the MovableObject class.
 */
class BottlesInAir extends MovableObject {
  /**
   * Height of the bottles in the air.
   * @type {number}
   */
  height = 90;

  /**
   * Width of the bottles in the air.
   * @type {number}
   */
  width = 90;

  /**
   * Initial y-coordinate of the bottles (will be randomized).
   * @type {number}
   */
  y = 0;

  /**
   * Array of image paths for the moving bottles animation.
   * @type {string[]}
   */
  BOTTLES_MOVING = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Constructor for the BottlesInAir class.
   * @param {string} imagePath - The image path of the bottle.
   * @param {number} x - The x-coordinate of the bottle.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath, x); // Load the image of the bottle.
    this.loadImages(this.BOTTLES_MOVING); // Pre-load images for the moving animation.
    this.y = 80 + Math.random() * 200; // Set a random y-coordinate within a range.
    this.x = x; // Set the x-coordinate.
    this.animate(); // Start the animation.
  }

  /**
   * Starts the animation of the moving bottles.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.BOTTLES_MOVING); // Play the animation at a regular interval.
    }, 400); // Interval duration in milliseconds.
  }
}
