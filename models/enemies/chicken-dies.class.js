/**
 * Represents a chicken dying animation, extending the MovableObject class.
 */
class ChickenDies extends MovableObject {
  /**
   * Array containing paths to images for the dying animation of the chicken.
   * @type {string[]}
   */
  IMAGES_CHICKEN_DIES = [
    "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  /**
   * Constructor for the ChickenDies class.
   * @param {number} x - The x-coordinate of the chicken.
   * @param {number} y - The y-coordinate of the chicken.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_CHICKEN_DIES[0]); // Load the image for the dying animation.
    this.loadImages(this.IMAGES_CHICKEN_DIES); // Load all images for the dying animation.
    this.x = x; // Set the x-coordinate.
    this.y = y; // Set the y-coordinate.
    this.height = 75; // Set the height of the chicken.
    this.width = 75; // Set the width of the chicken.
  }
}
