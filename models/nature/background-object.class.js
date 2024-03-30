/**
 * Represents a background object, extending the MovableObject class.
 */
class BackgroundObject extends MovableObject {
  /**
   * Width of the background object.
   * @type {number}
   */
  width = 720;

  /**
   * Height of the background object.
   * @type {number}
   */
  height = 480;

  /**
   * Constructor for the BackgroundObject class.
   * @param {string} imagePath - The path to the image of the background object.
   * @param {number} x - The x-coordinate position of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath); // Load the image of the background object.
    this.x = x; // Set the x-coordinate position.
    this.y = 480 - this.height; // Calculate and set the y-coordinate position based on the height of the canvas.
  }
}
