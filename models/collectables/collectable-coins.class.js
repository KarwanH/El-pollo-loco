/**
 * Represents coins in the game, extending the MovableObject class.
 */
class Coins extends MovableObject {
  /**
   * Height of the coin.
   * @type {number}
   */
  height = 150;

  /**
   * Width of the coin.
   * @type {number}
   */
  width = 150;

  /**
   * Initial y-coordinate of the coin.
   * @type {number}
   */
  y = 0;

  /**
   * Rate of growth for the coin.
   * @type {number}
   */
  growthRate = 10;

  /**
   * Offset values for collision detection.
   * @type {Object}
   */
  offset = {
    top: 50,
    bottom: 20,
    left: 50,
    right: 50,
  };

  /**
   * Array containing paths to images for the coin animation.
   * @type {string[]}
   */
  COINS_MOVING = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Constructor for the Coins class.
   * @param {string} imagePath - Path to the image of the coin.
   * @param {number} x - Initial x-coordinate of the coin.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath, x); // Load the image of the coin.
    this.loadImages(this.COINS_MOVING); // Load images for coin animation.
    this.y = 80 + Math.random() * 200; // Set a random y-coordinate within a range.
    this.x = x; // Set the x-coordinate.
    this.animate(); // Start the coin animation.
  }

  /**
   * Method to start the coin animation.
   */
  animate() {
    this.playInterval = setStoppableInterval(this.animation.bind(this), 50); // Set an interval for the animation.
  }

  /**
   * Method to perform the coin animation.
   */
  animation() {
    setInterval(() => {
      this.playAnimation(this.COINS_MOVING); // Play the animation by cycling through images.
    }, 400);
  }
}
